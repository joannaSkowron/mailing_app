export const handleCalendarScrollTop = (selector) => {
  const element = document.querySelector(selector);
  const currentHour = new Date().getHours();
  const pixelsToScroll = currentHour * 60 - 70;

  element.scrollTop = pixelsToScroll;
}