import React from 'react';
import Header from './header';
import ExerciseTable from './exercise-table';
import ExerciseForm from './exercise-form';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
      routines: [],
      currentlyEditing: null
    };
    this.submitExercise = this.submitExercise.bind(this);
    this.submitRoutine = this.submitRoutine.bind(this);
    this.deleteExercise = this.deleteExercise.bind(this);
    this.deleteRoutine = this.deleteRoutine.bind(this);
    this.switchFormMode = this.switchFormMode.bind(this);

  }

  componentDidMount() {
    this.getExercises();
    this.getRoutines();
  }

  getExercises() {
    fetch('/api/exercises')
      .then(res => res.json())
      .then(data => {
        this.setState({
          exercises: data
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  getRoutines() {
    fetch('/api/routines')
      .then(res => res.json())
      .then(data => {
        this.setState({
          routines: data
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  submitExercise(newExercise) {
    if (this.state.currentlyEditing) {
      const fetchParams = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newExercise)
      };
      fetch(`/api/exercises/${this.state.currentlyEditing.id}`, fetchParams)
        .then(res => res.json())
        .then(data => { return data; })
        .catch(error => {
          console.error(error);
        });
      this.switchFormMode();
      this.getExercises();
    } else if (!this.state.currentlyEditing) {
      const fetchParams = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newExercise)
      };
      fetch('/api/exercises', fetchParams)
        .then(res => res.json())
        .then(data => {
          this.setState({
            exercises: this.state.exercises.concat(data)
          });
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  submitRoutine(newRoutine) {
    if (this.state.currentlyEditing) {
      const fetchParams = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRoutine)
      };
      fetch(`/api/routines/${this.state.currentlyEditing.id}`, fetchParams)
        .then(res => res.json())
        .then(data => { return data; })
        .catch(error => {
          console.error(error);
        });
      this.switchFormMode();
      this.getRoutines();
    } else if (!this.state.currentlyEditing) {
      const fetchParams = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRoutine)
      };
      fetch('/api/routines', fetchParams)
        .then(res => res.json())
        .then(data => {
          this.setState({
            routines: this.state.routines.concat(data)
          });
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  deleteExercise(id) {
    fetch(`/api/exercises/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(data => { return data; })
      .catch(error => {
        console.error(error);
      });
    const updatedExercises = this.state.exercises.filter(value => value.id !== id);
    this.setState({
      exercises: updatedExercises
    });
  }

  deleteRoutine(id) {
    fetch(`/api/routines/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(data => { return data; })
      .catch(error => {
        console.error(error);
      });
    const updatedRoutines = this.state.routines.filter(value => value.id !== id);
    this.setState({
      routines: updatedRoutines
    });
  }

  switchFormMode(id) {
    if (!this.state.currentlyEditing) {
      const exerciseToUpdate = this.state.exercises.filter(value => value.id === id);
      this.setState({
        currentlyEditing: exerciseToUpdate[0]
      });
    } else if (this.state.currentlyEditing) {
      this.setState({
        currentlyEditing: null
      });
    }
  }

  render() {
    return (
      <div className ="container">
        <Header/>
        <div className='row'>
          <ExerciseTable exercises={this.state.exercises} delete={this.deleteExercise} update={this.switchFormMode}/>
          <ExerciseForm onSubmit={this.submitExercise} currentlyEditing={this.state.currentlyEditing}/>
        </div>
      </div>
    );
  }
}

export default App;
