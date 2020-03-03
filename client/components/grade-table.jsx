import React, { Component } from 'react';

class GradeTable extends Component {
  render(props) {
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
          {props.grades}
        </tbody>
      </table>
    );
  }
}

export default GradeTable;
