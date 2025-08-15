// Purpose: UX-friendly input formatting (postal code + phone).
export const formatPostal = (v: string) =>
  v
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .replace(/^(.{3})(.*)$/, (_m, a, b) => (b ? `${a} ${b}` : a));

export const formatPhone = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 10);
  const a = d.slice(0, 3);
  const b = d.slice(3, 6);
  const c = d.slice(6, 10);
  if (c) return `(${a}) ${b}-${c}`;
  if (b) return `(${a}) ${b}`;
  if (a) return `(${a}`;
  return "";
};
