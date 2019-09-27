import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CalendarTaskList from './CalendarTaskList';
import CalendarNewTask from './CalendarNewTask';
import Error from '../../layout/Error';


const CalendarPage = () => {

  return (
    <>

      <Switch>

        <Route path='/calendar' exact component={CalendarTaskList} />
        <Route path='/calendar/new' component={CalendarNewTask} />
        <Route component={Error} />

      </Switch>

    </>
  );
}

export default CalendarPage;