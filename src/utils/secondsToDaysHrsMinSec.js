export default function secondsToDaysHrsMinSec(timestamp) {
  const seconds = Math.floor((timestamp / 1000) % 60);
  const minutes = Math.floor((timestamp / 1000 / 60) % 60);
  const hours = Math.floor((timestamp / 1000 / 60 / 60) % 24);
  const days = Math.floor(timestamp / 1000 / 60 / 60 / 24);

  return {
    seconds,
    minutes,
    hours,
    days,
  };
}
