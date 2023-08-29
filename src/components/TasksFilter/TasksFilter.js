import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TasksFilter extends Component {
  static propTypes = {
    onFiltered: PropTypes.func.isRequired,
  };

  state = {
    isSelectedAll: true,
    isSelectedActive: false,
    isSelectedDone: false,
  };

  isSelected = (prop) => {
    this.setState(({ isSelectedAll, isSelectedActive, isSelectedDone }) => {
      if (!prop) {
        return {
          isSelectedAll: !isSelectedAll,
          isSelectedActive: false,
          isSelectedDone: false,
        };
      }
      if (prop === 'active') {
        return {
          isSelectedActive: !isSelectedActive,
          isSelectedAll: false,
          isSelectedDone: false,
        };
      }
      if (prop === 'done') {
        return {
          isSelectedDone: !isSelectedDone,
          isSelectedAll: false,
          isSelectedActive: false,
        };
      }
      return true;
    });
  };

  render() {
    const { onFiltered } = this.props;
    const { isSelectedAll, isSelectedActive, isSelectedDone } = this.state;

    return (
      <ul className="filters">
        <li>
          <button
            type="button"
            className={isSelectedAll ? 'selected' : null}
            onClick={() => {
              onFiltered();
              this.isSelected();
            }}
          >
            All
          </button>
        </li>
        <li>
          <button
            type="button"
            className={isSelectedActive ? 'selected' : null}
            onClick={() => {
              onFiltered('active');
              this.isSelected('active');
            }}
          >
            Active
          </button>
        </li>
        <li>
          <button
            type="button"
            className={isSelectedDone ? 'selected' : null}
            onClick={() => {
              onFiltered('done');
              this.isSelected('done');
            }}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }
}
