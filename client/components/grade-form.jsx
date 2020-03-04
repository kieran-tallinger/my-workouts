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

  componentDidUpdate(prevProps) {
    if (this.props.currentlyEditing !== prevProps.currentlyEditing) {
      return null;
    }
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
    const header = this.props.currentlyEditing ? 'Update Grade' : 'Add a Grade';
    return (
      <div className='col'>
        <div className='text-center pb-1'>
          <h3>{header}</h3>
        </div>
        <form onSubmit={this.handleSubmit} onReset={this.handleReset}>
          <div className='form-row my-2'>
            <i className='col-1 fas fa-user py-2 mx-2 fa-lg'></i>
            <input
              required
              autoFocus
              type='text'
              placeholder='Name'
              className='form-control col ml-2'
              value={this.state.name}
              onChange={this.handleNameChange}/>
          </div>
          <div className='form-row my-2'>
            <i className='col-1 far fa-list-alt py-2 mx-2 fa-lg'></i>
            <input
              required
              type='text'
              placeholder='Course'
              className='form-control col ml-2'
              value={this.state.course}
              onChange={this.handleCourseChange} />
          </div>
          <div className='form-row my-2'>
            <i className='col-1 fas fa-graduation-cap py-2 mx-2 fa-lg'></i>
            <input
              required
              type='text'
              placeholder='Grade'
              className='form-control col ml-2'
              value={this.state.grade}
              onChange={this.handleGradeChange} />
          </div>
          <div className='form-row my-3 justify-content-end'>
            <button type='submit' className='btn btn-success mx-1'>Add</button>
            <button type='reset' className='btn btn-warning mx-1'>Cancel</button>
          </div>
        </form>
      </div>
    );
  }
}

export default GradeForm;
