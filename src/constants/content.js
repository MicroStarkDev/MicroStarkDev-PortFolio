const startDate = new Date('2021-10-01');
const currentDate = new Date();

const diffInMonths =
  (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
  (currentDate.getMonth() - startDate.getMonth());

export const TOTAL_YEARS_EXP = Math.round(diffInMonths / 12); 
