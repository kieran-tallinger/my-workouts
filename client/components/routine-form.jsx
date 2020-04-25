import React, { Component } from 'react';

class RoutineForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      difficulty: 'Medium',
      exercises: []
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleDifficultyChange = this.handleDifficultyChange.bind(this);
    this.handleExercisesChange = this.handleExercisesChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentlyEditing !== prevProps.currentlyEditing) {
      if (this.props.currentlyEditing) {
        this.setState({
          name: this.props.currentlyEditing.name,
          description: this.props.currentlyEditing.description,
          difficulty: this.props.currentlyEditing.difficulty
        });
      } else if (!this.props.currentlyEditing) {
        this.setState({
          name: '',
          description: '',
          difficulty: 'Medium',
          exercises: []
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

  handleDifficultyChange(e) {
    this.setState({
      difficulty: e.target.value
    });
  }

  handleExercisesChange(e) {
    this.setState({
      exercises: this.state.exercises.concat(e.target.value)
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const newRoutine = {
      name: this.state.name,
      description: this.state.description,
      difficulty: this.state.difficulty,
      exercises: this.state.exercises
    };
    this.props.onSubmit(newRoutine);
    this.setState({
      name: '',
      description: '',
      difficulty: '',
      exercises: []
    });
  }

  handleReset() {
    this.setState({
      name: '',
      description: '',
      difficulty: 'Medium',
      exercises: []
    });
  }

  createExercisesList() {
    return (
      <select
        required
        multiple={true}
        size='3'
        className='form-control col ml-2'
        value={this.state.exercises}
        onChange={this.handleExercisesChange}>
        {
          this.props.exercises.map(exercise => {
            return (
              <option key={exercise.id} value = {exercise.id}>
                {exercise.name}
              </option>
            );
          })
        }
      </select>
    );
  }

  render() {
    const header = this.props.currentlyEditing ? 'Update Routine' : 'Add a Routine';
    const submitButton = this.props.currentlyEditing ? 'Update' : 'Add';
    const exercisesList = this.createExercisesList();
    return (
      <div className='col'>
        <div className='text-center pb-1'>
          <h3>{header}</h3>
        </div>
        <form onSubmit={this.handleSubmit} onReset={this.handleReset}>
          <div className='form-row my-2'>
            <i className='col-1 fas fa-dumbbell fa-lg py-2 mx-2'></i>
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
            <i className='col-1 fas fa-pencil-alt fa-lg py-2 mx-2'></i>
            <textarea
              required
              placeholder='A short description of the routines focus'
              className='form-control col ml-2'
              value={this.state.description}
              onChange={this.handleDescriptionChange} />
          </div>
          <div className='form-row my-2'>
            <i className='col-1 fas fa-exclamation-circle fa-lg py-2 mx-2'></i>
            <select
              required
              className='form-control col ml-2'
              value={this.state.difficulty}
              onChange={this.handleDifficultyChange}>
              <option value='Warm Up'>Warm Up</option>
              <option value='Easy'>Easy</option>
              <option value='Medium'>Medium</option>
              <option value='Hard'>Hard</option>
              <option value='UBER'>UBER</option>
            </select>
          </div>
          <div className='form-row my-2'>
            <i className='col-1 fas fa-running fa-lg py-2 mx-2'></i>
            {exercisesList}
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

export default RoutineForm;
