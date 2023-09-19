import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Task from '../Task/Task';

// eslint-disable-next-line react/prefer-stateless-function
export default class TaskList extends Component {
  static defaultProps = {
    todos: [],
    editing: false,
    hidden: false,
    done: false,
  };

  static propTypes = {
    todos: PropTypes.instanceOf(Array),
    editing: PropTypes.bool,
    hidden: PropTypes.bool,
    done: PropTypes.bool,
  };

  render() {
    const { todos, onToggleDone, onDeleted, onEdited, editItemTime, onToggleEdit, onToggleTimer, onFocusOff } =
      this.props;

    const elements = todos.map((item) => {
      const { id, done, hidden, editing, ...itemProps } = item;

      const liClassName = classNames('todo-list-item', { editing: item.editing, completed: done, hidden: item.hidden });

      return (
        <li key={id} className={liClassName}>
          <Task
            id={id}
            {...itemProps}
            onToggleDone={() => onToggleDone(id)}
            onDeleted={() => onDeleted(id)}
            onEdited={onEdited}
            onToggleEdit={() => onToggleEdit(id)}
            onToggleTimer={() => onToggleTimer(id)}
            onFocusOff={() => onFocusOff(id)}
            editItemTime={editItemTime}
          />
        </li>
      );
    });

    return <ul className="task-list">{elements}</ul>;
  }
}
