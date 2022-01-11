export const numberWithCommas = (x) => {
  console.log(x);
  try {
    return x
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } catch {
    return x;
  }
};
