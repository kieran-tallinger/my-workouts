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
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleCourseChange =this.handleCourseChange.bind(this)
    this.handleGradeChange = this.handleGradeChange.bind(this)
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
  render(){
    return(
      <div>
        <form>
          <div className='form-row my-2'>
            <i className='col-1 fas fa-user py-2 mx-2 fa-lg'></i>
            <input
              required
              autofocus
              type='text'
              placeholder='Name'
              className='col'
              onChange={this.handleNameChange}/>
          </div>
          <div className='form-row my-2'>
            <i className='col-1 far fa-list-alt py-2 mx-2 fa-lg'></i>
            <input
              required
              type='text'
              placeholder='Course'
              className='col'
              onChange={this.handleCourseChange} />
          </div>
          <div className='form-row my-2'>
            <i className='col-1 fas fa-graduation-cap py-2 mx-2 fa-lg'></i>
            <input
              required
              type='text'
              placeholder='Grade'
              className='col'
              onChange={this.handleGradeChange} />
          </div>
        </form>
      </div>
    )
  }
}
