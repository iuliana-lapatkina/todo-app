import React, { Component } from 'react';
import PropTypes from 'prop-types';
export default class NewTaskForm extends Component {

  static propTypes = {
    addItem: PropTypes.func.isRequired
  }

  state = {
    label: ''
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (!(this.state.label).trim()) {
      this.setState({
        label: ''
      })
      return;
    } else {
      this.props.addItem(this.state.label);
      this.setState({
        label: ''
      })
    };
  }

  enterPress = (e) => {
    if (e.keyCode === 13) {
      this.onSubmit(e);
    }
  }

  render () {

    return <input 
      className="new-todo"
      placeholder="What needs to be done?"
      autoFocus
      value={this.state.label}
      onChange = { this.onLabelChange }
      onKeyDown  = { this.enterPress } />
  }
}