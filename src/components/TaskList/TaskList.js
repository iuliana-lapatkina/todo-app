import React from 'react';

import Task from '../Task/Task';

const TaskList = () => {
  return (
    <ul className="task-list">
      <Task status="completed"/>
      <Task status="editing"/>
      <Task status="active"/>
    </ul>
  );
}

export default TaskList;