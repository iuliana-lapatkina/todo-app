import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types';
export default class Task extends Component {

  static defaultProps = {
    createTime: new Date()
  }

  static propTypes = {
    label: PropTypes.string.isRequired,
    createTime: PropTypes.instanceOf(Date),
    onToggleDone: PropTypes.func.isRequired,
    onDeleted: PropTypes.func.isRequired,
    onEdited: PropTypes.func.isRequired, 
    onToggleEdit: PropTypes.func.isRequired
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
    let id = this.props.id;
    if (!(this.state.label).trim()) {
      this.props.onEdited(this.props.label, id);
      this.setState({
        label: (this.props.label)
      })
    } else {
      this.props.onEdited(this.state.label, id);
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

    const { id, label, createTime, onToggleDone, onDeleted, onToggleEdit } = this.props;

    let time = formatDistanceToNow(
      createTime,
      {includeSeconds: true}
    )

    return (
      <>
        <div className="view" >
          <input id={ id } className="toggle" type="checkbox" onClick = { onToggleDone }/>
          <label htmlFor={ id }  >
            <span className="description">{ label }</span>
            <span className="created">created {time} ago</span>
          </label>
          <button className="icon icon-edit" onClick = { onToggleEdit } ></button>
          <button className="icon icon-destroy" onClick = { onDeleted } ></button>
        </div> 
        <input type="text" className="edit" defaultValue={ label } 
          onSubmit={ this.onSubmit }
          onChange = { this.onLabelChange }
          onKeyDown  = { this.enterPress }></input>
      </>
    );
  }
}