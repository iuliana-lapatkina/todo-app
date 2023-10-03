import React, { useState, useEffect } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import TaskList from '../TaskList/TaskList';

function App() {
  const [currentFilter, setCurrentFilter] = useState('All');
  const [startId, setStartId] = useState(localStorage.getItem('startId') || 1);
  const [todoData, setTodoData] = useState(() => {
    if (localStorage.length !== 0) {
      const newData = JSON.parse(localStorage.getItem('todoData'));
      newData.map((item) => {
        let newTime = item.createTime;
        newTime = new Date(newTime);
        return (item.createTime = newTime);
      });
      return newData;
    }
    return [];
  });

  const doneCount = todoData.filter((el) => el.done).length;
  const todoCount = todoData.length - doneCount;

  useEffect(() => {
    localStorage.setItem('todoData', JSON.stringify(todoData));
    localStorage.setItem('startId', startId);
  }, [todoData, startId]);

  const createTodoItem = (label, min, sec) => {
    let newMin = Number(min);
    let newSec = Number(sec);
    setStartId(Number(startId) + 1);
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
      id: startId,
      onTimer: false,
    };
  };

  const toggleProperty = (arr, id, propName) => {
    const index = arr.findIndex((el) => el.id === id);
    const oldItem = arr[index];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];
  };

  const onToggleDone = (id) => {
    setTodoData(toggleProperty(todoData, id, 'done'));
  };

  const onToggleEdit = (id) => {
    setTodoData(toggleProperty(todoData, id, 'editing'));
  };

  const onToggleTimer = (id) => {
    setTodoData(toggleProperty(todoData, id, 'onTimer'));
  };

  const addItem = (label, min, sec) => {
    const newItem = createTodoItem(label, min, sec);
    setTodoData([...todoData, newItem]);
  };

  const deleteItem = (id) => {
    const newArray = todoData.filter((item) => item.id !== id);
    setTodoData(newArray);
  };

  const ediItem = (newLabel, id) => {
    const index = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[index];
    const newItem = { ...oldItem, label: newLabel, editing: false };
    const newData = [...todoData.slice(0, index), newItem, ...todoData.slice(index + 1)];
    setTodoData(newData);
  };

  const editItemTime = (newMin, newSec, id) => {
    const index = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[index];
    let newItem = { ...oldItem, min: newMin, sec: newSec };
    if (newMin === 0 && newSec === 0) {
      newItem = { ...oldItem, min: newMin, sec: newSec, onTimer: false };
    }
    const newData = [...todoData.slice(0, index), newItem, ...todoData.slice(index + 1)];
    setTodoData(newData);
  };

  const onFocusOff = (id) => {
    const index = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[index];
    const newItem = { ...oldItem, editing: false };
    const newData = [...todoData.slice(0, index), newItem, ...todoData.slice(index + 1)];
    setTodoData(newData);
  };

  const allVisible = () => {
    const newData = [...todoData];
    newData.map((el) => (el.hidden = false));
    setTodoData(newData);
  };

  const onFiltered = (status) => {
    const newCurrentFilter = status;
    let doneId = [];
    allVisible();
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
    setTodoData(newArr);
    setCurrentFilter(newCurrentFilter);
  };

  const clearCompleted = () => {
    const doneArray = todoData.filter((el) => el.done);
    doneArray.forEach((item) => deleteItem(item.id));
  };

  return (
    <section className="todoapp">
      <Header addItem={addItem} />
      <section className="main">
        <TaskList
          todos={todoData}
          onDeleted={deleteItem}
          onToggleDone={onToggleDone}
          onToggleTimer={onToggleTimer}
          onEdited={ediItem}
          onToggleEdit={onToggleEdit}
          onFocusOff={onFocusOff}
          editItemTime={editItemTime}
        />
        <Footer
          todoCount={todoCount}
          clearCompleted={clearCompleted}
          onFiltered={onFiltered}
          currentFilter={currentFilter}
        />
      </section>
    </section>
  );
}

export default App;
