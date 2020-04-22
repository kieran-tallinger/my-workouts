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
          <i></i>
        </a>
        <a onClick={() => props.delete(props.id)}>
          <i></i>
        </a>
      </td>
    </tr>
  );
}

export default Routine;
