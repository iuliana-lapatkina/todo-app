import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  static propTypes = {
    addItem: PropTypes.func.isRequired,
  };

  state = {
    label: '',
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    const { label } = this.state;
    const { addItem } = this.props;
    e.preventDefault();
    if (!label.trim()) {
      this.setState({
        label: '',
      });
      return;
    }
    addItem(label);
    this.setState({
      label: '',
    });
  };

  enterPress = (e) => {
    if (e.keyCode === 13) {
      this.onSubmit(e);
    }
  };

  render() {
    const { label } = this.state;
    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={label}
        onChange={this.onLabelChange}
        onKeyDown={this.enterPress}
      />
    );
  }
}
