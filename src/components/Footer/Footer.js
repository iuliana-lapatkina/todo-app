import React from 'react';

import TasksFilter from '../TasksFilter/TasksFilter';

const Footer = ( { todoCount, onFiltered, clearCompleted } ) => {

  return (
    <footer className="footer">
        <span className="todo-count">{ todoCount } items left</span>
        <TasksFilter onFiltered = { onFiltered }/>
      <button className="clear-completed" onClick = { clearCompleted }>Clear completed</button>
    </footer>
  )
}

export default Footer;