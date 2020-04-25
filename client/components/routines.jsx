import React from 'react';

function Routine(props) {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.description}</td>
      <td>{props.difficulty}</td>
      <td>
        <a onClick={() => props.select(props.id)}>
          <i className='fas fa-dumbbell fa-lg'></i>
        </a>
        <a onClick={() => props.update(props.id)}>
          <i className='fas fa-edit fa-lg mx-1'></i>
        </a>
        <a onClick={() => props.delete(props.id)}>
          <i className='fas fa-trash-alt fa-lg'></i>
        </a>
      </td>
    </tr>
  );
}

export default Routine;
