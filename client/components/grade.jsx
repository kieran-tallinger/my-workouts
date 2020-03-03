/* eslint-disable */
import React, { Component } from 'react';

class Grade extends Component {
  render(props) {
    return (
      <tr>
        <td>{props.name}</td>
        <td>{props.course}</td>
        <td>{props.grade}</td>
      </tr>
    );
  }
}
