import { describe, expect, it } from "vitest";
import { coreShape, sparkCount, stepSpark, type Spark } from "./cursor-effects";

const spark = (over: Partial<Spark> = {}): Spark => ({ x: 100, y: 100, vx: 0.1, vy: 0, life: 500, maxLife: 500, size: 16, tone: 0, ...over });

describe("sparkCount", () => {
  it("emits nothing for tiny moves and more for longer ones, up to a cap", () => {
    expect(sparkCount(3)).toBe(0);
    expect(sparkCount(20)).toBeGreaterThan(0);
    expect(sparkCount(10_000)).toBe(sparkCount(1_000));
  });
});

describe("stepSpark", () => {
  it("moves with its velocity, slows with drag, and rises", () => {
    const s = spark();
    expect(stepSpark(s, 16)).toBe(true);
    expect(s.x).toBeGreaterThan(100);
    expect(s.vx).toBeLessThan(0.1);
    expect(s.vy).toBeLessThan(0); // upward
  });

  it("burns out when its life runs out", () => {
    const s = spark({ life: 10 });
    expect(stepSpark(s, 16)).toBe(false);
  });

  it("is pulled toward the attraction point", () => {
    const free = spark({ vx: 0 });
    const pulled = spark({ vx: 0 });
    stepSpark(free, 16);
    stepSpark(pulled, 16, { x: 400, y: 100 });
    expect(pulled.x).toBeGreaterThan(free.x);
  });
});

describe("coreShape", () => {
  it("is a plain circle at rest", () => {
    const s = coreShape(0, 0);
    expect(s.scaleX).toBe(1);
    expect(s.scaleY).toBe(1);
  });

  it("stretches along travel and narrows across it with speed, up to a limit", () => {
    const fast = coreShape(1.5, 0);
    expect(fast.scaleX).toBeGreaterThan(1);
    expect(fast.scaleY).toBeLessThan(1);
    expect(coreShape(100, 0)).toEqual(coreShape(10, 0));
  });

  it("swells and brightens over interactive elements", () => {
    const rest = coreShape(0, 0);
    const hot = coreShape(0, 1);
    expect(hot.scaleX).toBeGreaterThan(rest.scaleX);
    expect(hot.opacity).toBeGreaterThan(rest.opacity);
    expect(hot.opacity).toBeLessThanOrEqual(1);
  });
});
