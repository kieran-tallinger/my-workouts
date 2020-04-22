import React, { Component } from 'react';

class ExerciseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sets: '',
      reps: ''
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSetsChange = this.handleSetsChange.bind(this);
    this.handleRepsChange = this.handleRepsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentlyEditing !== prevProps.currentlyEditing) {
      if (this.props.currentlyEditing) {
        this.setState({
          name: this.props.currentlyEditing.name,
          sets: this.props.currentlyEditing.sets,
          reps: this.props.currentlyEditing.reps
        });
      } else if (!this.props.currentlyEditing) {
        this.setState({
          name: '',
          sets: '',
          reps: ''
        });
      }
    }
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  handleSetsChange(e) {
    this.setState({
      sets: e.target.value
    });
  }

  handleRepsChange(e) {
    this.setState({
      reps: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const newExercise = {
      name: this.state.name,
      sets: parseInt(this.state.sets),
      reps: parseInt(this.state.reps)
    };
    this.props.onSubmit(newExercise);
    this.setState({
      name: '',
      sets: '',
      reps: ''
    });
  }

  handleReset() {
    this.setState({
      name: '',
      sets: '',
      reps: ''
    });
  }

  render() {
    const header = this.props.currentlyEditing ? 'Update Exercise' : 'Add an Exercise';
    const submitButton = this.props.currentlyEditing ? 'Update' : 'Add';
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
              placeholder='Sets'
              className='form-control col ml-2'
              value={this.state.sets}
              onChange={this.handleSetsChange} />
          </div>
          <div className='form-row my-2'>
            <i className='col-1 fas fa-graduation-cap py-2 mx-2 fa-lg'></i>
            <input
              required
              type='text'
              placeholder='Reps'
              className='form-control col ml-2'
              value={this.state.reps}
              onChange={this.handleRepsChange} />
          </div>
          <div className='form-row my-3 justify-content-end'>
            <button type='submit' className='btn btn-success mx-1'>{submitButton}</button>
            <button type='reset' className='btn btn-warning mx-1'>Cancel</button>
          </div>
        </form>
      </div>
    );
  }
}

export default ExerciseForm;
