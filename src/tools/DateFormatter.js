export const dateFormatter = (date) => {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentDate = new Date();

  const minutes = date.getMinutes();
  const hours = date.getHours();
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  let formattedDate = null;
  if (currentDate.getDate() === day && monthNames[currentDate.getMonth()] === month && currentDate.getFullYear() === year) {
    formattedDate = `${hours}:${minutes.toString().padStart(2, '0')}`
  } else if (currentDate.getFullYear() === year) {
    formattedDate = `${day} ${month}`
  } else if (currentDate.getFullYear() !== year) {
    formattedDate = `${day}/${month}/${year}`
  };

  return formattedDate;
}