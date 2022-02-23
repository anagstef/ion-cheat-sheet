/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import './toggle.scss';
import { connect } from 'react-redux';

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.toggleDarkTheme = this.toggleDarkTheme.bind(this);
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.sessionStorage.getItem('darkTheme');
      if (
        window.sessionStorage.getItem('darkTheme')
        && window.sessionStorage.getItem('darkTheme') !== null
      ) {
        this.toggleDarkTheme();
      }
    }
  }

  toggleDarkTheme() {
    const { toggleDarkTheme, darkTheme } = this.props;
    toggleDarkTheme(!darkTheme);
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('darkTheme', !darkTheme);
    }
  }

  render() {
    const { darkTheme } = this.props;
    return (
      <div style={{ fontSize: '12px' }}>
        <input
          className="tgl tgl-light"
          id="toggle"
          type="checkbox"
          onClick={this.toggleDarkTheme}
          checked={!darkTheme}
        />
        <label className="tgl-btn" htmlFor="toggle" />
      </div>
    );
  }
}

export default connect(
  ({ darkTheme }) => ({ darkTheme }),
  dispatch => ({
    toggleDarkTheme: value => dispatch({ type: 'DARK_THEME', data: value }),
  }),
)(Toggle);
