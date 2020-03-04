import React from 'react';
import Grade from './grade';

function GradeTable(props) {
  let hidden = null;
  if (props.grades.length > 0) {
    hidden = 'd-none';
  } else if (props.grades.length === 0) {
    hidden = '';
  }
  return (
    <table className='table table-bordered table-striped table-hover col'>
      <thead className='thead-dark'>
        <tr>
          <th>Student Name</th>
          <th>Course</th>
          <th>Grade</th>
          <th>Operations</th>
        </tr>
      </thead>
      <tbody>
        {
          props.grades.map(student => {
            return (
              <Grade
                key={student.id}
                id={student.id}
                name={student.name}
                course={student.course}
                grade={student.grade}
                delete={props.delete}
              />
            );
          })
        }
        <tr className={hidden}>
          <td>No Grades Were Found</td>
        </tr>
      </tbody>
    </table>
  );

}

export default GradeTable;
