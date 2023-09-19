import React, { Component } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import TaskList from '../TaskList/TaskList';

export default class App extends Component {
  startId = 1;

  state = {
    todoData: [
      this.createTodoItem('Completed', 1, 0),
      this.createTodoItem('Editing', 0, 10),
      this.createTodoItem('Active', 0, 4),
    ],
    currentFilter: 'All',
  };

  addItem = (label, min, sec) => {
    this.setState(({ todoData }) => {
      const newItem = this.createTodoItem(label, min, sec);
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

  editItemTime = (newMin, newSec, id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[index];
      const newItem = { ...oldItem, min: newMin, sec: newSec };
      const newData = [...todoData.slice(0, index), newItem, ...todoData.slice(index + 1)];
      return {
        todoData: newData,
      };
    });
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

  onToggleTimer = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'onTimer'),
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

  createTodoItem(label, min, sec) {
    let newMin = Number(min);
    let newSec = Number(sec);
    while (newSec > 60) {
      newMin += 1;
      newSec -= 60;
    }
    return {
      label,
      min: newMin,
      sec: newSec,
      done: false,
      editing: false,
      hidden: false,
      createTime: new Date(),
      id: this.startId++,
      onTimer: false,
    };
  }

  render() {
    const { todoData, currentFilter } = this.state;
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;
    console.log(todoData);
    return (
      <section className="todoapp">
        <Header addItem={this.addItem} />
        <section className="main">
          <TaskList
            todos={todoData}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            onToggleTimer={this.onToggleTimer}
            onEdited={this.ediItem}
            onToggleEdit={this.onToggleEdit}
            onFocusOff={this.onFocusOff}
            editItemTime={this.editItemTime}
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
