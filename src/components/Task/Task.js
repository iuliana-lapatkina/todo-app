import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns'

export default class Task extends Component {

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
    this.props.onEdited(this.state.label, id);
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