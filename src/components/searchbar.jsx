/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import { debounce } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import './searchbar.css';

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.scrollToTop = debounce(scrollToTop, 300);
  }

  handleChange(event) {
    const { updateSearchTerm } = this.props;
    updateSearchTerm(event.target.value);
    this.scrollToTop();
  }

  render() {
    const { search, searchbarFixed } = this.props;
    return (
      <div className={`search ${searchbarFixed ? 'search-fixed' : ''}`}>
        <div className="searchbar-container">
          <input defaultValue={search || ''} onChange={this.handleChange} placeholder="Search" />
        </div>
        <div className="checkboxes">
          <div>
            <input type="checkbox" name="option1" value="CSS" readOnly checked />
            <label htmlFor="option1">CSS Vars</label>
          </div>
          {/* <div>
            <input type="checkbox" name="option2"
            value="Methods" /><label htmlFor="option2">Methods</label>
          </div>
          <div>
            <input type="checkbox" name="option3"
            value="Properties" /><label htmlFor="option3">Properties</label>
          </div> */}
        </div>
      </div>
    );
  }
}

export default connect(
  ({ search, searchbarFixed }) => ({ search, searchbarFixed }),
  dispatch => ({ updateSearchTerm: value => dispatch({ type: 'UPDATE_SEARCH_TERM', data: value }) }),
)(Searchbar);
