export const getCurrentDate = () => {
  let date = new Date();
  let month = (date.getMonth() + 1).toString().padStart(2, "0");;
  let day = date.getDate().toString().padStart(2, "0");;
  let year = date.getFullYear();
  let currentDate = year + '-' + month + '-' + day;
  return currentDate;
};
