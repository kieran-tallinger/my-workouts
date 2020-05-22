import React from 'react';

function Header(props) {
  return (
    <header className='row py-3'>
      <h1 className="col-md-8 text-center text-sm-center text-md-center text-lg-left">My Personal Workouts</h1>
      <div className='col-md-4 text-center text-md-right'>
        <button className='btn btn-info' onClick={() => props.toExercise()}>View My Exercises</button>
      </div>
    </header>
  );
}

export default Header;
