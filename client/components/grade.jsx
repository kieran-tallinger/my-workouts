import React from 'react';

function Grade(props) {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.course}</td>
      <td>{props.grade}</td>
      <button onClick={props.delete} className='btn btn-danger mx-1'>DELETE</button>
    </tr>
  );
}

export default Grade;
