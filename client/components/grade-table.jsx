/* eslint-disable */
import React, { Component } from 'react';
import Grade from './grade'

class GradeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: this.props.grades
    }
  }
  render(){
    const grades = this.state.grades ? this.state.grades : 'No Grades Recorded';
    return(
      <table className='table table-bordered table-striped table-hover'>
        <thead className='thead-dark'>
          <tr>
            <th>Student Name</th>
            <th>Course</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {grades}
        </tbody>
      </table>
    )
  }
}
