import React, { Component } from 'react';

import NewTaskForm from '../NewTaskForm/NewTaskForm'

export default class Header extends Component {

  render() {
    const { addItem } = this.props;

    return (
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm addItem = { addItem }/>
      </header>
    )
  }
}