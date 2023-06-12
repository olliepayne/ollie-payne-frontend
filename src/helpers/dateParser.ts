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
export const parsedKebabDate = (
  kebabDate: string,
  monthFormat: MonthFormat
) => {
  const splitKebabDate = kebabDate.split("-")
  console.log(splitKebabDate)

  // Month !Bug
  let month: string = ""
  let monthIndex: number
  const kebabMonth = splitKebabDate[1]
  if (kebabMonth[0] === "0") {
    monthIndex = parseInt(kebabMonth.split("0")[1]) - 1
  } else {
    monthIndex = parseInt(kebabMonth) - 1
  }

  if (monthFormat === "FULL") {
    month = months[monthIndex]
  } else if (monthFormat === "SHORT") {
    month = shortMonths[monthIndex]
  }

  // Day
  let day: string = splitKebabDate[2]
  if (day[0] === "0") {
    day = day.slice(1, day.length)
  }

  return {
    month,
    day,
    year: splitKebabDate[0]
  }
}
