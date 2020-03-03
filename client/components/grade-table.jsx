import React from 'react';
import Grade from './grade';

function GradeTable(props) {
  return (
    <table className='table table-bordered table-striped table-hover'>
      <thead className='thead-dark'>
        <tr>
          <th>Student Name</th>
          <th>Course</th>
          <th>Grade</th>
        </tr>
      </thead>
      <tbody>
        {
          props.grades.map(student => {
            return (
              <Grade
                key={student.id}
                name={student.name}
                course={student.course}
                grade={student.grade}
              />
            );
          })
        }
      </tbody>
    </table>
  );

}

export default GradeTable;
