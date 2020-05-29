import React, { Component } from 'react';

class RoutineForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      difficulty: 'Medium'
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleDifficultyChange = this.handleDifficultyChange.bind(this);
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
          difficulty: 'Medium'
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

  handleSubmit(e) {
    e.preventDefault();
    const newRoutine = {
      name: this.state.name,
      description: this.state.description,
      difficulty: this.state.difficulty
    };
    this.props.onSubmit(newRoutine);
    this.setState({
      name: '',
      description: '',
      difficulty: ''
    });
  }

  handleReset() {
    this.setState({
      name: '',
      description: '',
      difficulty: 'Medium'
    });
    this.props.cancel();
  }

  render() {
    const header = this.props.currentlyEditing ? 'Update Routine' : 'Add a Routine';
    const submitButton = this.props.currentlyEditing ? 'Update' : 'Add';
    return (
      <div className='col'>
        <div className='text-center pb-1'>
          <h3>{header}</h3>
        </div>
        <form onSubmit={this.handleSubmit} onReset={this.handleReset}>
          <div className='input-group form-row my-2'>
            <span className='input-group-addon'><i className='col-1 fas fa-dumbbell fa-lg py-2'></i></span>
            <input
              required
              autoFocus
              type='text'
              placeholder='Name'
              className='form-control col ml-2'
              value={this.state.name}
              onChange={this.handleNameChange}/>
          </div>
          <div className='input-group form-row my-2'>
            <span className='input-group-addon'><i className='col-1 fas fa-pencil-alt fa-lg py-2 mr-1'></i></span>
            <textarea
              required
              placeholder='A short description of the routines focus'
              className='form-control col ml-2'
              value={this.state.description}
              onChange={this.handleDescriptionChange} />
          </div>
          <div className='input-group form-row my-2'>
            <span className='input-group-addon'><i className='col-1 fas fa-exclamation-circle fa-lg py-2 mr-1'></i></span>
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
