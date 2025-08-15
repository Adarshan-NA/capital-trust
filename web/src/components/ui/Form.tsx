// Purpose: small, accessible form building blocks integrated with react-hook-form.
import { FieldError } from "react-hook-form";
import { ReactNode, InputHTMLAttributes, SelectHTMLAttributes } from "react";

export function Field({
  label,
  hint,
  error,
  children,
  required,
}: {
  label: string;
  hint?: string;
  error?: FieldError;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontWeight: 600 }}>
        {label} {required && <span style={{ color: "#B91C1C" }}>*</span>}
      </label>
      {hint && (
        <div style={{ fontSize: "0.9rem", color: "var(--ct-slate)" }}>
          {hint}
        </div>
      )}
      <div style={{ marginTop: 6 }}>{children}</div>
      {error && (
        <div
          aria-live="polite"
          style={{ color: "#B91C1C", marginTop: 6, fontSize: "0.9rem" }}
        >
          {error.message?.toString()}
        </div>
      )}
    </div>
  );
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      style={{
        width: "100%",
        padding: "10px 12px",
        borderRadius: 10,
        border: "1px solid #e5e7eb",
        outline: "none",
      }}
    />
  );
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      style={{
        width: "100%",
        padding: "10px 12px",
        borderRadius: 10,
        border: "1px solid #e5e7eb",
        outline: "none",
        background: "white",
      }}
    />
  );
}

export function RadioRow({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      {options.map((o) => (
        <label
          key={o.value}
          style={{ display: "flex", gap: 8, alignItems: "center" }}
        >
          <input
            type="radio"
            name={name}
            value={o.value}
            checked={value === o.value}
            onChange={(e) => onChange(e.target.value)}
          />
          {o.label}
        </label>
      ))}
    </div>
  );
}

export function CheckboxRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked?: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <input
        type="checkbox"
        checked={!!checked}
        onChange={(e) => onChange(e.target.checked)}
      />{" "}
      {label}
    </label>
  );
}
