import React from 'react';

export const handleCalendarScrollTop = (selector) => {
  const element = document.querySelector(selector);
  const currentHour = new Date().getHours();
  const pixelsToScroll = currentHour * 60 - 70;

  element.scrollTop = pixelsToScroll;
}

export const dayOftheWeekMap = {
  0: 7,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6
}

export const generateDivs = (divscCount, divsClass, ifClock) => {
  let divs = [];
  for (let i = 0; i < divscCount; i++) {
    divs.push(<div key={i} className={divsClass}>{ifClock ? `${i + 1}:00` : null}</div>)
  }
  return divs;
}

export const getFirstDayOfWeek = (date) => {
  const dateWeekDay = date.getDay();
  let newDate = new Date(date);
  newDate.setDate(date.getDate() - dayOftheWeekMap[dateWeekDay] + 1);
  return newDate;
}

export const getLastDayOfWeek = (date) => {
  const dateWeekDay = date.getDay();
  let newDate = new Date(date);
  newDate.setDate(date.getDate() + (7 - dayOftheWeekMap[dateWeekDay]));
  return newDate;
}

export const generateTitleDivs = (divsCount, divsClass, selectedDate) => {
  let divs = [];
  const monday = new Date(getFirstDayOfWeek(selectedDate));
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  for (let i = 0; i < divsCount; i++) {
    const fullDate = new Date(new Date(monday).setDate(monday.getDate() + i));
    const day = fullDate.getDate();
    const month = monthNames[fullDate.getMonth()];
    divs.push(<div key={i} className={divsClass}>{day} {month.toUpperCase()}</div>)
  }
  return divs;
}

export const getWeekDayName = (date) => {
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const day = date.getDay();
  return weekdays[day];
}

export const getWeekDateRange = (date) => {
  let from = new Date(date);
  from = getFirstDayOfWeek(from);
  from.setHours(0, 0, 0, 0);
  from = from.toISOString();

  let to = new Date(date);
  to = getLastDayOfWeek(to);
  to.setHours(23, 59, 59, 999);
  to = to.toISOString();
  return [from, to];
}

export const getDayDateRange = (date) => {
  let from = new Date(date);
  from.setHours(0, 0, 0, 0);
  from = from.toISOString();

  let to = new Date(date);
  to.setHours(23, 59, 59, 999);
  to = to.toISOString();
  return [from, to];
}

export const generateTimeOptions = () => {
  const time = [];
  for (let i = 0; i < 24; i++) {
    let fullTime = null;
    let halfTime = null;
    if (i < 10) {
      fullTime = `0${i}:00`;
      halfTime = `0${i}:30`;
    } else {
      fullTime = `${i}:00`;
      halfTime = `${i}:30`;
    }
    time.push(fullTime, halfTime)
  }
  time.push(`23:59`);

  const options = time.map(option => (
    <option key={option} value={option}>{option}</option>
  ));

  return options;
}

export const getISODateFromSelectedDateAndTime = (date, timeOption) => {
  let dateObj = new Date(date);
  const timeOptionArr = timeOption.split(':');
  dateObj.setHours(timeOptionArr[0], timeOptionArr[1], 0, 0);
  dateObj.toISOString();

  return dateObj;
}
