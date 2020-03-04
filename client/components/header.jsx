import React from 'react';

function Header(props) {
  const average = props.average ? props.average : '--';
  return (
    <header className='row py-3'>
      <h1 className="col-md-8 text-center text-sm-center text-md-center text-lg-left">Student Grade Table</h1>
      <h2
        className='col-md-4 text-center text-sm-center text-md-center text-lg-right'>
          Average Grade
        <span className="px-2"></span>
        <span className="badge badge-secondary px-4">
          {average}
        </span>
      </h2>
    </header>
  );
}

export default Header;
