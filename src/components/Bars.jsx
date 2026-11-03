/** Simple horizontal bar chart with no chart library. items: [{ label, value, note? }] */
export default function Bars({ items, max, format = (v) => v, tone = 'lake' }) {
  const top = max ?? Math.max(1, ...items.map((i) => i.value));
  return (
    <ul className="bars">
      {items.map((i) => (
        <li key={i.label}>
          <span className="bars-label">{i.label}</span>
          <span className="bars-track">
            <span className={`bars-fill tone-${i.tone || tone}`} style={{ width: `${(i.value / top) * 100}%` }} />
          </span>
          <span className="bars-value">{format(i.value)}</span>
        </li>
      ))}
    </ul>
  );
}
