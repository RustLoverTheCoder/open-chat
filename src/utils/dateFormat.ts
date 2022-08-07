import dayjs from "dayjs";

export function now() {
  return dayjs().unix();
}

export function formatTime(datetime: number) {
  return dayjs.unix(datetime).format("HH:mm");
}

export function formatDate(datetime: number) {
  return dayjs.unix(datetime).format("YYYY/MM/DD");
}

export function formatDateSeparator(datetime: number) {
  return dayjs.unix(datetime).format("YYYY年MM月DD日");
}