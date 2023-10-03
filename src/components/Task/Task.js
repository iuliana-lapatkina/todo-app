import React, { useState, useEffect, useCallback, useRef } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

function Task(props) {
  const {
    min: minutes,
    sec: seconds,
    id,
    label,
    editItemTime,
    onFocusOff,
    onEdited,
    onTimer,
    createTime,
    onToggleDone,
    onToggleTimer,
    onDeleted,
    onToggleEdit,
  } = props;
  const time = formatDistanceToNow(createTime, { includeSeconds: true });
  let interval;

  const [taskLabel, setTaskLabel] = useState('');
  const [min, setMin] = useState(minutes);
  const [sec, setSec] = useState(seconds);

  const startTimer = () => {
    interval = setTimeout(() => {
      if (sec > 0) {
        setSec(sec - 1);
      }
      if (sec === 0) {
        if (min === 0) {
          clearInterval(interval);
        } else {
          setSec(59);
          setMin(min - 1);
        }
      }
      editItemTime(min, sec, id);
    }, 1000);
  };

  useEffect(() => {
    if (onTimer) {
      startTimer();
    }
    return () => clearInterval(interval);
  });

  const onLabelChange = (e) => {
    setTaskLabel(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!taskLabel.trim()) {
      onEdited(label, id);
      setTaskLabel(label);
    } else {
      onEdited(taskLabel, id);
      setTaskLabel('');
    }
  };

  const onFocusOffInput = (e) => {
    setTaskLabel(taskLabel);
    onFocusOff();
  };

  const enterPress = (e) => {
    if (e.keyCode === 13) {
      onSubmit(e);
    }
    if (e.keyCode === 27) {
      onFocusOff();
    }
  };

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
                    startTimer();
                  }
                }}
              />
            ) : (
              <button
                className="icon icon-pause"
                type="button"
                onClick={() => {
                  onToggleTimer();
                  clearInterval(interval);
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
        onSubmit={onSubmit}
        onChange={onLabelChange}
        onKeyDown={enterPress}
        onBlur={onFocusOffInput}
      />
    </>
  );
}

Task.defaultProps = {
  createTime: new Date(),
};

Task.propTypes = {
  label: PropTypes.string.isRequired,
  createTime: PropTypes.instanceOf(Date),
  onToggleDone: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onEdited: PropTypes.func.isRequired,
  onToggleEdit: PropTypes.func.isRequired,
  onFocusOff: PropTypes.func.isRequired,
};

export default Task;
