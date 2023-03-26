"use strict";

function displayTime() {//function to display the current time
  let D = new Date();//created a new date object
  let hrs = D.getHours();
  let min = D.getMinutes();
  let sec = D.getSeconds();
  let ampm = document.getElementById('ampm');

  if (hrs >= 12) {//decide AM?PM indicator based on the hour
    ampm.innerHTML = 'PM';
  } else {
    ampm.innerHTML = 'AM';
  }
//this converts hours to 12-hour format
  if (hrs > 12) {
    hrs = hrs - 12;
  }
//this if condition adds zero when its less than 10
  if (hrs < 10) {
    hrs = "0" + hrs;
  }
//to update html file with the current time
  document.getElementById('hours').innerHTML = hrs;
  document.getElementById('minutes').innerHTML = min;
  document.getElementById('seconds').innerHTML = sec;
}
setInterval(displayTime, 1000);//updates time every second

//stopwatch
//initialized variables for stopwatch
let timerId = null;
let elapsedMilliseconds = 0;
let elapsedSeconds = 0;
let elapsedMinutes = 0;

function $(id) {
  return document.getElementById(id);
}

function displayCurrentTime() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let ampm = hours < 12 ? 'AM' : 'PM';
  hours = hours % 12;
  hours = hours ? hours : 12;

  $('hours').textContent = padSingleDigit(hours);
  $('minutes').textContent = padSingleDigit(minutes);
  $('seconds').textContent = padSingleDigit(seconds);
  $('ampm').textContent = ampm;
}

function padSingleDigit(num) {
  return num < 10 ? '0' + num : num;
}
//this function updates the stopwatch display
function tickStopwatch() {
  elapsedMilliseconds += 10;//increase the elapsedMilliseconds by 10
  elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);//this calculates the elapsedSeconds
  elapsedMinutes = Math.floor(elapsedSeconds / 60);//this calculatesthe elapsedMinutes
  elapsedSeconds = elapsedSeconds % 60;//set the elapsed seconds to the remainder after dividing by 60

//updating the html element with elapsed time
  $('s_minutes').textContent = padSingleDigit(elapsedMinutes);
  $('s_seconds').textContent = padSingleDigit(elapsedSeconds);
  $('s_ms').textContent = padSingleDigit(elapsedMilliseconds % 1000);
}

//function to start the stopwatch
function startStopwatch(event) {
  event.preventDefault();;
  timerId = setInterval(tickStopwatch, 10);
}
//functio to stop the stopwatch
function stopStopwatch(event) {
  event.preventDefault();
  clearInterval(timerId);
}
//function to reset the stopwatch
function resetStopwatch(event) {
  event.preventDefault();
  elapsedMilliseconds = 0;
  elapsedSeconds = 0;
  elapsedMinutes = 0;

  $('s_minutes').textContent = '00';
  $('s_seconds').textContent = '00';
  $('s_ms').textContent = '000';
}

document.addEventListener('DOMContentLoaded', function() {//It adds event listeners to start, stop and reset buttons when DOM content is loaded
  $('start').addEventListener('click', startStopwatch);
  $('stop').addEventListener('click', stopStopwatch);
  $('reset').addEventListener('click', resetStopwatch);
});

setInterval(displayCurrentTime, 1000);
displayCurrentTime();
