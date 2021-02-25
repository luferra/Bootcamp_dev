//jshint esversion:6

//https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
exports.getDate = function() {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  const today = new Date();
  return day = today.toLocaleDateString("it-IT", options);
};

exports.getDayDate = function() {
  const options = {
    weekday: 'long'
  }
  const today = new Date();
  return day = today.toLocaleDateString("it-IT", options);
};
