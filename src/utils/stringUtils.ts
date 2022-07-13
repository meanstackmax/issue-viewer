export const transformCapitalize = (name: string): string =>
  name
    .split("_")
    .map((w: string) => {
      const [firstLetter, ...word] = w.split("");

      return [firstLetter.toUpperCase(), ...word].join("");
    })
    .join(" ");
