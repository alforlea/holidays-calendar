import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../../actions/index';

class Day extends Component {
  constructor(props) {
    super(props);
    this.day = props.day;
  }

  clickedButton() {
    this.props.manageHolidays(this.props.dayData, this.day.getTime());
  }

  clickedRightButton(mode) {
    this.props.deletePrevious(this.day.getTime(), mode);
  }

  dayInNormalMode() {
    if (this.props.officialDay == 'vacacion-oficial') {
      return (
        <button
          disabled={true} //Las vacaciones oficiales no se pueden tocar
          className={`botones-dia rounded vacacion-oficial ${this.day.getDate()} ${this.day.getMonth()} ${this.day.getYear()}`}
        >
          {this.day.getDate()}
        </button>
      );
    } else if (this.props.prefixedHolidays[this.day.getDay()] == 1) {
      return (
        <button
          disabled={true} //Los findes no se pueden tocar
          className={`botones-dia rounded finde ${this.day.getDate()} ${this.day.getMonth()} ${this.day.getYear()}`}
        >
          {this.day.getDate()}
        </button>
      );
    } else if (this.props.dayData == 'vacacion-pedida') {
      return (
        <button
          disabled={false} //Las vacaciones pedidas se pueden quitar y poner
          className={`botones-dia rounded vacacion-pedida ${this.day.getDate()} ${this.day.getMonth()} ${this.day.getYear()}`}
          onClick={() => this.clickedButton()}
          onContextMenu={() => this.clickedRightButton(1)}
        >
          {this.day.getDate()}
        </button>
      );
    } else if (this.props.dayData == 'moscoso-pedido') {
      return (
        <button
          disabled={false} //Las vacaciones pedidas se pueden quitar y poner
          className={`botones-dia rounded moscoso ${this.day.getDate()} ${this.day.getMonth()} ${this.day.getYear()}`}
          onClick={() => this.clickedButton()}
          onContextMenu={() => this.clickedRightButton(2)}
        >
          {this.day.getDate()}
        </button>
      );
    } else if (this.props.dayData == 'otro-permiso') {
      return (
        <button
          disabled={false} //Las vacaciones pedidas se pueden quitar y poner
          className={`botones-dia rounded permiso ${this.day.getDate()} ${this.day.getMonth()} ${this.day.getYear()}`}
          onClick={() => this.clickedButton()}
          onContextMenu={() => this.clickedRightButton(3)}
        >
          {this.day.getDate()}
        </button>
      );
    } else {
      return (
        <button
          disabled={false} //Las vacaciones pedidas se pueden quitar y poner
          className={`botones-dia rounded ${this.day.getDate()} ${this.day.getMonth()} ${this.day.getYear()}`}
          onClick={() => this.clickedButton()}
        >
          {this.day.getDate()}
        </button>
      );
    }
  }

  clickedOfficial(action) {
    action == 'add'
      ? this.props.addOfficial(this.day)
      : this.props.deleteOfficial(this.day);
  }

  dayInOfficialMode() {
    if (this.props.officialDay == 'vacacion-oficial') {
      return (
        <button
          disabled={false} //Las vacaciones oficiales se pueden quitar en este modo
          className={'botones-dia rounded vacacion-oficial'}
          onClick={() => this.clickedOfficial('delete')}
          onContextMenu={() => this.clickedOfficial('delete')}
        >
          {this.day.getDate()}
        </button>
      );
    } else {
      return (
        <button
          disabled={false}
          className={'botones-dia rounded'}
          onClick={() => this.clickedOfficial('add')}
        >
          {this.day.getDate()}
        </button>
      );
    }
  }

  render() {
    return this.props.officialMode == true
      ? this.dayInOfficialMode()
      : this.dayInNormalMode();
  }
}

function mapStateToProps(
  { profileData, officialData, officialMode },
  ownProps
) {
  const specify_day = ownProps.day.getTime();

  return {
    dayData: profileData[specify_day],
    prefixedHolidays: profileData.weekHolidays,
    officialDay: officialData[specify_day],
    officialMode
  }; //Sólo le afecta el estado del día que toca, no de todos
}

export default connect(mapStateToProps, actions)(Day);
