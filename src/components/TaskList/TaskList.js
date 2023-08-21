import React, { Component } from 'react';

import Task from '../Task/Task';

export default class TaskList extends Component {


  render () {
    const { todos, deleteItem } = this.props;

    const elements = todos.map((item) => {
      const { id, ...itemProps } = item;
  
      return (
        <li key={id} >   
          <Task 
            {...itemProps }
            deleteItem = { () => deleteItem(id) } />
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

