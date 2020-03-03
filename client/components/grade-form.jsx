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
          <div>
            <i className='col-1 fas fa-user py-2 mx-2 fa-lg'></i>
            <input
              required
              autofocus
              type='text'
              placeholder='Name'
              className='col'
              onChange={this.handleNameChange}/>
          </div>
        </form>
      </div>
    )
  }
}
