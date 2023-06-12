const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]

const shortMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
]

type MonthFormat = "SHORT" | "FULL"
export const parseKebabDate = (kebabDate: string, monthFormat: MonthFormat) => {
  const splitKebabDate = kebabDate.split("-")

  let day: string = splitKebabDate[2]
  if (day[0] === "0") {
    day = day.slice(1, day.length)
  }
  let month: string = ""

  const monthIndex = parseInt(splitKebabDate[1].split("0")[1]) - 1

  if (monthFormat === "FULL") {
    month = months[monthIndex]
  } else if (monthFormat === "SHORT") {
    month = shortMonths[monthIndex]
  }

  return {
    day,
    month,
    year: splitKebabDate[0]
  }
}
