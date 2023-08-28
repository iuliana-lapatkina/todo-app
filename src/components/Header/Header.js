import React from 'react';

import NewTaskForm from '../NewTaskForm/NewTaskForm'

const Header = ( { addItem } ) => {

  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm addItem = { addItem }/>
    </header>
  )
}

export default Header;