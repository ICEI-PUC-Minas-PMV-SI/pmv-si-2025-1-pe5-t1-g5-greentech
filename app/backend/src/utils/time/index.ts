export const addMonthToDate = (date: Date): Date => {
  const newDate = new Date(date);
  let month = newDate.getMonth();
  let year = newDate.getFullYear();
  month += 1;
  if (month > 11) {
    month = 0;
    year += 1;
  }
  newDate.setMonth(month);
  newDate.setFullYear(year);
  if (newDate.getMonth() !== month) {
    newDate.setDate(0);
  }
  return newDate;
};
  