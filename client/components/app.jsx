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
      selectedRoutineExercises: null,
      selectedRoutineId: null,
      currentlyEditing: null
    };
    this.getRoutines = this.getRoutines.bind(this);
    this.submitExercise = this.submitExercise.bind(this);
    this.submitRoutine = this.submitRoutine.bind(this);
    this.submitRoutineExercise = this.submitRoutineExercise.bind(this);
    this.deleteExercise = this.deleteExercise.bind(this);
    this.deleteRoutineExercise = this.deleteRoutineExercise.bind(this);
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
      fetch(`/api/exercises/${this.state.currentlyEditing.exerciseId}`, fetchParams)
        .then(res => res.json())
        .then(data => {
          this.getExercises();
          return data;
        })
        .catch(error => {
          console.error(error);
        });
      this.switchFormMode();
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
      fetch(`/api/routines/${this.state.currentlyEditing.routineId}`, fetchParams)
        .then(res => res.json())
        .then(data => {
          this.getRoutines();
          return data;
        })
        .catch(error => {
          console.error(error);
        });
      this.switchFormMode();
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
      .then(data => {
        this.setState({
          selectedRoutineExercises: this.state.selectedRoutineExercises.concat(data)
        });
      })
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

  deleteRoutineExercise(id) {
    fetch(`/api/routineExercises/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(data => { return data; })
      .catch(error => {
        console.error(error);
      });
    const updatedExercises = this.state.selectedRoutineExercises.filter(value => value.routineExerciseId !== id);
    this.setState({
      selectedRoutineExercises: updatedExercises
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
          selectedRoutineExercises: data,
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
      selectedRoutineExercises: null,
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
        const routineToUpdate = this.state.routines.filter(value => value.routineId === id);
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
        const exerciseToUpdate = this.state.exercises.filter(value => value.exerciseId === id);
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
            refresh={this.getRoutines}
            currentlyEditing={this.state.currentlyEditing}/>
        </div>
      );
    } else if (this.state.view === 'exercises') {
      if (this.state.selectedRoutineExercises) {
        return (
          <div className='row'>
            <ExerciseTable
              exercises={this.state.selectedRoutineExercises}
              delete={this.deleteRoutineExercise}
              update={this.switchFormMode}
              selectedRoutine={true}
              back={this.switchView} />
            <ExerciseForm
              onSubmit={this.submitRoutineExercise}
              exercises={this.state.exercises}
              refresh={this.selectRoutine}
              selectedRoutineId={this.state.selectedRoutineId}
              currentlyEditing={this.state.currentlyEditing} />
          </div>
        );
      } else if (!this.state.selectedRoutineExercises) {
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
