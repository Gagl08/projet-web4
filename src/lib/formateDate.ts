export const formateDate = (dateString: Date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString([], options);
};
