import React, { Component } from 'react';

import Task from '../Task/Task';

export default class TaskList extends Component {

  render () {
    const { todos, onToggleDone, onDeleted, onEdited, onToggleEdit } = this.props;
    
    const elements = todos.map((item) => {
      const { id, done, hidden, label, newLabel, editing, ...itemProps } = item;

      let classNames = 'todo-list-item';
      if (editing) {
        classNames += ' editing';
      }
      if (done) {
        classNames += ' completed';
      }
      if (hidden) {
        classNames += ' hidden';
      } 
      
      return (
        <li key={id} className={ classNames } >   
          <Task
            id = { id }
            label = { label }
            {...itemProps }
            onToggleDone = { () => onToggleDone(id) }
            onDeleted = { () => onDeleted(id) }
            onEdited = { onEdited }
            onToggleEdit = { () => onToggleEdit(id) } />
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

