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
  let dateWeekDay = date.getDay();
  date.setDate(date.getDate() - dayOftheWeekMap[dateWeekDay] + 1);
  return date;
}


export const getLastDayOfWeek = (date) => {
  let dateWeekDay = date.getDay();
  date.setDate(date.getDate() + (7 - dayOftheWeekMap[dateWeekDay]));
  return date;
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