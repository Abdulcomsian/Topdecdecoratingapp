const getCustomData = (date) => {
  const tDate = new Date(date);
  const day = tDate.getDate();
  const month = tDate.getMonth() + 1;
  const year = tDate.getFullYear();
  return (
    (day < 10 ? "0" + day : day) +
    "/" +
    (month < 10 ? "0" + month : month) +
    "/" +
    year
  );
};
export { getCustomData };
