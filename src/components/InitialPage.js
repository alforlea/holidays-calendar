import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions/index';

class InitialPage extends Component {
  constructor(props) {
    super(props);
  }

  handleClick(year) {
    //Cargamos los perfiles y las vacaciones oficiales del año elegido
    this.props.getProfilesByYear(year);
    this.props.loadOfficialDays(year);
  }

  dispayButtons() {
    const thisYear = new Date().getFullYear();
    const years = [thisYear - 1, thisYear, thisYear + 1];
    return (
      <div>
        <div className="title">Holidays Calendar</div>
        <div className="d-flex justify-content-around locate">
          {years.map(year => {
            return (
              <div className="d-inline-flex" key={year}>
                <Link
                  to={`/profileList/${year}`}
                  style={{ textDecoration: 'none' }}
                  onClick={() => this.handleClick(year)}
                >
                  <button
                    type="button"
                    className="btn btn-light btn-lg link-to-profiles"
                  >
                    Cargar perfiles<br />
                    <span style={{ fontWeight: 'bold' }}>Año {year}</span>
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  render() {
    return this.dispayButtons();
  }
}

export default connect(null, actions)(InitialPage);
