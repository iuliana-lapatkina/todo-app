import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Task from '../Task/Task';

export default class TaskList extends Component {

  static defaultProps = {
    todos: [],
    editing: false,
    hidden: false,
    done: false
  }

  static propTypes = {
    todos: PropTypes.array,
    id: PropTypes.number,
    editing: PropTypes.bool,
    hidden: PropTypes.bool,
    done: PropTypes.bool,
  }

  render () {
    const { todos, onToggleDone, onDeleted, onEdited, onToggleEdit } = this.props;
    
    const elements = todos.map((item) => {
      const { id, done, hidden, editing, ...itemProps } = item;

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