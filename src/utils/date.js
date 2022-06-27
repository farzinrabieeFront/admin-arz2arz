class DateConvert {
  toTimeStamp(date_sample) {
    if (date_sample) {
      return Date.parse(date_sample);
    }

    return Date.parse(new Date());
  }

  IntoISODate(date_sample) {
    if (date_sample) {
      return new Date(date_sample).toISOString();
    }

    return new Date().toISOString();
  }

  toShamsiDate(date_sample, option = {}) {
    let options = {
      day: "numeric", // "numeric", "2-digit".
      // weekday: "long", // "narrow", "short", "long".
      year: "numeric", // "numeric", "2-digit".
      month: "numeric", // "numeric", "2-digit", "narrow", "short", "long".
      ...option,
    };

    if (date_sample) {
      return new Date(date_sample).toLocaleDateString("fa-IR", options);
    }

    return new Date().toLocaleDateString("fa-IR", options);
  }

  getTime(date_sample) {
    let options = {
      hour: "numeric", // "numeric", "2-digit".
      minute: "numeric", //"numeric", "2-digit".
      second: "numeric", //"numeric", 2-digit".
    };

    if (date_sample) {
      return new Date(date_sample).toLocaleTimeString("fa-IR", options);
    }

    return new Date().toLocaleTimeString("fa-IR", options);
  }

}
export default new DateConvert();
