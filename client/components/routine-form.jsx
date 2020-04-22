import React, { Component } from 'react';

class RoutineForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      difficulty: ''
    };
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
          difficulty: ''
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
      difficulty: ''
    });
  }

  render() {
    return (
      <div>

      </div>
    );
  }
}

export default RoutineForm;
