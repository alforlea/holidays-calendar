import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../../actions/index';

class ProfileInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      officialMode: false,
      frase: 'Cambiar a modo de edición de festivos oficiales'
    };
  }
  componentWillUnmount() {
    if (this.state.officialMode == true) {
      this.props.setOfficialMode(false);
      this.setState({
        officialMode: false,
        frase: 'Cambiar a modo de edición de festivos oficiales'
      });
    }
  }

  componentDidUpdate() {
    this.props.saveUserData(this.props.profileData);
  }

  officialMode() {
    //Ojo! al entrar, el estado está al revés de lo que queremos
    if (this.state.officialMode == false) {
      this.props.setOfficialMode(true);
      this.setState({
        officialMode: true,
        frase: 'Cambiar a modo normal (elegir vacaciones del usuario)'
      });
    } else {
      this.props.setOfficialMode(false);
      this.setState({
        officialMode: false,
        frase: 'Cambiar a modo de edición de festivos oficiales'
      });
    }
  }

  computeUsedHolidaysAndMoscosos() {
    //Cogerá todos los índices de vacaciones, moscosos y otros permisos
    //que no coincidan con week ni official Holidays
    let holidayDays = this.getKeysByValue(
      this.props.profileData,
      'vacacion-pedida'
    );
    let moscosoDays = this.getKeysByValue(
      this.props.profileData,
      'moscoso-pedido'
    );
    let otherDays = this.getKeysByValue(this.props.profileData, 'otro-permiso');
    let officialDays = this.getKeysByValue(
      this.props.officialData,
      'vacacion-oficial'
    );
    let weekendDays = this.weekHolidays(
      this.props.profileData.weekHolidays,
      this.props.profileData.year
    );
    _.pullAll(holidayDays, String(weekendDays));
    _.pullAll(holidayDays, officialDays);
    _.pullAll(moscosoDays, String(weekendDays));
    _.pullAll(moscosoDays, officialDays);
    _.pullAll(otherDays, String(weekendDays));
    _.pullAll(otherDays, officialDays);

    return [holidayDays.length, moscosoDays.length, otherDays.length];
  }

  getKeysByValue(object, value) {
    return Object.keys(object).filter(key => object[key] == value);
  }

  weekHolidays(weekHolidaysVector, year) {
    //Vector de days.getTime() que son vacaciones tipo finde
    let date = new Date(year, 0, 1);
    let dayCode = [];
    let days = [];

    dayCode = weekHolidaysVector
      .map((isWeekend, index) => {
        return isWeekend == 1 ? index : null;
      })
      .filter(n => n != null);

    //while (date.getFullYear() == year || date.getMonth() < 3) {
    while (date.getFullYear() == year && date.getMonth() < 1) {
      if (dayCode.indexOf(date.getDay()) != -1) {
        days.push(new Date(date).getTime());
      }
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  render() {
    let computedUsedDays = this.computeUsedHolidaysAndMoscosos();
    return (
      <div className="d-flex justify-content-between" id="info-perfil">
        <ul className="badge badge-light info-perfil ">
          <li>
            <h6>
              <span style={{ backgroundColor: 'springgreen' }} />
              Ha usado {computedUsedDays[0]} días de sus{' '}
              {this.props.profileData.totalHolidays} vacaciones.
            </h6>
          </li>
          <li>
            <h6>
              <span style={{ backgroundColor: 'yellow' }} />
              Ha usado {computedUsedDays[1]} días de sus{' '}
              {this.props.profileData.totalMoscosos} moscosos.
            </h6>
          </li>
          <li>
            <h6>
              <span style={{ backgroundColor: 'pink' }} />
              Ha pedido {computedUsedDays[2]} días adicionales.
            </h6>
          </li>
        </ul>
        <div className="form-check form-check-inline">
          <label className="form-check-label badge badge-light">
            <h6>
              <input
                className="form-check-input"
                type="checkbox"
                checked={this.state.officialMode}
                onChange={() => this.officialMode()}
              />
              {this.state.frase}
            </h6>
          </label>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ profileData, officialData }) {
  return { profileData, officialData };
}

export default connect(mapStateToProps, actions)(ProfileInfo);
