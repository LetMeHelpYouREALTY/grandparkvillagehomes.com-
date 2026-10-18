export const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export const perSqft = (price: number, sqft: number) => Math.round(price / sqft);
