import React from 'react';

function Grade(props) {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.course}</td>
      <td>{props.grade}</td>
      <td>
        <a>
          <i className='fas fa-edit fa-lg'></i>
        </a>
        <a onClick={() => props.delete(props.id)}>
          <i className='fas fa-trash-alt'></i>
        </a>
      </td>
    </tr>
  );
}

export default Grade;
