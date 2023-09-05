import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

export default class Task extends Component {
  static defaultProps = {
    createTime: new Date(),
  };

  static propTypes = {
    label: PropTypes.string.isRequired,
    createTime: PropTypes.instanceOf(Date),
    onToggleDone: PropTypes.func.isRequired,
    onDeleted: PropTypes.func.isRequired,
    onEdited: PropTypes.func.isRequired,
    onToggleEdit: PropTypes.func.isRequired,
    onFocusOff: PropTypes.func.isRequired,
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
    e.preventDefault();
    const { id, label, onEdited } = this.props;
    const { label: stateLabel } = this.state;
    if (!stateLabel.trim()) {
      onEdited(label, id);
      this.setState({
        label,
      });
    } else {
      onEdited(stateLabel, id);
      this.setState({
        label: '',
      });
    }
  };

  onFocusOffInput = (e) => {
    const { onFocusOff } = this.props;
    const { label: stateLabel } = this.state;
    this.setState({
      label: stateLabel,
    });
    onFocusOff();
  };

  enterPress = (e) => {
    const { onFocusOff } = this.props;
    if (e.keyCode === 13) {
      this.onSubmit(e);
    }
    if (e.keyCode === 27) {
      onFocusOff();
    }
  };

  render() {
    const { id, label, createTime, onToggleDone, onDeleted, onToggleEdit } = this.props;

    const time = formatDistanceToNow(createTime, { includeSeconds: true });

    return (
      <>
        <div className="view">
          <input id={id} className="toggle" type="checkbox" onClick={onToggleDone} />
          <label htmlFor={id}>
            <span className="description">{label}</span>
            <span className="created">created {time} ago</span>
          </label>
          <button type="button" className="icon icon-edit" onClick={onToggleEdit} />
          <button type="button" className="icon icon-destroy" onClick={onDeleted} />
        </div>
        <input
          type="text"
          className="edit"
          defaultValue={label}
          onSubmit={this.onSubmit}
          onChange={this.onLabelChange}
          onKeyDown={this.enterPress}
          onBlur={this.onFocusOffInput}
        />
      </>
    );
  }
}
