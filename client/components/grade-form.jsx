/* eslint-disable */
import React, { Component } from 'react';

class GradeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      course: '',
      grade: ''
    };
  }
  handleNameChange(e){
    this.setState({
      name: e.target.value
    })
  }
  handleCourseChange(e) {
    this.setState({
      course: e.target.value
    })
  }
  handleGradeChange(e) {
    this.setState({
      grade: e.target.value
    })
  }
}
