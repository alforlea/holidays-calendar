import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { Confirm } from 'react-confirm-bootstrap';
import { Link } from 'react-router-dom';
import * as actions from '../actions/index';
import PreviousLink from './auxiliar/PreviousLink';

class ProfileList extends Component {
  constructor(props) {
    super(props);
  }

  deleteProfileAndLink(profile_name) {
    this.props.deleteProfile(profile_name, this.props.match.params.year);
  }

  linksGenerator() {
    const thisYear = new Date().getFullYear();
    return (
      <div>
        {this.props.profiles.map(profile => {
          return (
            <div className="d-flex align-items-start profiles" key={profile}>
              <Link
                className="d-inline-flex"
                style={{ textDecoration: 'none' }}
                exact
                to={`/profileCalendar/${
                  this.props.match.params.year
                }/${profile}`}
                onClick={() => {
                  this.props.loadUserData(
                    profile,
                    this.props.match.params.year
                  );
                }}
              >
                <button
                  className="btn btn-lg btn-block btn-light botones-alto botones-ancho"
                  type="button"
                >
                  <span style={{ fontWeight: 'bold' }}>{profile}</span>
                </button>
              </Link>
              <Link
                className="d-inline-flex margen"
                style={{ textDecoration: 'none' }}
                exact
                to={`/editProfile/${
                  this.props.match.params.year
                }/edit/${profile}`}
                onClick={() => {
                  this.props.loadUserData(
                    profile,
                    this.props.match.params.year
                  );
                }}
              >
                <button
                  type="button"
                  className="btn btn-lg btn-secondary botones-alto"
                >
                  <i className="fas fa-edit" />
                </button>
              </Link>
              <button
                type="button"
                style={{ textDecoration: 'none' }}
                className="btn btn-lg btn-secondary botones-alto d-inline-flex margen"
                onClick={() => this.deleteProfileAndLink(profile)}
              >
                <i className="fas fa-trash-alt" />
              </button>
            </div>
          );
        })}
        {this.props.match.params.year < thisYear ? null : (
          <div className="d-flex align-items-start profiles">
            <Link
              style={{ textDecoration: 'none' }}
              exact
              to={`/newProfile/${this.props.match.params.year}/:new`}
            >
              <button
                type="button"
                className="btn btn-lg btn-dark botones-alto"
              >
                <i className="fas fa-plus" /> Añadir nuevo perfil
              </button>
            </Link>
          </div>
        )}
      </div>
    );
  }

  render() {
    return (
      <div>
        <PreviousLink
          goto="/"
          text={`Lista de perfiles año ${this.props.match.params.year}`}
        />
        {this.linksGenerator()}
      </div>
    );
  }
}

function mapStateToProps({ profiles }) {
  return { profiles };
}
export default connect(mapStateToProps, actions)(ProfileList);
