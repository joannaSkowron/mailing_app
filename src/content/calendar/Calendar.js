import React from 'react';
import CalendarNav from './CalendarNav';
import CalendarPage from './CalendarPage';
import '../../styles/layout/Content.css';

const Calendar = () => {
  return (
    <>

      <div className="navigation"> {<CalendarNav />} </div>
      <div className="page"> {<CalendarPage />}</div>

    </>
  );
}

export default Calendar;