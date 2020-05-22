import React from 'react';
import Exercise from './exercise';

function ExerciseTable(props) {
  let hidden = null;
  if (props.exercises.length > 0) {
    hidden = 'd-none';
  } else if (props.exercises.length === 0) {
    hidden = '';
  }
  if (props.selectedRoutine === true) {
    return (
      <div className='col-12 col-md-6 mt-5'>
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
                    key={exercise.routineExerciseId}
                    id={exercise.routineExerciseId}
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
  } else if (props.selectedRoutine === false) {
    return (
      <div className='col-12 col-md-6 mt-5'>
        <table className='table table-bordered table-striped table-hover col'>
          <thead className='thead-dark'>
            <tr>
              <th>Exercise</th>
              <th>Description</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {
              props.exercises.map(exercise => {
                return (
                  <Exercise
                    key={exercise.exerciseId}
                    id={exercise.exerciseId}
                    name={exercise.name}
                    description={exercise.description}
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

}

export default ExerciseTable;
