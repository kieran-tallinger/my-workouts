import React from 'react';
import Header from './header';
import GradeTable from './grade-table';
import GradeForm from './grade-form';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: [],
      currentlyEditing: null
    };
    this.addGrade = this.addGrade.bind(this);
    this.deleteGrade = this.deleteGrade.bind(this);
  }

  componentDidMount() {
    this.getGrades();
  }

  getGrades() {
    fetch('/api/grades')
      .then(res => res.json())
      .then(data => {
        this.setState({
          grades: data
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  addGrade(newGrade) {
    const fetchParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newGrade)
    };
    fetch('/api/grades', fetchParams)
      .then(res => res.json())
      .then(data => {
        this.setState({
          grades: this.state.grades.concat(data)
        });
      })
      .catch(error => {
        console.error(error);
      });
    this.getGrades();
  }

  deleteGrade(id) {
    fetch(`/api/grades/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(data => { return data; })
      .catch(error => {
        console.error(error);
      });
    const updatedGrades = this.state.grades.filter(value => value.id !== id);
    this.setState({
      grades: updatedGrades
    });
  }

  getAverageGrade() {
    let total = 0;
    this.state.grades.map(student => {
      total += student.grade;
    });
    if (total === 0) {
      return '';
    } else {
      return (total / this.state.grades.length).toFixed(1);
    }

  }

  render() {
    return (
      <div className ="container">
        <Header average={this.getAverageGrade()}/>
        <div className='row'>
          <GradeTable grades={this.state.grades} delete={this.deleteGrade}/>
          <GradeForm onSubmit={this.addGrade} currentlyEditing={this.state.currentlyEditing}/>
        </div>
      </div>
    );
  }
}

export default App;
