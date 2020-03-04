import React from 'react';

function Grade(props) {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.course}</td>
      <td>{props.grade}</td>
      <td>
        <button
          onClick={() => props.delete(props.id)}
          className='btn btn-danger mx-1'>DELETE</button>
      </td>
    </tr>
  );
}

export default Grade;
