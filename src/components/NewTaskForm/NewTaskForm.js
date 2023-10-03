import React, { useState } from 'react';
import PropTypes from 'prop-types';

function NewTaskForm(props) {
  const { addItem } = props;

  const [label, setLabel] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const onMinChange = (e) => {
    if (Number(e.target.value) >= 0) {
      setMin(Number(e.target.value));
    }
  };

  const onSecChange = (e) => {
    if (Number(e.target.value) >= 0) {
      setSec(Number(e.target.value));
    }
  };

  const resetValues = () => {
    setLabel('');
    setMin('');
    setSec('');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!label.trim()) {
      resetValues();
      return;
    }
    addItem(label, min, sec);
    resetValues();
  };

  const enterPress = (e) => {
    if (e.keyCode === 13) {
      onSubmit(e);
    }
    if (e.keyCode === 27) {
      resetValues();
    }
  };

  return (
    <form className="new-todo-form">
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={label}
        onChange={onLabelChange}
        onKeyDown={enterPress}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        autoFocus
        value={min}
        onKeyDown={enterPress}
        onChange={onMinChange}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        autoFocus
        value={sec}
        onKeyDown={enterPress}
        onChange={onSecChange}
      />
    </form>
  );
}

NewTaskForm.propTypes = {
  addItem: PropTypes.func.isRequired,
};

export default NewTaskForm;
