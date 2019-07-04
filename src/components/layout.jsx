/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import Header from './header';
import './layout.css';

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={data => (
      <>
        <div className="page-container">
          <div className="header-content-container">
            <Header
              siteTitle={data.site.siteMetadata.title}
              siteSubtitle={data.site.siteMetadata.description}
            />
            <main style={{
              margin: '0 auto',
              maxWidth: 960,
              padding: '0px 1.0875rem 1.45rem',
              paddingTop: 0,
              height: '100%',
            }}
            >
              {children}
            </main>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <footer style={{
              margin: '0 auto',
              maxWidth: 960,
              padding: '0px 1.0875rem 1.45rem',
              paddingTop: 0,
              fontSize: '12px',
              position: 'absolute',
              bottom: 0,
              width: '100%',
              height: '50px',
            }}
            >
              ©
              {' '}
              {new Date().getFullYear()}
  . Built with
              {' '}
              <span className="heart-icon">&lt;3</span>
              {' '}
  Hit me up on
              {' '}
              <a href="https://twitter.com/anagstef" target="_blank" rel="noopener noreferrer"><span className="twitter-icon">Twitter</span></a>
            </footer>
          </div>
        </div>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
