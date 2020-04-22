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

  render() {
    return (
      <div>

      </div>
    );
  }
}

export default RoutineForm;
