export function current_timestamp() {
  const now = new Date();
  const yyyy = now.getFullYear(),
    MM = now.getMonth(),
    dd = now.getDay(),
    hh = now.getHours(),
    mm = now.getMinutes(),
    ss = now.getSeconds(),
    mmm = now.getMilliseconds();
  return `${yyyy}-${MM}-${dd}-${hh}-${mm}-${ss}-${mmm}`
}