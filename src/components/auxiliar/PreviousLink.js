import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PreviousLink extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className="d-flex justify-content-between align-items-center profile-title"
        id="profile-title"
      >
        <div className="d-inline-flex">{this.props.text}</div>
        <Link
          className="d-inline-flex"
          style={{ textDecoration: 'none' }}
          exact
          to={this.props.goto}
        >
          <button
            type="button"
            className="btn btn-lg btn-secondary botones-alto"
          >
            Volver <i className="fas fa-arrow-circle-left" />
          </button>
        </Link>
      </div>
    );
  }
}
