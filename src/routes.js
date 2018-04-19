import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import InitialPage from './components/InitialPage';
import Calendar from './components/Calendar';
import NewProfile from './components/NewProfile';
import ProfileList from './components/ProfileList';

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={InitialPage} />
          <Route exact path="/profileList/:year" component={ProfileList} />
          <Route
            exact
            path="/editProfile/:year/:mode/:who"
            component={NewProfile}
          />
          <Route exact path="/newProfile/:year/:mode" component={NewProfile} />
          <Route
            exact
            path="/profileCalendar/:year/:who"
            component={Calendar}
          />
        </Switch>
      </Router>
    );
  }
}

{
  /* <Route exact path="/personalCalendar/:who" component={Calendar} />
<Route exact path="/newProfile" component={NewProfile} />
<Route exact path="/editProfile/:who" component={NewProfile} /> */
}
