"use client";

import { useEffect, useRef } from "react";
import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";
import { getTheme, subscribeTheme } from "@/lib/theme";

/** Wide silver light behind the page, and the vivid core over it. */
const AURA_RADIUS = 650;
const CORE_RADIUS = 190;
/** Spark lifetime range, the most alive at once, and how many a click throws out. */
const SPARK_MIN_MS = 420;
const SPARK_MAX_MS = 900;
const MAX_SPARKS = 160;
const CLICK_SPARKS = 18;
/** Pixels of pointer travel per emitted spark, and the most emitted per move event. */
const SPARK_SPACING = 9;
const MAX_SPARKS_PER_MOVE = 4;
/** Click ripple lifetime and how far its ring travels. */
const RIPPLE_MS = 650;
const RIPPLE_RADIUS = 64;
/** Canvas resolution cap: sharper than this costs fill rate for no visible gain. */
const MAX_DPR = 2;
/** Elements that make the core swell and brighten while hovered. */
const INTERACTIVE = 'a[href], button, [role="button"], [role="tab"], [role="option"], input, textarea, select, label, summary';

export interface Spark {
  x: number;
  y: number;
  /** Velocity, px/ms. */
  vx: number;
  vy: number;
  /** Remaining and total life, ms. */
  life: number;
  maxLife: number;
  /** Rendered size at full life, px. */
  size: number;
  /** Index into the colour sprites. */
  tone: number;
}

interface Ripple {
  x: number;
  y: number;
  t: number;
}

/** Sparks to emit for a pointer move of `distance` px: one per SPARK_SPACING, capped. */
export function sparkCount(distance: number) {
  return Math.min(MAX_SPARKS_PER_MOVE, Math.floor(distance / SPARK_SPACING));
}

/**
 * Advances a spark by `dt` ms: it drifts with air drag, rises a little like
 * an ember, and is optionally pulled toward `attract` (the pointer, while
 * over a link or button). Returns false once it has burnt out.
 */
export function stepSpark(spark: Spark, dt: number, attract?: { x: number; y: number }) {
  spark.life -= dt;
  if (spark.life <= 0) return false;
  const drag = 0.985 ** (dt / 16);
  spark.vx *= drag;
  spark.vy = spark.vy * drag - 0.00045 * dt;
  if (attract) {
    spark.vx += (attract.x - spark.x) * 0.000012 * dt;
    spark.vy += (attract.y - spark.y) * 0.000012 * dt;
  }
  spark.x += spark.vx * dt;
  spark.y += spark.vy * dt;
  return true;
}

/**
 * The core's shape for a pointer speed (px/ms) and hover heat (0–1): it
 * stretches along the direction of travel (narrowing across it) as speed
 * rises, swells over interactive elements, and brightens with both.
 */
export function coreShape(speed: number, heat: number) {
  const stretch = Math.min(speed / 3, 0.5);
  const swell = 1 + heat * 0.35;
  return {
    scaleX: (1 + stretch) * swell,
    scaleY: (1 - stretch * 0.45) * swell,
    opacity: Math.min(1, 0.55 + heat * 0.35 + stretch * 0.3),
  };
}

/** A theme token resolved to rgba() at the given alpha, via the canvas's own colour parser. */
function tokenColor(ctx: CanvasRenderingContext2D, token: string, alpha: number) {
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue(token).trim() || "transparent";
  const parsed = String(ctx.fillStyle); // normalised to "#rrggbb" or "rgba(r, g, b, a)"
  if (parsed.startsWith("#")) {
    const n = parseInt(parsed.slice(1), 16);
    return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
  }
  return parsed.replace(/[\d.]+\)$/, `${alpha})`);
}

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

/**
 * Dark-theme cursor effects for mouse users, all in theme colours:
 * - a wide silver aura behind the page that trails softly;
 * - a vermilion core over the content that follows closely, stretches with
 *   speed, and swells over links and buttons;
 * - neon sparks that stream off the cursor (and gather round it over links
 *   and buttons), and a ring with a burst of sparks on click.
 *
 * One pointer listener and one animation loop drive everything; React never
 * re-renders it. The loop stops once everything has settled. Every layer
 * ignores pointer events, and CSS hides them in the light theme, on touch
 * screens and for reduced motion before any script runs.
 */
export function CursorEffects() {
  const auraRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const aura = auraRef.current;
    const coreEl = coreRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: true, desynchronized: true });
    if (!aura || !coreEl || !canvas || !ctx || !hasFinePointer()) return;

    const active = () => getTheme() === "dark" && !prefersReducedMotion();

    let width = 0;
    let height = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Each spark is a glow sprite drawn once per colour and then stamped, far
    // cheaper than a gradient or blur per spark per frame.
    const SPRITE = 64;
    const makeSprite = (token: string) => {
      const sprite = document.createElement("canvas");
      sprite.width = sprite.height = SPRITE;
      const g = sprite.getContext("2d")!;
      const r = SPRITE / 2;
      const gradient = g.createRadialGradient(r, r, 0, r, r, r);
      gradient.addColorStop(0, tokenColor(g, "--snow", 0.95)); // white-hot centre
      gradient.addColorStop(0.12, tokenColor(g, token, 0.9));
      gradient.addColorStop(0.35, tokenColor(g, token, 0.28));
      gradient.addColorStop(1, tokenColor(g, token, 0));
      g.fillStyle = gradient;
      g.fillRect(0, 0, SPRITE, SPRITE);
      return sprite;
    };
    /** Spark tones, weighted toward the brand red: vermilion, soft red, silver. */
    const TONE_WEIGHTS = [0.55, 0.3, 0.15];
    let sprites: HTMLCanvasElement[] = [];
    let ring = "";
    let ringHalo = "";
    const readColors = () => {
      sprites = [makeSprite("--vermilion"), makeSprite("--md-primary"), makeSprite("--silver")];
      ring = tokenColor(ctx, "--vermilion", 1);
      ringHalo = tokenColor(ctx, "--md-primary", 0.35);
    };
    readColors();
    const pickTone = () => {
      let roll = Math.random();
      for (let i = 0; i < TONE_WEIGHTS.length; i++) if ((roll -= TONE_WEIGHTS[i]!) < 0) return i;
      return 0;
    };

    const sparks: Spark[] = [];
    const ripples: Ripple[] = [];
    const spawn = (x: number, y: number, vx: number, vy: number, sizeBoost = 1) => {
      if (sparks.length >= MAX_SPARKS) sparks.shift(); // the oldest gives way
      const maxLife = SPARK_MIN_MS + Math.random() * (SPARK_MAX_MS - SPARK_MIN_MS);
      sparks.push({ x, y, vx, vy, life: maxLife, maxLife, size: (14 + Math.random() * 14) * sizeBoost, tone: pickTone() });
    };
    // Pointer target, and the eased state of each layer.
    let mouseX = 0;
    let mouseY = 0;
    let auraX = 0;
    let auraY = 0;
    let coreX = 0;
    let coreY = 0;
    let lastMoveT = 0;
    let speed = 0; // px/ms, smoothed
    let angle = 0; // direction of travel, radians
    let hot = false; // over an interactive element
    let heat = 0;
    let shown = false; // pointer inside the window
    let presence = 0; // fades every layer in and out
    let frame = 0;
    let lastTick = 0;

    const clearCanvas = () => {
      sparks.length = 0;
      ripples.length = 0;
      ctx.clearRect(0, 0, width, height);
    };

    const drawCanvas = (now: number, dt: number) => {
      const attract = hot ? { x: mouseX, y: mouseY } : undefined;
      let alive = 0;
      for (const spark of sparks) if (stepSpark(spark, dt, attract)) sparks[alive++] = spark;
      sparks.length = alive;
      while (ripples.length && now - ripples[0]!.t > RIPPLE_MS) ripples.shift();
      ctx.clearRect(0, 0, width, height);
      if (!sparks.length && !ripples.length) return;

      ctx.globalCompositeOperation = "lighter";
      for (const spark of sparks) {
        const left = spark.life / spark.maxLife;
        const size = spark.size * (0.35 + 0.65 * left); // embers shrink as they cool
        ctx.globalAlpha = left * left;
        ctx.drawImage(sprites[spark.tone]!, spark.x - size / 2, spark.y - size / 2, size, size);
      }
      for (const r of ripples) {
        const p = Math.max(0, now - r.t) / RIPPLE_MS;
        const radius = 6 + RIPPLE_RADIUS * easeOutCubic(p);
        ctx.globalAlpha = 1 - p;
        ctx.beginPath();
        ctx.arc(r.x, r.y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = ringHalo;
        ctx.lineWidth = 8 * (1 - p) + 2;
        ctx.stroke();
        ctx.strokeStyle = ring;
        ctx.lineWidth = 1.25;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    const hide = () => {
      clearCanvas();
      presence = 0;
      aura.style.opacity = "0";
      coreEl.style.opacity = "0";
    };

    const tick = (now: number) => {
      if (!active()) {
        hide();
        frame = lastTick = 0;
        return;
      }
      const dt = lastTick ? Math.min(now - lastTick, 48) : 16;
      lastTick = now;
      // The aura lags softly; the core stays close to the pointer.
      auraX += (mouseX - auraX) * 0.08;
      auraY += (mouseY - auraY) * 0.08;
      coreX += (mouseX - coreX) * 0.24;
      coreY += (mouseY - coreY) * 0.24;
      // Speed relaxes once the pointer rests, so the core rounds out again.
      if (now - lastMoveT > 40) speed *= 0.86;
      heat += ((hot ? 1 : 0) - heat) * 0.14;
      presence += ((shown ? 1 : 0) - presence) * 0.12;

      const { scaleX, scaleY, opacity } = coreShape(speed, heat);
      aura.style.transform = `translate3d(${auraX - AURA_RADIUS}px, ${auraY - AURA_RADIUS}px, 0)`;
      aura.style.opacity = presence.toFixed(3);
      coreEl.style.transform = `translate3d(${coreX - CORE_RADIUS}px, ${coreY - CORE_RADIUS}px, 0) rotate(${angle}rad) scale(${scaleX.toFixed(3)}, ${scaleY.toFixed(3)})`;
      coreEl.style.opacity = (presence * opacity).toFixed(3);
      drawCanvas(now, dt);

      const settled =
        Math.abs(mouseX - auraX) + Math.abs(mouseY - auraY) < 0.5 &&
        Math.abs(mouseX - coreX) + Math.abs(mouseY - coreY) < 0.5 &&
        speed < 0.01 &&
        Math.abs((hot ? 1 : 0) - heat) < 0.005 &&
        Math.abs((shown ? 1 : 0) - presence) < 0.005 &&
        sparks.length === 0 &&
        ripples.length === 0;
      if (settled) frame = lastTick = 0;
      else frame = requestAnimationFrame(tick);
    };
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || !active()) return;
      const now = performance.now();
      const dx = e.clientX - mouseX;
      const dy = e.clientY - mouseY;
      const dt = Math.max(now - lastMoveT, 1);
      if (!shown) {
        // Entering the window: start every layer at the pointer, not from 0,0.
        auraX = coreX = e.clientX;
        auraY = coreY = e.clientY;
      } else if (dx || dy) {
        speed += (Math.hypot(dx, dy) / dt - speed) * 0.35;
        angle = Math.atan2(dy, dx);
      }
      // Sparks along the path just travelled, thrown back against the motion
      // with some scatter, so they stream off behind the cursor.
      if (shown) {
        const count = sparkCount(Math.hypot(dx, dy));
        const vx = dx / dt;
        const vy = dy / dt;
        for (let i = 0; i < count; i++) {
          const along = (i + Math.random()) / count;
          const spread = 0.04 + Math.random() * 0.06;
          const dir = Math.random() * Math.PI * 2;
          spawn(mouseX + dx * along, mouseY + dy * along, -vx * 0.12 + Math.cos(dir) * spread, -vy * 0.12 + Math.sin(dir) * spread);
        }
      }
      mouseX = e.clientX;
      mouseY = e.clientY;
      lastMoveT = now;
      shown = true;
      wake();
    };
    const onOver = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const next = e.target instanceof Element && e.target.closest(INTERACTIVE) !== null;
      if (next !== hot) {
        hot = next;
        if (active()) wake();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0 || !active()) return;
      ripples.push({ x: e.clientX, y: e.clientY, t: performance.now() });
      // A burst of sparks, evenly around with a little jitter.
      for (let i = 0; i < CLICK_SPARKS; i++) {
        const dir = ((i + Math.random() * 0.6) / CLICK_SPARKS) * Math.PI * 2;
        const v = 0.16 + Math.random() * 0.2;
        spawn(e.clientX, e.clientY, Math.cos(dir) * v, Math.sin(dir) * v, 1.15);
      }
      wake();
    };
    const onLeave = () => {
      shown = false;
      hot = false;
      if (active()) wake();
    };
    // Token colours differ per theme; leaving dark clears whatever was drawn.
    const unsubscribeTheme = subscribeTheme(() => {
      if (getTheme() === "dark") readColors();
      else hide();
    });

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("resize", resize);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      unsubscribeTheme();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    // Two gates on two elements, so neither display rule has to win over the other.
    <div aria-hidden className="pointer-events-none light:hidden motion-reduce:hidden">
      <div className="hidden [@media(hover:hover)_and_(pointer:fine)]:block">
        {/* Wide light behind the content, in the silver token. */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div
            ref={auraRef}
            className="absolute top-0 left-0 rounded-full opacity-0 will-change-transform"
            style={{
              width: AURA_RADIUS * 2,
              height: AURA_RADIUS * 2,
              background: "radial-gradient(circle closest-side, color-mix(in oklab, var(--silver) 7%, transparent), transparent)",
            }}
          />
        </div>
        {/* Vivid core over the content: `screen` only ever lightens what's beneath.
            Fixed itself (no wrapper) so it blends with the page, not inside its own group. */}
        <div
          ref={coreRef}
          className="fixed top-0 left-0 z-60 rounded-full opacity-0 mix-blend-screen will-change-transform"
          style={{
            width: CORE_RADIUS * 2,
            height: CORE_RADIUS * 2,
            background:
              "radial-gradient(circle closest-side, color-mix(in oklab, var(--vermilion) 24%, transparent), color-mix(in oklab, var(--md-primary) 9%, transparent) 45%, transparent)",
          }}
        />
        {/* Sparks and click ripples, above everything. */}
        <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-60 size-full" />
      </div>
    </div>
  );
}
