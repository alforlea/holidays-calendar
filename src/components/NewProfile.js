import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions/index';
import PreviousLink from './auxiliar/PreviousLink';

class NewProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: 'Nombre del perfil',
      totalHolidays: 24,
      totalMoscosos: 6,
      vacaciones: [1, 0, 0, 0, 0, 0, 1],
      editedTimes: 0
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    //if (this.props.match.params.mode == 'edit' && this.state.editedTimes < 3) {
    this.setState({
      nombre: nextProps.profileData.name,
      totalHolidays: nextProps.profileData.totalHolidays,
      totalMoscosos: nextProps.profileData.totalMoscosos,
      vacaciones: nextProps.profileData.weekHolidays,
      editedTimes: nextProps.editedTimes + 1
    });
    //}
  }

  handleSubmit(event) {
    //event.preventDefault();
    this.props.match.params.mode == 'edit'
      ? this.props.editProfile(
          Number(this.state.totalHolidays),
          Number(this.state.totalMoscosos),
          this.state.vacaciones,
          this.props.profileData
        )
      : this.props.createProfile(
          this.state.nombre,
          Number(this.props.match.params.year),
          Number(this.state.totalHolidays),
          Number(this.state.totalMoscosos),
          this.state.vacaciones
        );
  }

  onChangeName(event) {
    this.setState({ nombre: event.target.value });
  }

  onChangeHolidays(event) {
    this.setState({ totalHolidays: event.target.value });
  }

  onChangeMoscosos(event) {
    this.setState({ totalMoscosos: event.target.value });
  }

  onChangeWeekHolidays(which) {
    let vacaciones = this.state.vacaciones;
    vacaciones[which] == 0 ? (vacaciones[which] = 1) : (vacaciones[which] = 0);
    this.setState({ vacaciones });
  }

  renderForm() {
    const thisYear = new Date().getFullYear();

    return (
      <form className="formulario profiles" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>
            <h4>
              <span className="badge badge-light">Nombre del perfil</span>
            </h4>
            <input
              disabled={this.props.match.params.mode == 'edit' ? true : false}
              type="text"
              className="form-control"
              onChange={this.onChangeName.bind(this)}
              value={this.state.nombre}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            <h4>
              <span className="badge badge-light">Días de vacaciones</span>
            </h4>
            <input
              type="number"
              className="form-control"
              onChange={this.onChangeHolidays.bind(this)}
              value={this.state.totalHolidays}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            <h4>
              <span className="badge badge-light">Días de moscosos</span>
            </h4>
            <input
              type="number"
              className="form-control"
              onChange={this.onChangeMoscosos.bind(this)}
              value={this.state.totalMoscosos}
            />
          </label>
        </div>
        <div>
          <h4>
            <span className="badge badge-light">
              Vacaciones semanales (fines de semana por defecto)
            </span>
          </h4>
        </div>
        <h5>
          <span className="badge badge-light">
            <div className="form-check form-check-inline">
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={this.state.vacaciones[1]}
                  onChange={() => this.onChangeWeekHolidays(1)}
                />{' '}
                Lunes{' '}
              </label>
            </div>
            <div className="form-check form-check-inline">
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={this.state.vacaciones[2]}
                  onChange={() => this.onChangeWeekHolidays(2)}
                />{' '}
                Martes{' '}
              </label>
            </div>
            <div className="form-check form-check-inline">
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={this.state.vacaciones[3]}
                  onChange={() => this.onChangeWeekHolidays(3)}
                />{' '}
                Miércoles{' '}
              </label>
            </div>
            <div className="form-check form-check-inline">
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={this.state.vacaciones[4]}
                  onChange={() => this.onChangeWeekHolidays(4)}
                />{' '}
                Jueves{' '}
              </label>
            </div>
            <div className="form-check form-check-inline">
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={this.state.vacaciones[5]}
                  onChange={() => this.onChangeWeekHolidays(5)}
                />{' '}
                Viernes{' '}
              </label>
            </div>
            <div className="form-check form-check-inline">
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={this.state.vacaciones[6]}
                  onChange={() => this.onChangeWeekHolidays(6)}
                />{' '}
                Sábado{' '}
              </label>
            </div>
            <div className="form-check form-check-inline">
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={this.state.vacaciones[0]}
                  onChange={() => this.onChangeWeekHolidays(0)}
                />{' '}
                Domingo{' '}
              </label>
            </div>
          </span>
        </h5>
        <Link
          to={`/profileList/${this.props.match.params.year}`}
          style={{ textDecoration: 'none' }}
          onClick={this.handleSubmit}
        >
          <div className="crear_perfil">
            <input
              type="submit"
              value={`${
                this.props.match.params.mode == 'edit'
                  ? 'Editar perfil de usuario'
                  : 'Crear perfil de ususario'
              }`}
              className="btn btn-lg btn-dark botones-alto"
            />
          </div>
        </Link>
      </form>
    );
  }

  render() {
    return (
      <div>
        <PreviousLink
          goto={`/profileList/${this.props.match.params.year}`}
          text={`${
            this.props.match.params.mode == 'edit'
              ? `Editar perfil del año ${this.props.match.params.year}`
              : `Crear nuevo perfil del año ${this.props.match.params.year}`
          }`}
        />
        {this.renderForm()}
      </div>
    );
  }
}

function mapStateToProps({ profileData }) {
  return { profileData };
}

export default connect(mapStateToProps, actions)(NewProfile);
