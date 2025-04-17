export const priceParseFloat = (value: string) => {
  const currency = value.replace(/\D/g, "");
  return parseFloat(currency) / 100;
};
