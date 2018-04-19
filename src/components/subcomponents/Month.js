import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Day from './Day';

export default class Month extends Component {
  constructor(props) {
    super(props);
    this.month = props.month;
    this.year = props.year;
  }

  getWeeksInMonth(month, year) {
    let date = new Date(year, month, 1);
    let index = 0;
    let weeks = {};
    while (date.getMonth() === month) {
      if (weeks[index] === undefined) {
        weeks[index] = [];
      }
      weeks[index].push(new Date(date));
      date.setDate(date.getDate() + 1);
      if (date.getDay() === 1) {
        index = index + 1;
      }
    }
    return weeks;
  }

  renderWeeks(month, year) {
    let weeksInMonth = this.getWeeksInMonth(month, year);
    let lastWeek = Object.keys(weeksInMonth).length - 1;
    lastWeek = weeksInMonth[lastWeek];
    return _.map(weeksInMonth, week => {
      if (week === lastWeek) {
        return (
          <div className="d-flex justify-content-start" key={week}>
            {this.formattingWeek(week)}
          </div>
        );
      } else {
        return (
          <div className="d-flex justify-content-end" key={week}>
            {this.formattingWeek(week)}
          </div>
        );
      }
    });
  }

  formattingWeek(week) {
    return week.map(day => {
      return <Day day={day} key={day} />;
    });
  }

  render() {
    const months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ];

    return (
      <div className="month-wrapper">
        <div className="month-label font-weight-bold">
          {months[this.month]} de {this.year}
        </div>
        <div className="month-box">
          <div className="days-label d-flex justify-content-between font-weight-bold">
            <div className="p-2">Lun</div>
            <div className="p-2">Mar</div>
            <div className="p-2">Mie</div>
            <div className="p-2">Jue</div>
            <div className="p-2">Vie</div>
            <div className="p-2">Sab</div>
            <div className="p-2">Dom</div>
          </div>
          {this.renderWeeks(this.month, this.year)}
        </div>
      </div>
    );
  }
}
