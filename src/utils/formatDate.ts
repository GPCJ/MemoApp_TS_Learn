export const formatDate = (date: string | undefined): string => {
  if (!date) return '';
  return date.replace('T', ' ').slice(0, 16);
};
