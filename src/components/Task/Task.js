import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns'

export default class Task extends Component {

  state = {
    done: false
  }

  isCompleted = () => {
    this.setState(( { done } ) => {
      return {
        done: !done
      }
    })
  }

  render () {

    const { label, createTime, deleteItem } = this.props;
    const { done } = this.state;

    let classNames = 'view';
    if (done) {
      classNames += ' completed';
    }


    let time = formatDistanceToNow(
      createTime,
      {includeSeconds: true}
    )
    return (
      <>
        <div className = { classNames } onClick = { this.isCompleted } >
          <input className="toggle" type="checkbox" />
          <label>
            <span className="description">{ label }</span>
            <span className="created">created {time} ago</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick = { deleteItem } ></button>
        </div> 
        <input type="text" className="edit" defaultValue="Editing task"></input>
      </>
    );
  }
}