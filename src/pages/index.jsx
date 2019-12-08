import React from 'react';
import { connect } from 'react-redux';
import Fuse from 'fuse.js';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Searchbar from '../components/searchbar';
import ListItem from '../components/list-item';

const options = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    'title',
  ],
};

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fuse: new Fuse(props.pageContext.downloadedContent, options),
    };
    this.fixedSearchbar = this.fixedSearchbar.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.fixedSearchbar);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.fixedSearchbar);
  }

  fixedSearchbar() {
    const { stickSearchBarToTop, searchbarFixed } = this.props;
    const contentPosition = document.getElementById('mainContent').offsetTop;
    const scrollPosition = window.scrollY;
    if (scrollPosition < contentPosition && searchbarFixed) stickSearchBarToTop(false);
    else if (scrollPosition >= contentPosition && !searchbarFixed) stickSearchBarToTop(true);
  }

  render() {
    const { fuse } = this.state;
    const { search, pageContext } = this.props;
    const result = search ? fuse.search(search) : pageContext.downloadedContent;
    return (
      <Layout>
        <SEO
          title="Ionic Framework 4 Cheat sheet"
          description="This is a cheat sheet for Ionic Framework 4 presenting all the useful info from official documentation gathered in one place."
          keywords={['ionic', 'cheatsheet', 'angular', 'css', 'react', 'vue', 'stencil', 'web components']}
        />
        <Searchbar />
        <div className="main-content" id="mainContent">
          {result.map((content) => {
            if (content.cssVars.length < 1) return null;
            return <ListItem content={content} key={content.title} />;
          })}
          {!result.length ? (
            <div style={{
              textAlign: 'center', fontSize: '24px', fontWeight: '500', opacity: '0.5', margin: '50px auto',
            }}
            >
No matches.

            </div>
          ) : null}
        </div>
        <div style={{
          display: 'flex', justifyContent: 'flex-end', fontSize: '14px', fontStyle: 'italic',
        }}
        >
          <span style={{ width: '70%', textAlign: 'right' }}>
            Last update from
            {' '}
            <a href="https://ionicframework.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'unset', color: '#4d8dff' }}>Ionic Framework Docs</a>
            {' '}
            was on
            {' '}
            {pageContext.buildDate}
.
          </span>
        </div>

      </Layout>
    );
  }
}

export default connect(
  ({ search, searchbarFixed }) => ({ search, searchbarFixed }),
  dispatch => ({ stickSearchBarToTop: value => dispatch({ type: 'UPDATE_SEARCHBAR_FIXED', data: value }) }),
)(IndexPage);
