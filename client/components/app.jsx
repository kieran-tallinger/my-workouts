import React from 'react';
import Header from './header';
import GradeTable from './grade-table';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: []
    };
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
      .then(this.getGrades())
      .catch(error => {
        console.error(error);
      });
  }

  getAverageGrade() {
    let total = 0;
    this.state.grades.map(student => {
      total += student.grade;
    });
    return (total / this.state.grades.length).toFixed(1);
  }

  render() {
    return (
      <div>
        <Header average={this.getAverageGrade()}/>
        <GradeTable grades={this.state.grades} />
      </div>
    );
  }
}

export default App;
