import React, { Component } from 'react';

class ExerciseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      sets: '',
      reps: '',
      choosenExercise: ''
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleExercisesChange = this.handleExercisesChange.bind(this);
    this.handleRepsChange = this.handleRepsChange.bind(this);
    this.handleSetsChange = this.handleSetsChange.bind(this);
    this.handleNewExerciseSubmit = this.handleNewExerciseSubmit.bind(this);
    this.handleRoutineExerciseSubmit = this.handleRoutineExerciseSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.createForm = this.createForm.bind(this);
    this.createExercisesList = this.createExercisesList.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentlyEditing !== prevProps.currentlyEditing) {
      if (this.props.currentlyEditing) {
        this.setState({
          name: this.props.currentlyEditing.name,
          description: this.props.currentlyEditing.description
        });
      } else if (!this.props.currentlyEditing) {
        this.setState({
          name: '',
          description: ''
        });
      }
    }
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  handleDescriptionChange(e) {
    this.setState({
      description: e.target.value
    });
  }

  handleExercisesChange(e) {
    this.setState({
      choosenExercise: e.target.value
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

  handleNewExerciseSubmit(e) {
    e.preventDefault();
    const newExercise = {
      name: this.state.name,
      description: this.state.description
    };
    this.props.onSubmit(newExercise);
    this.setState({
      name: '',
      description: ''
    });
  }

  handleRoutineExerciseSubmit(e) {
    e.preventDefault();
    const newRoutineExercise = {
      exerciseId: this.state.choosenExercise,
      routineId: this.props.selectedRoutineId,
      sets: this.state.sets,
      reps: this.state.reps
    };
    this.props.onSubmit(newRoutineExercise);
    this.setState({
      choosenExercise: '',
      sets: '',
      reps: ''
    });
  }

  handleReset() {
    this.setState({
      name: '',
      description: '',
      choosenExercise: '',
      sets: '',
      reps: ''
    });
  }

  createExercisesList() {
    return (
      <select
        required
        size='3'
        className='form-control col ml-2'
        value={this.state.choosenExercise}
        onChange={this.handleExercisesChange}>
        {
          this.props.exercises.map(exercise => {
            return (
              <option key={exercise.exerciseId} value={exercise.exerciseId}>
                {exercise.name}
              </option>
            );
          })
        }
      </select>
    );
  }

  createForm() {
    const submitButton = this.props.currentlyEditing ? 'Update' : 'Add';
    if (this.props.exercises) {
      const exercisesList = this.createExercisesList();
      return (
        <form onSubmit={this.handleRoutineExerciseSubmit} onReset={this.handleReset}>
          <div className='form-row my-2'>
            <i className='col-1 fas fa-dumbbell py-2 mx-2 fa-lg'></i>
            {exercisesList}
          </div>
          <div className='form-row my-2'>
            <i className='col-1 fas fa-user py-2 mx-2 fa-lg'></i>
            <input
              required
              type='text'
              placeholder='Number of Sets'
              className='form-control col ml-2'
              value={this.state.sets}
              onChange={this.handleSetsChange} />
          </div>
          <div className='form-row my-2'>
            <i className='col-1 far fa-list-alt py-2 mx-2 fa-lg'></i>
            <input
              required
              type='text'
              placeholder='Number of Reps'
              className='form-control col ml-2'
              value={this.state.reps}
              onChange={this.handleRepsChange} />
          </div>
          <div className='form-row my-3 justify-content-end'>
            <button type='submit' className='btn btn-success mx-1'>{submitButton}</button>
            <button type='reset' className='btn btn-warning mx-1'>Cancel</button>
          </div>
        </form>
      );
    } else {
      return (
        <form onSubmit={this.handleNewExerciseSubmit} onReset={this.handleReset}>
          <div className='form-row my-2'>
            <i className='col-1 fas fa-user py-2 mx-2 fa-lg'></i>
            <input
              required
              autoFocus
              type='text'
              placeholder='Name'
              className='form-control col ml-2'
              value={this.state.name}
              onChange={this.handleNameChange} />
          </div>
          <div className='form-row my-2'>
            <i className='col-1 far fa-list-alt py-2 mx-2 fa-lg'></i>
            <textarea
              required
              placeholder='A short description of the exercise'
              className='form-control col ml-2'
              value={this.state.description}
              onChange={this.handleDescriptionChange} />
          </div>
          <div className='form-row my-3 justify-content-end'>
            <button type='submit' className='btn btn-success mx-1'>{submitButton}</button>
            <button type='reset' className='btn btn-warning mx-1'>Cancel</button>
          </div>
        </form>
      );
    }
  }

  render() {
    const header = this.props.currentlyEditing ? 'Update Exercise' : 'Add an Exercise';
    const form = this.createForm();
    return (
      <div className='col'>
        <div className='text-center pb-1'>
          <h3>{header}</h3>
        </div>
        {form}
      </div>
    );
  }
}

export default ExerciseForm;
