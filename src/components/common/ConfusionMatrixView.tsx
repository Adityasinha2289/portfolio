import type { ConfusionMatrix } from "@/data/types";

/** Confusion matrix as a semantic table, shaded by row-normalised rate. */
export function ConfusionMatrixView({
  matrix,
  compact = false,
  dark = false,
}: {
  matrix: ConfusionMatrix;
  compact?: boolean;
  dark?: boolean;
}) {
  const cell = compact ? "h-11 text-[12px]" : "h-16 md:h-20 text-sm md:text-base";
  return (
    <figure>
      <table className="w-full table-fixed border-collapse font-mono">
        <caption className="sr-only">
          Confusion matrix. {matrix.caption}
        </caption>
        <thead>
          <tr>
            <th scope="col" className={`meta pb-2 text-left ${dark ? "text-muted-dark" : "text-muted"}`}>
              <span className="sr-only">Actual label</span>
              <span aria-hidden>true ↓ / pred →</span>
            </th>
            {matrix.labels.map((l) => (
              <th key={l} scope="col" className="meta pb-2 text-center">
                {l}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matrix.rows.map((row, r) => {
            const total = row.reduce((a, b) => a + b, 0);
            return (
              <tr key={r}>
                <th scope="row" className="meta pr-2 text-left">
                  {matrix.labels[r]}
                </th>
                {row.map((v, c) => {
                  const rate = v / total;
                  const diag = r === c;
                  const bg = diag
                    ? `rgb(184 243 107 / ${0.25 + rate * 0.75})`
                    : `rgb(255 121 94 / ${Math.min(0.85, rate * 1.6)})`;
                  return (
                    <td
                      key={c}
                      className={`border-2 ${dark ? "border-ivory/80" : "border-ink"} text-center align-middle ${cell} ${
                        dark && !diag && rate < 0.25 ? "text-ivory" : "text-ink"
                      }`}
                      style={{ background: bg }}
                    >
                      <span className="font-semibold">{v.toLocaleString("en-IN")}</span>
                      {!compact && (
                        <span className="block text-[10px] opacity-70">{(rate * 100).toFixed(0)}%</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {!compact && (
        <figcaption className={`meta mt-3 normal-case tracking-normal ${dark ? "text-muted-dark" : "text-muted"}`}>
          {matrix.caption} Percentages are per true label.
        </figcaption>
      )}
    </figure>
  );
}
