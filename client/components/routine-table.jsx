import React from 'react';
import Routine from './routines';

function RoutinesTable(props) {
  let hidden = null;
  if (props.routines.length > 0) {
    hidden = 'd-none';
  } else if (props.routines.length === 0) {
    hidden = '';
  }
  return (
    <table className='table table-bordered table-striped table-hover col'>
      <thead className='thead-dark'>
        <tr>
          <th>Routine</th>
          <th>Description</th>
          <th>Difficulty</th>
          <th>Operations</th>
        </tr>
      </thead>
      <tbody>
        {
          props.routines.map(routine => {
            return (
              <Routine
                key={routine.id}
                id={routine.id}
                name={routine.name}
                sets={routine.description}
                reps={routine.difficulty}
                delete={props.delete}
                update={props.update}
              />
            );
          })
        }
        <tr className={hidden}>
          <td>No Routines Were Found</td>
        </tr>
      </tbody>
    </table>
  );

}

export default RoutinesTable;
