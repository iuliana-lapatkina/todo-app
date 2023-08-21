import React, { Component } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import TaskList from '../TaskList/TaskList';

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Completed task', new Date()),
      this.createTodoItem('Editing task', new Date()),
      this.createTodoItem('Active task', new Date()),
    ]
  };

  createTodoItem (label, createTime) {
    return  {
      label,
      done: false,
      editing: false,
      createTime,
      id: this.maxId++
    }
  }

  deleteItem = (id) => {
    this.setState(( { todoData } ) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ];
      console.log(todoData);
      console.log(newArray);
      return {
        todoData: newArray
      }
    });
  }

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = {...oldItem,
      [propName]: !oldItem[propName]
    }
    
    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ];
  }

  editItem = (id) => {
    this.setState(( { todoData } ) => {
      console.log('editItem', id);
      console.log(todoData);
      return {
        todoData: this.toggleProperty(todoData, id, 'editing')
      }
    })
  };

  onToggleDone = (id) => {
    this.setState(( { todoData } ) => {
      console.log('onToggleDone', id);
      console.log(todoData);
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    })
  };

  render () {
    return (
      <section className="todoapp">
        <Header />
        <section className="main">
          <TaskList 
            todos = { this.state.todoData } 
            onDeleted = { this.deleteItem }
            onToggleDone = { this.onToggleDone }
            editItem = { this.editItem } />
          <Footer />
        </section>
      </section>
    );
  }

};
