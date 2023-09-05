import React, { Component } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import TaskList from '../TaskList/TaskList';

export default class App extends Component {
  startId = 1;

  state = {
    todoData: [
      this.createTodoItem('Completed task'),
      this.createTodoItem('Editing task'),
      this.createTodoItem('Active task'),
    ],
    currentFilter: 'All',
  };

  addItem = (label) => {
    this.setState(({ todoData }) => {
      const newItem = this.createTodoItem(label);
      return {
        todoData: [...todoData, newItem],
      };
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((item) => item.id !== id);
      return {
        todoData: newArray,
      };
    });
  };

  ediItem = (newLabel, id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[index];
      const newItem = { ...oldItem, label: newLabel };
      const newData = [...todoData.slice(0, index), newItem, ...todoData.slice(index + 1)];
      return {
        todoData: newData,
      };
    });
    this.onToggleEdit(id);
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done'),
      };
    });
  };

  onToggleEdit = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'editing'),
      };
    });
  };

  onFocusOff = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[index];
      const newItem = { ...oldItem, editing: false };
      const newData = [...todoData.slice(0, index), newItem, ...todoData.slice(index + 1)];

      return {
        todoData: newData,
      };
    });
  };

  onFiltered = (status) => {
    const newCurrentFilter = status;
    let doneId = [];
    this.allVisible();
    this.setState(({ todoData, currentFilter }) => {
      if (status === 'Active') {
        doneId = todoData.filter((el) => el.done).map((el) => el.id);
      }
      if (status === 'Completed') {
        doneId = todoData.filter((el) => !el.done).map((el) => el.id);
      }

      const newArr = [...todoData];
      doneId.forEach((id) => {
        let newItem = todoData.find((el) => el.id === id);
        newItem = { ...newItem, hidden: true };
        const newItemIndx = todoData.findIndex((el) => el.id === id);
        newArr[newItemIndx] = newItem;
      });
      return {
        todoData: newArr,
        currentFilter: newCurrentFilter,
      };
    });
  };

  allVisible = () => {
    this.setState(({ todoData }) => {
      const newData = [...todoData];
      newData.map((el) => (el.hidden = false));
      return {
        todoData: newData,
      };
    });
  };

  clearCompleted = () => {
    const { todoData } = this.state;
    const doneArray = todoData.filter((el) => el.done);
    doneArray.forEach((item) => this.deleteItem(item.id));
  };

  toggleProperty(arr, id, propName) {
    const index = arr.findIndex((el) => el.id === id);
    const oldItem = arr[index];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];
  }

  createTodoItem(label) {
    return {
      label,
      done: false,
      editing: false,
      hidden: false,
      createTime: new Date(),
      id: this.startId++,
    };
  }

  render() {
    const { todoData, currentFilter } = this.state;
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <section className="todoapp">
        <Header addItem={this.addItem} />
        <section className="main">
          <TaskList
            todos={todoData}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            onEdited={this.ediItem}
            onToggleEdit={this.onToggleEdit}
            onFocusOff={this.onFocusOff}
          />
          <Footer
            todoCount={todoCount}
            clearCompleted={this.clearCompleted}
            onFiltered={this.onFiltered}
            currentFilter={currentFilter}
          />
        </section>
      </section>
    );
  }
}
