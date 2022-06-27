export const convertIntoTimeStamp = (date) => {
  return Date.parse(date);
  //   return new Date(date).getTime();
};

export const convertIntoISODate = (date) => {
  return new Date().toISOString();
};

export const convertTimestampIntoISODate = (timestamp) => {
  return new Date(parseInt(timestamp)).toISOString();
};

export const convertDateIntoISODateString = (date) => {
  function pad(n) {
    return n < 10 ? "0" + n : n;
  }
  return (
    date.getUTCFullYear() +
    "-" +
    pad(date.getUTCMonth() + 1) +
    "-" +
    pad(date.getUTCDate()) +
    "T" +
    pad(date.getUTCHours()) +
    ":" +
    pad(date.getUTCMinutes()) +
    ":" +
    pad(date.getUTCSeconds()) +
    "Z"
  );
};

export const convertTimeStampToShamsi = (dateTime) => {
  return new Date(dateTime).toLocaleDateString("fa-IR");
};

export const convertShamsiToTimeStamp = (persianDate) => {
  const datum = Date.parse(persianDate);
  return datum / 1000;
};
