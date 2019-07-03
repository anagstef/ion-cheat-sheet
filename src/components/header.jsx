import PropTypes from 'prop-types';
import React from 'react';
import './header.css';
import IonicLogo from '../images/ionic-icon.png';

const Header = ({ siteTitle, siteSubtitle }) => (
  <header>
    <div className="header-container">
      <img src={IonicLogo} className="ionic-logo" alt="ionic logo" />
      <div className="header-title-text">
        <h1>{siteTitle}</h1>
        <h5>{siteSubtitle}</h5>
      </div>
    </div>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
  siteSubtitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: '',
  siteSubtitle: '',
};

export default Header;
