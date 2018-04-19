import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../../actions/index';

class OfficialDay extends Component {
  constructor(props) {
    super(props);
    this.day = props.day;
  }

  clickedButton() {
    if (this.props.officialHoliday == 'vacacion-oficial') {
      this.props.deleteOfficial(this.day);
    } else {
      this.props.addOfficial(this.day);
    }
  }

  clickedRightButton() {
    this.props.deleteOfficial(this.day);
  }

  render() {
    if (this.props.officialHoliday == 'vacacion-oficial') {
      return (
        <button
          disabled={false} //Las vacaciones oficiales no se pueden tocar
          className={`botones-dia rounded vacacion-oficial ${this.day.getDate()} ${this.day.getMonth()} ${this.day.getYear()}`}
          onClick={() => this.clickedButton()}
          onContextMenu={() => this.clickedRightButton()}
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
}

function mapStateToProps({ officialHolidays }, ownProps) {
  const specify_day = ownProps.day.getTime();
  //return { holidays }; //Sólo le afecta el estado del día que toca, no de todos

  return { officialHoliday: officialHolidays[specify_day] }; //Sólo le afecta el estado del día que toca, no de todos
}

export default connect(mapStateToProps, actions)(OfficialDay);

//AÑADIR ACCIONES Y REDUCERS PARA ESTA CLASE
