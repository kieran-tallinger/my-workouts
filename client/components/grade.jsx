import React from 'react';

function Grade(props) {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.course}</td>
      <td>{props.grade}</td>
      <td className='text-center'>
        <a>
          <i className='fas fa-edit fa-lg pr-3'></i>
        </a>
        <a onClick={() => props.delete(props.id)}>
          <i className='fas fa-trash-alt fa-lg pl-3'></i>
        </a>
      </td>
    </tr>
  );
}

export default Grade;
