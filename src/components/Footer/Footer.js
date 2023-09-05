import React from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../TasksFilter/TasksFilter';

function Footer({ todoCount, currentFilter, onFiltered, clearCompleted }) {
  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} items left</span>
      <TasksFilter currentFilter={currentFilter} onFiltered={onFiltered} />
      <button type="button" className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.propTypes = {
  todoCount: PropTypes.number.isRequired,
  clearCompleted: PropTypes.func.isRequired,
};

export default Footer;
