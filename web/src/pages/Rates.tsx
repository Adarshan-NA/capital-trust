import rates from "../data/rates.json";

export default function Rates() {
  return (
    <div className="container" style={{ padding: "32px 0" }}>
      <section className="hero-slim">
        <h1>Rates</h1>
        <p className="muted">
          Current posted rates. Subject to change without notice.
        </p>
      </section>

      <RateTable
        title="Savings rates"
        caption="Annual interest rate; promotional rate applies for the first 3 months."
        columns={["Product", "Rate (%)"]}
        rows={rates.savings.map((r) => [r.product, r.rate.toFixed(2)])}
      />

      <RateTable
        title="GIC rates"
        caption="Non-redeemable guaranteed investment certificates."
        columns={["Term", "Rate (%)"]}
        rows={rates.gic.map((r) => [r.term, r.rate.toFixed(2)])}
      />

      <RateTable
        title="Mortgage rates"
        caption="Owner-occupied properties; subject to approval."
        columns={["Term", "Rate (%)"]}
        rows={rates.mortgage.map((r) => [r.term, r.rate.toFixed(2)])}
      />

      <p className="muted" style={{ marginTop: 12 }}>
        These are posted rates for illustration only and may differ from your
        personalized offer.
      </p>
    </div>
  );
}

function RateTable({
  title,
  caption,
  columns,
  rows,
}: {
  title: string;
  caption: string;
  columns: string[];
  rows: (string | number)[][];
}) {
  return (
    <section className="card" style={{ marginTop: 16 }}>
      <h2 style={{ marginTop: 0 }}>{title}</h2>
      <div className="table-wrap">
        <table className="table">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c} scope="col">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                {r.map((cell, j) => (
                  <td key={j}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
