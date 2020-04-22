import React from 'react';

function Header(props) {
  const complete = props.complete ? props.complete : '--';
  return (
    <header className='row py-3'>
      <h1 className="col-md-8 text-center text-sm-center text-md-center text-lg-left">My Workouts</h1>
      <h2
        className='col-md-4 text-center text-sm-center text-md-center text-lg-right'>
          Routine Completed
        <span className="px-2"></span>
        <span className="badge badge-secondary px-4">
          {complete}
        </span>
      </h2>
    </header>
  );
}

export default Header;
