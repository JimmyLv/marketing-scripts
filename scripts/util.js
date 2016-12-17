function sleep(miliseconds) {
  const currentTime = new Date().getTime();

  while (currentTime + miliseconds >= new Date().getTime()) {
  }
}

module.exports = {
  sleep
}
