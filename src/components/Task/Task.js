import React from 'react';
import { formatDistanceToNow } from 'date-fns'

const Task = ({ status }) => {

  const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);


  let time = formatDistanceToNow(
    new Date() - 4000,
    {includeSeconds: true}
  )
  
  return (
    <li className={status}>
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label>
          <span className="description">{capitalize(status)} task</span>
          <span className="created">created {time} ago</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy"></button>
      </div> 
      <input type="text" className="edit" defaultValue="Editing task"></input>
    </li>
  );
}

export default Task;