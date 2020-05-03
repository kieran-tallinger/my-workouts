import React, { Component } from 'react';

class ExerciseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: ''
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
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

  handleSubmit(e) {
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

  handleReset() {
    this.setState({
      name: '',
      description: ''
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
      </div>
    );
  }
}

export default ExerciseForm;
