import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  OnboardingSchema,
  type Onboarding,
  PROVINCES,
  DOC_TYPES,
  EMPLOYMENT,
  INCOME,
  INTENDED_USE,
  RESIDENCY,
} from "../lib/validators";
import { formatPostal, formatPhone } from "../lib/formatters";
import { loadDraft, saveDraft, clearDraft } from "../lib/storage";
import { Field, Input, Select } from "../components/ui/Form";
import { Stepper } from "../components/ui/Stepper";

const STEPS = [
  "About you",
  "Identity",
  "Financials",
  "Review & submit",
] as const;

export default function OpenAccount() {
  const draft = useMemo(() => loadDraft(), []);
  const [step, setStep] = useState(0);

  // NEW: server response state (caseId + risk)
  const [serverResult, setServerResult] = useState<null | {
    caseId: string;
    customerId: string;
    risk: {
      score: number;
      level: "LOW" | "MEDIUM" | "HIGH";
      reasons: string[];
    };
  }>(null);

  const {
    register,
    handleSubmit,
    trigger,
    formState,
    setValue,
    watch,
    getValues,
    reset,
  } = useForm<Onboarding>({
    resolver: zodResolver(OnboardingSchema),
    defaultValues: draft ?? {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dob: "",
      address1: "",
      address2: "",
      city: "",
      province: undefined as unknown as Onboarding["province"], // user must pick one
      postal: "",
      documentType: "drivers_license",
      consentIdentity: false as unknown as true, // validated to true by schema
      employment: "employed",
      income: "50k-100k",
      intendedUse: "everyday",
      residency: "citizen",
      consentFinal: false as unknown as true, // validated to true by schema
    },
    mode: "onChange",
  });

  // Debounced save to localStorage (skip after successful submit)
  useEffect(() => {
    if (serverResult) return;
    const sub = watch((v) => {
      const t = setTimeout(() => saveDraft(v as Onboarding), 300);
      return () => clearTimeout(t);
    });
    return () => sub.unsubscribe();
  }, [watch, serverResult]);

  // Per-step validation
  const fieldsByStep: (keyof Onboarding)[][] = [
    [
      "firstName",
      "lastName",
      "email",
      "phone",
      "dob",
      "address1",
      "city",
      "province",
      "postal",
    ],
    ["documentType", "consentIdentity"],
    ["employment", "income", "intendedUse", "residency", "consentFinal"],
    [],
  ];

  const next = async () => {
    const ok = await trigger(fieldsByStep[step]);
    if (!ok) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  // NEW: real submit to API (2B)
  const onSubmit = async (data: Onboarding) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/public/onboard`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const msg = body?.error?.message || `Request failed (${res.status})`;
        alert(msg);
        return;
      }
      const body = await res.json();
      setServerResult(body);
      clearDraft();
    } catch {
      alert("Network error. Please try again.");
    }
  };

  const onPostalBlur = () =>
    setValue("postal", formatPostal(getValues().postal));
  const onPhoneBlur = () => setValue("phone", formatPhone(getValues().phone));
  const resetAll = () => {
    reset();
    clearDraft();
    setStep(0);
    setServerResult(null);
  };

  // Success view (show server caseId + risk)
  if (serverResult) {
    return (
      <div className="container" style={{ padding: "40px 0" }}>
        <div className="card">
          <h2 style={{ marginTop: 0 }}>Application submitted</h2>
          <p>
            Your case ID is <strong>{serverResult.caseId}</strong>. Risk level:{" "}
            <strong>{serverResult.risk.level}</strong> (score{" "}
            {serverResult.risk.score})
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <a className="btn btn-primary" href="/">
              Back to home
            </a>
            <button className="btn btn-ghost" onClick={resetAll}>
              Start another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: "40px 0" }}>
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Open an account</h2>
        <Stepper step={step} steps={[...STEPS]} />

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Step 1: About you */}
          {step === 0 && (
            <>
              <Field
                label="First name"
                required
                error={formState.errors.firstName!}
              >
                <Input {...register("firstName")} autoComplete="given-name" />
              </Field>

              <Field
                label="Last name"
                required
                error={formState.errors.lastName!}
              >
                <Input {...register("lastName")} autoComplete="family-name" />
              </Field>

              <Field label="Email" required error={formState.errors.email!}>
                <Input
                  type="email"
                  {...register("email")}
                  autoComplete="email"
                />
              </Field>

              <Field
                label="Phone"
                required
                hint="10 digits"
                error={formState.errors.phone!}
              >
                <Input
                  {...register("phone")}
                  onBlur={onPhoneBlur}
                  placeholder="(555) 555-5555"
                  inputMode="tel"
                />
              </Field>

              <Field
                label="Date of birth"
                required
                hint="You must be 18 or older"
                error={formState.errors.dob!}
              >
                <Input type="date" {...register("dob")} />
              </Field>

              <Field
                label="Address line 1"
                required
                error={formState.errors.address1!}
              >
                <Input {...register("address1")} autoComplete="address-line1" />
              </Field>

              {/* Optional field: no error prop */}
              <Field label="Address line 2">
                <Input {...register("address2")} autoComplete="address-line2" />
              </Field>

              <Field label="City" required error={formState.errors.city!}>
                <Input {...register("city")} autoComplete="address-level2" />
              </Field>

              <Field
                label="Province / Territory"
                required
                error={formState.errors.province!}
              >
                <Select {...register("province")}>
                  <option value="">Select…</option>
                  {PROVINCES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </Select>
              </Field>

              <Field
                label="Postal code"
                required
                hint="Format A1A 1A1"
                error={formState.errors.postal!}
              >
                <Input
                  {...register("postal")}
                  onBlur={onPostalBlur}
                  placeholder="A1A 1A1"
                  autoCapitalize="characters"
                />
              </Field>
            </>
          )}

          {/* Step 2: Identity */}
          {step === 1 && (
            <>
              <Field
                label="Document type"
                required
                error={formState.errors.documentType!}
              >
                <Select {...register("documentType")}>
                  {DOC_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t === "drivers_license"
                        ? "Driver's license"
                        : t === "passport"
                          ? "Passport"
                          : "Photo ID"}
                    </option>
                  ))}
                </Select>
              </Field>

              <div className="card" style={{ background: "var(--ct-mist)" }}>
                <strong>Uploads (simulated)</strong>
                <p style={{ margin: "6px 0 0", color: "var(--ct-slate)" }}>
                  In Sprint 2A we only validate consent. File storage arrives in
                  2B+.
                </p>
              </div>

              <Field
                label="Consent to verify your identity"
                required
                error={formState.errors.consentIdentity!}
              >
                <label
                  style={{ display: "flex", gap: 8, alignItems: "center" }}
                >
                  <input type="checkbox" {...register("consentIdentity")} />I
                  authorize Capital Trust to verify my identity with third-party
                  providers.
                </label>
              </Field>
            </>
          )}

          {/* Step 3: Financials — vertical radios + extra spacing */}
          {step === 2 && (
            <div style={{ display: "grid", rowGap: 22 }}>
              <Field
                label="Employment status"
                required
                error={formState.errors.employment!}
              >
                <div style={{ display: "grid", rowGap: 10 }}>
                  {EMPLOYMENT.map((v) => (
                    <label
                      key={v}
                      style={{ display: "flex", gap: 8, alignItems: "center" }}
                    >
                      <input
                        type="radio"
                        value={v}
                        {...register("employment")}
                      />{" "}
                      {labelize(v)}
                    </label>
                  ))}
                </div>
              </Field>

              <Field
                label="Annual income (CAD)"
                required
                error={formState.errors.income!}
              >
                <div style={{ display: "grid", rowGap: 10 }}>
                  {INCOME.map((v) => (
                    <label
                      key={v}
                      style={{ display: "flex", gap: 8, alignItems: "center" }}
                    >
                      <input type="radio" value={v} {...register("income")} />{" "}
                      {v}
                    </label>
                  ))}
                </div>
              </Field>

              <Field
                label="Intended use"
                required
                error={formState.errors.intendedUse!}
              >
                <div style={{ display: "grid", rowGap: 10 }}>
                  {INTENDED_USE.map((v) => (
                    <label
                      key={v}
                      style={{ display: "flex", gap: 8, alignItems: "center" }}
                    >
                      <input
                        type="radio"
                        value={v}
                        {...register("intendedUse")}
                      />{" "}
                      {labelize(v)}
                    </label>
                  ))}
                </div>
              </Field>

              <Field
                label="Residency status"
                required
                error={formState.errors.residency!}
              >
                <div style={{ display: "grid", rowGap: 10 }}>
                  {RESIDENCY.map((v) => (
                    <label
                      key={v}
                      style={{ display: "flex", gap: 8, alignItems: "center" }}
                    >
                      <input
                        type="radio"
                        value={v}
                        {...register("residency")}
                      />{" "}
                      {labelize(v)}
                    </label>
                  ))}
                </div>
              </Field>

              <Field
                label="Final consent"
                required
                error={formState.errors.consentFinal!}
              >
                <label
                  style={{ display: "flex", gap: 8, alignItems: "center" }}
                >
                  <input type="checkbox" {...register("consentFinal")} />I
                  confirm the information above is accurate and I agree to the
                  terms.
                </label>
              </Field>
            </div>
          )}

          {/* Step 4: Review — human-readable summary with spacing */}
          {step === 3 && (
            <div className="card" style={{ background: "var(--ct-mist)" }}>
              <strong>Review your details</strong>
              <p style={{ margin: "8px 0 16px", color: "var(--ct-slate)" }}>
                Please confirm the information below before submitting.
              </p>

              <SummarySection
                title="About you"
                rows={[
                  [
                    "Full name",
                    `${getValues().firstName} ${getValues().lastName}`.trim(),
                  ],
                  ["Email", getValues().email],
                  ["Phone", getValues().phone],
                  ["Date of birth", getValues().dob],
                  [
                    "Address",
                    [getValues().address1, getValues().address2]
                      .filter(Boolean)
                      .join(", "),
                  ],
                  [
                    "City / Prov / Postal",
                    `${getValues().city}, ${getValues().province}  ${getValues().postal}`,
                  ],
                ]}
                onEdit={() => setStep(0)}
              />

              <SummarySection
                title="Identity"
                rows={[
                  ["Document type", prettyDoc(getValues().documentType)],
                  [
                    "Consent to verify identity",
                    getValues().consentIdentity ? "Yes" : "No",
                  ],
                ]}
                onEdit={() => setStep(1)}
              />

              <SummarySection
                title="Financial profile"
                rows={[
                  ["Employment", labelize(getValues().employment)],
                  ["Income", getValues().income],
                  ["Intended use", labelize(getValues().intendedUse)],
                  ["Residency", labelize(getValues().residency)],
                  ["Final consent", getValues().consentFinal ? "Yes" : "No"],
                ]}
                onEdit={() => setStep(2)}
              />
            </div>
          )}

          {/* Nav buttons */}
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            {step > 0 && (
              <button type="button" className="btn btn-ghost" onClick={back}>
                Back
              </button>
            )}
            {step < STEPS.length - 1 && (
              <button type="button" className="btn btn-primary" onClick={next}>
                Continue
              </button>
            )}
            {step === STEPS.length - 1 && (
              <button type="submit" className="btn btn-primary">
                Submit application
              </button>
            )}
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                saveDraft(getValues());
              }}
              title="Save and continue later"
            >
              Save & exit
            </button>
            <button type="button" className="btn btn-ghost" onClick={resetAll}>
              Reset form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------- Small helpers ---------- */

function labelize(s: string) {
  return s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function prettyDoc(t: (typeof DOC_TYPES)[number]) {
  return t === "drivers_license"
    ? "Driver's license"
    : t === "passport"
      ? "Passport"
      : "Photo ID";
}

/** Compact summary block with two-column layout and an Edit link */
function SummarySection({
  title,
  rows,
  onEdit,
}: {
  title: string;
  rows: [label: string, value: string][];
  onEdit: () => void;
}) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <h3 style={{ margin: "0 0 8px 0", fontSize: "1.05rem" }}>{title}</h3>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={onEdit}
          aria-label={`Edit ${title}`}
        >
          Edit
        </button>
      </div>
      <dl
        style={{
          display: "grid",
          gridTemplateColumns: "220px 1fr",
          gap: "8px 16px",
          margin: 0,
        }}
      >
        {rows.map(([k, v]) => (
          <Fragment key={k}>
            <dt style={{ color: "var(--ct-slate)" }}>{k}</dt>
            <dd style={{ margin: 0, fontWeight: 600 }}>{v || "—"}</dd>
          </Fragment>
        ))}
      </dl>
    </div>
  );
}

// React.Fragment without an extra import at the top
function Fragment({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
