import React, { Component } from 'react';

class GradeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      course: '',
      grade: ''
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCourseChange = this.handleCourseChange.bind(this);
    this.handleGradeChange = this.handleGradeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  handleCourseChange(e) {
    this.setState({
      course: e.target.value
    });
  }

  handleGradeChange(e) {
    this.setState({
      grade: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const newGrade = {
      name: this.state.name,
      course: this.state.course,
      grade: parseInt(this.state.grade)
    };
    this.props.onSubmit(newGrade);
    this.setState({
      name: '',
      course: '',
      grade: ''
    });
  }

  handleReset() {
    this.setState({
      name: '',
      course: '',
      grade: ''
    });
  }

  render() {
    return (
      <div className='col'>
        <form onSubmit={this.handleSubmit}>
          <div className='form-row my-2'>
            <i className='col-1 fas fa-user py-2 mx-2 fa-lg'></i>
            <input
              required
              autoFocus
              type='text'
              placeholder='Name'
              className='col'
              value={this.state.name}
              onChange={this.handleNameChange}/>
          </div>
          <div className='form-row my-2'>
            <i className='col-1 far fa-list-alt py-2 mx-2 fa-lg'></i>
            <input
              required
              type='text'
              placeholder='Course'
              className='col'
              value={this.state.course}
              onChange={this.handleCourseChange} />
          </div>
          <div className='form-row my-2'>
            <i className='col-1 fas fa-graduation-cap py-2 mx-2 fa-lg'></i>
            <input
              required
              type='text'
              placeholder='Grade'
              className='col'
              value={this.state.grade}
              onChange={this.handleGradeChange} />
          </div>
          <div className='form-row my-3'>
            <div className="col-6"></div>
            <button type='submit' className='btn btn-success mx-1'>Add</button>
            <button type='reset' className='btn btn-warning mx-1' onClick={this.handleReset}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }
}

export default GradeForm;
