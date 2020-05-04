import React from 'react';
import Header from './header';
import ExerciseTable from './exercise-table';
import ExerciseForm from './exercise-form';
import RoutineTable from './routine-table';
import RoutineForm from './routine-form';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'routines',
      exercises: [],
      routines: [],
      selectedRoutine: null,
      selectedRoutineId: null,
      currentlyEditing: null
    };
    this.submitExercise = this.submitExercise.bind(this);
    this.submitRoutine = this.submitRoutine.bind(this);
    this.deleteExercise = this.deleteExercise.bind(this);
    this.deleteRoutine = this.deleteRoutine.bind(this);
    this.selectRoutine = this.selectRoutine.bind(this);
    this.switchFormMode = this.switchFormMode.bind(this);
    this.viewAllExercises = this.viewAllExercises.bind(this);
    this.switchView = this.switchView.bind(this);
    this.createView = this.createView.bind(this);
  }

  componentDidMount() {
    this.getRoutines();
    this.getExercises();
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

  submitRoutineExercise(newRoutineExercise) {
    const fetchParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newRoutineExercise)
    };
    fetch('/api/routineExercises', fetchParams)
      .then(res => res.json())
      .then(data => { return data; })
      .catch(error => {
        console.error(error);
      });
  }

  deleteExercise(id) {
    fetch(`/api/exercises/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(data => { return data; })
      .catch(error => {
        console.error(error);
      });
    const updatedExercises = this.state.exercises.filter(value => value.exerciseId !== id);
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
    const updatedRoutines = this.state.routines.filter(value => value.routineId !== id);
    this.setState({
      routines: updatedRoutines
    });
  }

  selectRoutine(id) {
    fetch(`/api/routines/${id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          selectedRoutine: data,
          selectedRoutineId: id
        });
      })
      .catch(error => {
        console.error(error);
      });
    this.switchView('exercises');
  }

  viewAllExercises() {
    this.setState({
      selectedRoutine: null,
      view: 'exercises'
    });
  }

  switchView(newView) {
    this.setState({
      view: newView
    });
  }

  switchFormMode(id) {
    if (this.state.view === 'routines') {
      if (!this.state.currentlyEditing) {
        const routineToUpdate = this.state.routines.filter(value => value.id === id);
        this.setState({
          currentlyEditing: routineToUpdate[0]
        });
      } else if (this.state.currentlyEditing) {
        this.setState({
          currentlyEditing: null
        });
      }
    } else if (this.state.view === 'exercises') {
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

  }

  createView() {
    if (this.state.view === 'routines') {
      return (
        <div className='row'>
          <RoutineTable
            routines={this.state.routines}
            select={this.selectRoutine}
            delete={this.deleteRoutine}
            update={this.switchFormMode}/>
          <RoutineForm
            exercises={this.state.exercises}
            onSubmit={this.submitRoutine}
            currentlyEditing={this.state.currentlyEditing}/>
        </div>
      );
    } else if (this.state.view === 'exercises') {
      if (this.state.selectedRoutine) {
        return (
          <div className='row'>
            <ExerciseTable
              exercises={this.state.selectedRoutine}
              delete={this.deleteExercise}
              update={this.switchFormMode}
              selectedRoutine={true}
              back={this.switchView} />
            <ExerciseForm
              onSubmit={this.submitRoutineExercise}
              exercises={this.state.exercises}
              selectedRoutineId={this.state.selectedRoutineId}
              currentlyEditing={this.state.currentlyEditing} />
          </div>
        );
      } else if (!this.state.selectedRoutine) {
        return (
          <div className='row'>
            <ExerciseTable
              exercises={this.state.exercises}
              delete={this.deleteExercise}
              update={this.switchFormMode}
              selectedRoutine={false}
              back={this.switchView}/>
            <ExerciseForm
              onSubmit={this.submitExercise}
              currentlyEditing={this.state.currentlyEditing}/>
          </div>
        );
      }
    }
  }

  render() {
    const main = this.createView();
    return (
      <div className ="container">
        <Header toExercise={this.viewAllExercises}/>
        {main}
      </div>
    );
  }
}

export default App;
