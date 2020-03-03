import React from 'react';

function Header(props) {
  const average = props.average ? props.average : '--';
  return (
    <header className='row py-3'>
      <h1 className="col-8">Student Grade Table</h1>
      <h2
        className='col-4 text-right'>
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
