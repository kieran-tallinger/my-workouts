import React from 'react';

function Routine(props) {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.description}</td>
      <td>{props.difficulty}</td>
      <td>
        <a onClick={() => props.select(props.id)}>
          <i></i>
        </a>
        <a onClick={() => props.update(props.id)}>
          <i className='fas fa-edit fa-lg mr-3'></i>
        </a>
        <a onClick={() => props.delete(props.id)}>
          <i className='fas fa-trash-alt fa-lg ml-3'></i>
        </a>
      </td>
    </tr>
  );
}

export default Routine;
