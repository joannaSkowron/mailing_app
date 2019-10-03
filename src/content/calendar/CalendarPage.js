import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CalendarTaskList from './CalendarTaskList';
import CalendarNewTask from './CalendarNewTask';
import Error from '../../layout/Error';


const CalendarPage = (props) => {

  return (
    <>

      <Switch>

        <Route path='/calendar' exact component={() => <CalendarTaskList selectedDate={props.selectedDate} />} />
        <Route path='/calendar/new' component={() => <CalendarNewTask selectedDate={props.selectedDate} />} />
        <Route component={Error} />

      </Switch>

    </>
  );
}

export default CalendarPage;