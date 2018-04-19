import React, { Component } from 'react';
import _ from 'lodash';
import Month from './subcomponents/Month';
import ProfileInfo from './subcomponents/ProfileInfo';
import PreviousLink from './auxiliar/PreviousLink';

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = { scrollHeight: '100%' };
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentWillMount() {
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this));
  }

  componentDidMount() {
    this.updateDimensions();
  }

  updateDimensions() {
    const totalHeight = document.getElementById('root').offsetHeight;
    const titleHeight = document.getElementById('profile-title').offsetHeight;
    const infoHeight = document.getElementById('info-perfil').offsetHeight;
    let remainingHeight =
      100 * (totalHeight - titleHeight - infoHeight - 20) / totalHeight; //El 20 es por darle algo de holgura
    remainingHeight = String(remainingHeight) + '%';
    this.setState({ scrollHeight: remainingHeight });
  }

  render() {
    return (
      <div>
        <PreviousLink
          goto={`/profileList/${this.props.match.params.year}`}
          text={`Calendario personal de ${this.props.match.params.who} para ${
            this.props.match.params.year
          }`}
        />
        <ProfileInfo />
        <div id="scroll-helper">
          <div
            style={{ height: this.state.scrollHeight }}
            className="d-flex flex-wrap scroll-bar"
          >
            <Month month={0} year={this.props.match.params.year} />
            <Month month={1} year={this.props.match.params.year} />
            <Month month={2} year={this.props.match.params.year} />
            <Month month={3} year={this.props.match.params.year} />
            <Month month={4} year={this.props.match.params.year} />
            <Month month={5} year={this.props.match.params.year} />
            <Month month={6} year={this.props.match.params.year} />
            <Month month={7} year={this.props.match.params.year} />
            <Month month={8} year={this.props.match.params.year} />
            <Month month={9} year={this.props.match.params.year} />
            <Month month={10} year={this.props.match.params.year} />
            <Month month={11} year={this.props.match.params.year} />
            <Month month={0} year={Number(this.props.match.params.year) + 1} />
            <Month month={1} year={Number(this.props.match.params.year) + 1} />
            <Month month={2} year={Number(this.props.match.params.year) + 1} />
          </div>
        </div>
      </div>
    );
  }
}
