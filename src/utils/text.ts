export const capitalizeOnlyFirstLetter = (string: string | number | null) => {
  if (typeof string === 'number') return string;

  if (!string) return '';

  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};
