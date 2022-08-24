import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import isYesterday from 'dayjs/plugin/isYesterday'

dayjs.extend(isToday)
dayjs.extend(isYesterday)

export function now() {
  return dayjs().unix()
}

export function formatTime(datetime: number) {
  return dayjs.unix(datetime).format('HH:mm')
}

export function formatDate(datetime: number) {
  return dayjs.unix(datetime).format('YYYY/MM/DD')
}

export function formatMsgDate(datetime: number) {
  if (dayjs.unix(datetime).isToday()) {
    return '今天' + dayjs.unix(datetime).format('HH:mm')
  } else if (dayjs.unix(datetime).isYesterday()) {
    return '昨天' + dayjs.unix(datetime).format('HH:mm')
  } else {
    return dayjs.unix(datetime).format('YYYY/MM/DD')
  }
}

export function formatDateSeparator(datetime: number) {
  return dayjs.unix(datetime).format('YYYY年MM月DD日')
}

export function isInterval(preDate: number, date: number) {
  return date - Number(preDate) > 300
}