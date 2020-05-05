import moment from "moment";

const formatDate = (
  date,
  {
    format = "DD MMM  YYYY [at] h:mma",
    parseFormat = "x", // unix seconds
    timezone
  } = {}
) => {
  if (!date) return "Not Provided";

  if (timezone) {
    return moment(date, parseFormat)
      .tz(timezone)
      .format(format);
  }

  return moment
    .utc(date, parseFormat)
    .local()
    .format(format);
};

export { formatDate };
