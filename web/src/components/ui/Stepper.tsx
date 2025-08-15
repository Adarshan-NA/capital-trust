// Purpose: visual progress indicator; improves user confidence and reduces abandonment.
export function Stepper({ step, steps }: { step: number; steps: string[] }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        alignItems: "center",
        marginBottom: 16,
      }}
    >
      {steps.map((label, i) => {
        const active = i === step;
        const done = i < step;
        return (
          <div
            key={i}
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <div
              aria-current={active ? "step" : undefined}
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: done
                  ? "var(--ct-green)"
                  : active
                    ? "var(--ct-navy)"
                    : "#e5e7eb",
                color: done || active ? "white" : "#4b5563",
                display: "grid",
                placeItems: "center",
                fontWeight: 700,
              }}
            >
              {i + 1}
            </div>
            <span
              style={{
                color: active ? "var(--ct-navy)" : "#4b5563",
                fontWeight: active ? 700 : 500,
              }}
            >
              {label}
            </span>
            {i < steps.length - 1 && (
              <div style={{ width: 24, height: 2, background: "#e5e7eb" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}
