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
    <div className='col mt-5'>
      <table className='table table-responsive table-bordered table-striped table-hover'>
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
                  key={routine.routineId}
                  id={routine.routineId}
                  name={routine.name}
                  description={routine.description}
                  difficulty={routine.difficulty}
                  select={props.select}
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
    </div>

  );

}

export default RoutinesTable;
