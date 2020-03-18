import React from 'react';
import './header.css';
import IonicLogo from '../images/ionic-icon.png';
import Toggle from './toggle';

const Header = ({ siteTitle, siteSubtitle }) => (
  <header>
    <div className="header-container">
      <div className="header-title-logo">
        <img src={IonicLogo} className="ionic-logo" alt="ionic logo" />
        <div className="header-title-text">
          <h1>{siteTitle}</h1>
          <h5>{siteSubtitle}</h5>
        </div>
      </div>
      <Toggle />
    </div>
  </header>
);

export default React.memo(Header);
