export const relativeTimeFormat = (value: number) =>
  new Intl.RelativeTimeFormat("en", { style: "narrow" }).format(value, "day");
