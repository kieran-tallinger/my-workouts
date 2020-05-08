import React from 'react';

function Exercise(props) {
  if (props.description) {
    return (
      <tr>
        <td>{props.name}</td>
        <td>{props.description}</td>
        <td className='text-center'>
          <a onClick={() => props.update(props.id)}>
            <i className='fas fa-edit fa-lg mr-3'></i>
          </a>
          <a onClick={() => props.delete(props.id)}>
            <i className='fas fa-trash-alt fa-lg ml-3'></i>
          </a>
        </td>
      </tr>
    );
  } else {
    return (
      <tr>
        <td>{props.name}</td>
        <td>{props.sets}</td>
        <td>{props.reps}</td>
        <td className='text-center'>
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

}

export default Exercise;
