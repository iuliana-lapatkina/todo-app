import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  static propTypes = {
    addItem: PropTypes.func.isRequired,
  };

  state = {
    label: '',
    min: '',
    sec: '',
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onMinChange = (e) => {
    if (Number(e.target.value) >= 0) {
      this.setState({
        min: Number(e.target.value),
      });
    }
  };

  onSecChange = (e) => {
    if (Number(e.target.value) >= 0) {
      this.setState({
        sec: Number(e.target.value),
      });
    }
  };

  onSubmit = (e) => {
    const { label, min, sec } = this.state;
    const { addItem } = this.props;
    e.preventDefault();
    if (!label.trim()) {
      this.setState({
        label: '',
        min: '',
        sec: '',
      });
      return;
    }
    addItem(label, min, sec);
    this.setState({
      label: '',
      min: '',
      sec: '',
    });
  };

  enterPress = (e) => {
    if (e.keyCode === 13) {
      this.onSubmit(e);
    }
    if (e.keyCode === 27) {
      this.setState({
        label: '',
        min: '',
        sec: '',
      });
    }
  };

  render() {
    const { label, min, sec } = this.state;
    return (
      <form className="new-todo-form">
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={label}
          onChange={this.onLabelChange}
          onKeyDown={this.enterPress}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          autoFocus
          value={min}
          onKeyDown={this.enterPress}
          onChange={this.onMinChange}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          autoFocus
          value={sec}
          onKeyDown={this.enterPress}
          onChange={this.onSecChange}
        />
      </form>
    );
  }
}
