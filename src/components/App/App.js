import React, { Component } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import TaskList from '../TaskList/TaskList';

export default class App extends Component {

  state = {

    minId: 0,

    todoData: [
      { label: 'Completed task', done: false, createTime: new Date() - 600000, id: 1 },
      { label: 'Editing task', done: false, createTime: new Date() - 30000, id: 2 },
      { label: 'Active task', done: false, createTime: new Date(), id: 3 }
    ]
  }

  deleteItem = (id) => {
    this.setState(( { todoData} ) => {
      const index = todoData.findIndex((el) => el.id === id);
      let newData = [...todoData.slice(0, index), ...todoData.slice(index + 1)];

      return {
        todoData: newData
      }
    })
  }

  render () {
    return (
      <section className="todoapp">
        <Header />
        <section className="main">
          <TaskList 
            todos = { this.state.todoData } 
            deleteItem = { this.deleteItem } />
          <Footer />
        </section>
      </section>
    );
  }

};
