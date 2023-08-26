import React, { Component } from 'react';

export default class NewTaskForm extends Component {

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
    this.props.addItem(this.state.label);
    this.setState({
      label: ''
    })
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
