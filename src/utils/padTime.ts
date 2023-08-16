export function padTime(num: number, pad?: number) {
  return num.toString().padStart(pad ?? 2, '0');
}