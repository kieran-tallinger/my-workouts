import React from 'react';
import Exercise from './exercise';

function ExerciseTable(props) {
  let hidden = null;
  if (props.exercises.length > 0) {
    hidden = 'd-none';
  } else if (props.exercises.length === 0) {
    hidden = '';
  }
  return (
    <div className='col mt-5'>
      <table className='table table-bordered table-striped table-hover col'>
        <thead className='thead-dark'>
          <tr>
            <th>Exercise</th>
            <th>Sets</th>
            <th>Reps</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {
            props.exercises.map(exercise => {
              return (
                <Exercise
                  key={exercise.id}
                  id={exercise.id}
                  name={exercise.name}
                  sets={exercise.sets}
                  reps={exercise.reps}
                  delete={props.delete}
                  update={props.update}
                />
              );
            })
          }
          <tr className={hidden}>
            <td>No Exercises Were Found</td>
          </tr>
        </tbody>
      </table>
      <button
        className='btn btn-danger'
        onClick={() => props.back('routines')}>
        Back to Routines
      </button>
    </div>
  );

}

export default ExerciseTable;
