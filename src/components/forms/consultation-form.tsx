"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, BadgeCheck, Lock } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { submitContact } from "@/actions/enquiry";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { consultationForm as copy } from "@/data/contact";
import { cn } from "@/lib/utils";
import { contactSchema, type ContactInput } from "@/lib/validations";

const fieldClass =
  "h-auto rounded-xl border-white/10 bg-obsidian-0 px-3.5 py-2.5 text-sm text-snow placeholder:text-slate/70 focus-visible:border-vermilion focus-visible:shadow-none focus-visible:ring-1 focus-visible:ring-vermilion/50";
const SUCCESS_VISIBLE_MS = 5000;
const labelClass = "font-mono text-[11px] font-semibold tracking-wider text-slate-300 uppercase";

const defaultValues: ContactInput = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
  focusAreas: [copy.focusAreas[0].label],
  nda: true,
  website: "",
};

function FieldError({ message }: { message?: string }) {
  return message ? <p className="text-xs text-vermilion">{message}</p> : null;
}

export function ConsultationForm() {
  const [status, setStatus] = useState<{ ok: boolean; error?: string } | null>(null);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema), defaultValues });

  // The success banner shows for exactly 5 seconds, then is removed.
  useEffect(() => {
    if (!status?.ok) return;
    const timer = setTimeout(() => setStatus(null), SUCCESS_VISIBLE_MS);
    return () => clearTimeout(timer);
  }, [status]);

  const submit = handleSubmit(async (values) => {
    setStatus(null);
    try {
      const result = await submitContact(values);
      if (result.ok) {
        reset(defaultValues);
        setStatus({ ok: true });
      } else {
        setStatus({ ok: false, error: result.error });
      }
    } catch {
      setStatus({ ok: false, error: "Something went wrong. Please try again or email us directly." });
    }
  });

  // Blocks a second submit (e.g. a double click) before the disabled state renders.
  const inFlight = useRef(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inFlight.current) return;
    inFlight.current = true;
    try {
      await submit(e);
    } finally {
      inFlight.current = false;
    }
  };

  return (
    <form className="space-y-6" onSubmit={onSubmit} noValidate>
      {/* Name & Email */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col space-y-1.5">
          <label htmlFor="cf-name" className={cn(labelClass, "flex items-center justify-between")}>
            <span>{copy.fields.name.label}</span>
            <span className="text-vermilion">*</span>
          </label>
          <Input id="cf-name" autoComplete="name" placeholder={copy.fields.name.placeholder} aria-invalid={!!errors.name} className={fieldClass} {...register("name")} />
          <FieldError message={errors.name?.message} />
        </div>
        <div className="flex flex-col space-y-1.5">
          <label htmlFor="cf-email" className={cn(labelClass, "flex items-center justify-between")}>
            <span>{copy.fields.email.label}</span>
            <span className="text-vermilion">*</span>
          </label>
          <Input id="cf-email" type="email" autoComplete="email" placeholder={copy.fields.email.placeholder} aria-invalid={!!errors.email} className={fieldClass} {...register("email")} />
          <FieldError message={errors.email?.message} />
        </div>
      </div>

      {/* Phone & Organization */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col space-y-1.5">
          <label htmlFor="cf-phone" className={cn(labelClass, "flex items-center justify-between")}>
            <span>{copy.fields.phone.label}</span>
            <span className="text-[10px] text-slate">Optional</span>
          </label>
          <Input id="cf-phone" type="tel" autoComplete="tel" placeholder={copy.fields.phone.placeholder} aria-invalid={!!errors.phone} className={fieldClass} {...register("phone")} />
          <FieldError message={errors.phone?.message} />
        </div>
        <div className="flex flex-col space-y-1.5">
          <label htmlFor="cf-company" className={labelClass}>
            {copy.fields.company.label}
          </label>
          <Input id="cf-company" autoComplete="organization" placeholder={copy.fields.company.placeholder} aria-invalid={!!errors.company} className={fieldClass} {...register("company")} />
          <FieldError message={errors.company?.message} />
        </div>
      </div>

      {/* Primary scope pills */}
      <fieldset className="flex flex-col space-y-2">
        <legend className={cn(labelClass, "mb-2 flex w-full items-center justify-between")}>
          <span>{copy.fields.focus.label}</span>
          <span className="text-[10px] text-slate normal-case tracking-normal">{copy.fields.focus.hint}</span>
        </legend>
        <Controller
          control={control}
          name="focusAreas"
          render={({ field }) => {
            const selected = field.value ?? [];
            return (
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {copy.focusAreas.map(({ label, icon: Icon }) => {
                  const active = selected.includes(label);
                  return (
                    <button
                      key={label}
                      type="button"
                      aria-pressed={active}
                      onClick={() => field.onChange(active ? selected.filter((v) => v !== label) : [...selected, label])}
                      className={cn(
                        "flex items-center gap-2 rounded-xl border p-2.5 text-left text-xs font-medium transition-all outline-none focus-visible:shadow-glow-focus",
                        active
                          ? "border-red-500/50 bg-vermilion text-primary-foreground"
                          : "border-white/8 bg-obsidian-2 text-slate-300 hover:border-white/20 hover:text-white",
                      )}
                    >
                      <Icon className={cn("size-4 shrink-0", !active && "text-vermilion")} aria-hidden />
                      <span>{label}</span>
                    </button>
                  );
                })}
              </div>
            );
          }}
        />
      </fieldset>

      {/* Project brief */}
      <div className="flex flex-col space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <label htmlFor="cf-message" className={labelClass}>
            {copy.fields.message.label}
          </label>
          <span className="flex items-center gap-1 font-mono text-[10px] text-slate">
            <Lock className="size-3 text-telemetry-normal" aria-hidden /> {copy.fields.message.hint}
          </span>
        </div>
        <textarea
          id="cf-message"
          rows={3}
          placeholder={copy.fields.message.placeholder}
          aria-invalid={!!errors.message}
          className={cn(fieldClass, "min-h-[105px] w-full resize-y border p-3.5 outline-none aria-invalid:border-vermilion")}
          {...register("message")}
        />
        <FieldError message={errors.message?.message} />
      </div>

      {/* NDA */}
      <div className="flex items-start gap-3 rounded-xl border border-white/6 bg-obsidian-2/60 p-3">
        <Controller
          control={control}
          name="nda"
          render={({ field }) => (
            <Checkbox id="cf-nda" className="mt-0.5" checked={!!field.value} onCheckedChange={(v) => field.onChange(v === true)} />
          )}
        />
        <label htmlFor="cf-nda" className="cursor-pointer text-xs leading-relaxed text-silver select-none">
          <span className="font-medium text-white">{copy.nda.title}</span> {copy.nda.text}
        </label>
      </div>

      {/* Honeypot: hidden from people, left empty by real users. */}
      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" {...register("website")} />

      <button
        type="submit"
        disabled={isSubmitting}
        className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl border border-red-400/30 bg-linear-to-r from-vermilion via-crimson to-vermilion px-6 py-3.5 text-sm font-semibold tracking-wide text-primary-foreground shadow-[0_0_16px_-2px_rgb(239_68_68/0.18)] transition-all duration-200 outline-none hover:from-red-500 hover:to-crimson hover:shadow-[0_0_25px_-4px_rgb(239_68_68/0.35)] focus-visible:shadow-glow-focus disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span>{copy.submit}</span>
        <ArrowRight className="size-[18px] transition-transform group-hover:translate-x-1" aria-hidden />
      </button>

      <div aria-live="polite">
        {status?.ok && (
          <div className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-950/70 p-4 text-xs text-emerald-200 sm:text-sm">
            <BadgeCheck className="size-[22px] shrink-0 text-emerald-400" aria-hidden />
            <div>
              <p className="font-semibold text-white">{copy.success.title}</p>
              <p className="mt-0.5 text-xs text-emerald-300/90">{copy.success.text}</p>
            </div>
          </div>
        )}
        {status && !status.ok && (
          <p className="rounded-xl border border-vermilion/30 bg-vermilion/10 p-4 text-xs text-red-200 sm:text-sm">{status.error}</p>
        )}
      </div>
    </form>
  );
}
