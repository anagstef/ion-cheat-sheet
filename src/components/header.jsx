import React from 'react';
import { connect } from 'react-redux';
import './header.css';
import IonicLogo from '../images/ionic-icon.png';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.toggleDarkTheme = this.toggleDarkTheme.bind(this);
  }

  toggleDarkTheme() {
    const { toggleDarkTheme, darkTheme } = this.props;
    toggleDarkTheme(!darkTheme);
  }

  render() {
    const { siteTitle, siteSubtitle } = this.props;
    return (
      <header>
        <div className="header-container">
          <div className="header-title-logo">
            <img src={IonicLogo} className="ionic-logo" alt="ionic logo" />
            <div className="header-title-text">
              <h1>{siteTitle}</h1>
              <h5>{siteSubtitle}</h5>
            </div>
          </div>
          <button type="button" onClick={this.toggleDarkTheme}>?</button>
        </div>
      </header>
    );
  }
}

export default connect(
  ({ darkTheme }) => ({ darkTheme }),
  dispatch => ({ toggleDarkTheme: value => dispatch({ type: 'DARK_THEME', data: value }) }),
)(Header);
