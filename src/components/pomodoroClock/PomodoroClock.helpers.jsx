function computeClockProgress(progressValue, PROGRESS_END_VALUE) {
  const percentage = Math.round((progressValue / PROGRESS_END_VALUE) * 100);
  const minutes = Math.floor(progressValue / 60);
  let seconds = progressValue % 60;
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  let clockMainColor = "#5338ea";
  if (progressValue < 11) {
    clockMainColor = "red";
  }
  return { clockMainColor, percentage, minutes, seconds };
}

export { computeClockProgress };
