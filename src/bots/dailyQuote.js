// uses global fetch.
export async function produceDailyQuote() {
  const res = await fetch("https://zenquotes.io/api/random");
  if (!res.ok) throw new Error(`Quote API failed: ${res.status}`);
  const data = await res.json();
  // zenquotes returns: [{ q: "quote", a: "author" }]
  const [q] = data;
  return `${q.q} —${q.a}`;
}