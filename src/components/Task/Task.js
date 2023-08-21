import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns'

export default class Task extends Component {

  render () {

    const { id, label, createTime, onToggleDone, onDeleted, editItem } = this.props;

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
          <button className="icon icon-edit"  onClick = { editItem } ></button>
          <button className="icon icon-destroy" onClick = { onDeleted } ></button>
        </div> 
        <input type="text" className="edit" defaultValue="Editing task"></input>
      </>
    );
  }
}