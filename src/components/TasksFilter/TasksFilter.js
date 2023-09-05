import React from 'react';
import PropTypes from 'prop-types';

function TasksFilter(props) {
  const { onFiltered, currentFilter } = props;

  const listButtons = ['All', 'Active', 'Completed'].map((filter) => {
    return (
      <li key={filter}>
        <button
          className={filter === currentFilter ? 'selected' : null}
          type="button"
          onClick={() => onFiltered(filter)}
        >
          {filter}
        </button>
      </li>
    );
  });

  return <ul className="filters">{listButtons}</ul>;
}

TasksFilter.propTypes = {
  onFiltered: PropTypes.func.isRequired,
};

export default TasksFilter;
