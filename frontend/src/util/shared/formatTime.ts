import { format } from 'date-fns-tz'
import { Section } from 'model/section'

const days = {
  "Sunday": "Sun",
  "Monday": "Mon",
  "Tuesday": "Tue",
  "Wednesday": "Wed",
  "Thursday": "Thu",
  "Friday": "Fri",
  "Saturday": "Sat",
}

export function formatSectionTime(section: Section, abbreviated = false): string {
  const startTime = new Date(section.startTime)
  const endTime = new Date(section.endTime)
  const timeZone = "America/New_York"

  const amPmEqual = format(startTime, "a", { timeZone }) === format(endTime, "a", { timeZone })
  let startTimeFormat = "h:mma"
  let endTimeFormat = "h:mma"

  // Adjust format for abbreviation
  if (abbreviated) {
    if (startTime.getMinutes() === 0) {
      startTimeFormat = amPmEqual ? "h" : "ha"
    } else {
      startTimeFormat = amPmEqual ? "h:mm" : "h:mma"
    }

    if (endTime.getMinutes() === 0) {
      endTimeFormat = "ha"
    }
  }

  const formattedStartTime = format(startTime, startTimeFormat, { timeZone })
  const formattedEndTime = format(endTime, endTimeFormat, { timeZone })
  const day = abbreviated ? days[section.day] : section.day
  return `${day} ${formattedStartTime.toLocaleLowerCase()} - ${formattedEndTime.toLocaleLowerCase()}`
}

export function formatDateTime(timeISO: string, f: string = "MM/dd/yyyy h:mma"): string {
  const time = new Date(timeISO)
  const timeZone = "America/New_York"
  const formattedTime = format(time, f, { timeZone })
  return formattedTime
}

// input: Tuesday,2014-08-18T04:00:00.000Z,2014-08-18T04:00:00.000Z
// output: Tuesday 12:00AM - 12:00AM
export function formatSurveyTime(time: string): string {
  const [day, startTimeStr, endTimeStr] = time.split(",")
  const formattedStartTime = formatDateTime(startTimeStr, "h:mma")
  const formattedEndTime = formatDateTime(endTimeStr, "h:mma")

  return `${day} ${formattedStartTime} - ${formattedEndTime}`
}