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

  constructor(props) {
    super(props);
    this.state = {
      label: '',
      min: props.min,
      sec: props.sec,
    };
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  startTimer = () => {
    const { onToggleTimer } = this.props;
    this.myInterval = setInterval(() => {
      const { min, sec } = this.state;
      const { id, editItemTime } = this.props;
      if (sec > 0) {
        this.setState({
          sec: sec - 1,
        });
      }
      if (sec === 1) {
        if (min === 0) {
          clearInterval(this.myInterval);
          onToggleTimer();
        } else {
          this.setState(() => ({
            min: min - 1,
            sec: 59,
          }));
        }
      }
      editItemTime(min, sec, id);
    }, 1000);
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
    const { id, label, onTimer, createTime, onToggleDone, onToggleTimer, onDeleted, onToggleEdit } = this.props;
    const { min, sec } = this.state;
    const time = formatDistanceToNow(createTime, { includeSeconds: true });

    return (
      <>
        <div className="view">
          <input id={id} className="toggle" type="checkbox" onClick={onToggleDone} />
          <label htmlFor={id}>
            <span className="title">{label}</span>
            <span className="description">
              {!onTimer ? (
                <button
                  className="icon icon-play"
                  type="button"
                  onClick={() => {
                    if (sec !== 0 || min !== 0) {
                      onToggleTimer();
                      this.startTimer();
                    }
                  }}
                />
              ) : (
                <button
                  className="icon icon-pause"
                  type="button"
                  onClick={() => {
                    onToggleTimer();
                    clearInterval(this.myInterval);
                  }}
                />
              )}
              {min}:{sec < 10 ? `0${sec}` : sec}
            </span>
            <span className="description">created {time} ago</span>
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
