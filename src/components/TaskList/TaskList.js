import React, { Component } from 'react';

import Task from '../Task/Task';

export default class TaskList extends Component {

  render () {
    const { todos, onToggleDone, onDeleted, editItem } = this.props;
    console.log(todos);
    
    const elements = todos.map((item) => {
      const { id, done, editing, ...itemProps } = item;
      console.log(id);
      console.log(done);
      console.log(editing);
      let classNames = 'todo-list-item';

      if (editing) {
        classNames += ' editing';
      }

      if (done) {
        classNames += ' completed';
      } 
      
      return (
        <li key={id} className={ classNames } >   
          <Task
            id = { id }
            {...itemProps }
            onToggleDone = { () => onToggleDone(id) }
            onDeleted = { () => onDeleted(id) }
            editItem = { () => editItem(id) }/>
        </li>
      );
    });
  
    return (
      <ul className="task-list">
        { elements }
      </ul>
    );
  }
}

