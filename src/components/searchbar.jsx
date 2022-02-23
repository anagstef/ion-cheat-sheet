/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable no-trailing-spaces */
/* eslint-disable jsx-a11y/no-autofocus */

import React from 'react';
import './searchbar.css';
import { connect } from 'react-redux';

class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleCssVarsCheckboxChange = this.handleCssVarsCheckboxChange.bind(this);
    this.handleMethodsCheckboxChange = this.handleMethodsCheckboxChange.bind(this);
    this.searchBarRef = React.createRef();
    this.handleFocus = this.handleFocus.bind(this);
    if (typeof document !== 'undefined') {
      document.addEventListener('keypress', this.handleFocus);
    }
  }

  componentDidMount() {
    const { updateCssVarsSearchCheckbox } = this.props;
    updateCssVarsSearchCheckbox(true);
  }

  componentWillUnmount() {
    if (typeof document !== 'undefined') {
      document.removeListener('keypress', this.handleFocus);
    }
  }

  handleFocus() {
    this.searchBarRef.current.focus();
  }

  handleChange(event) {
    const { updateSearchTerm } = this.props;
    updateSearchTerm(event.target.value);
  }

  handleCssVarsCheckboxChange(event) {
    const { updateCssVarsSearchCheckbox } = this.props;
    updateCssVarsSearchCheckbox(event.target.checked);
  }

  handleMethodsCheckboxChange(event) {
    const { updateMethodsSearchCheckbox } = this.props;
    updateMethodsSearchCheckbox(event.target.checked);
  }

  render() {
    const { 
      search, searchbarFixed, searchCssVars, searchMethods,
    } = this.props;
    return (
      <div className={`search ${searchbarFixed ? 'search-fixed' : ''}`}>
        <div className="searchbar-container">
          <input
            ref={this.searchBarRef}
            defaultValue={search || ''} 
            onChange={this.handleChange} 
            placeholder="Search" 
            autoFocus
          />
        </div>
        <div className="checkboxes">
          <div>
            <input type="checkbox" name="option1" defaultChecked={searchCssVars} onChange={this.handleCssVarsCheckboxChange} />
            <label htmlFor="option1">CSS Vars</label>
          </div>
          <div>
            <input type="checkbox" name="option2" defaultChecked={searchMethods} onChange={this.handleMethodsCheckboxChange} />
            <label htmlFor="option2">Methods</label>
          </div>
          {/* <div>
            <input type="checkbox" name="option3"
            value="Properties" /><label htmlFor="option3">Properties</label>
          </div> */}
        </div>
      </div>
    );
  }
}

export default connect(
  ({ 
    search, searchbarFixed, searchCssVars, searchMethods,
  }) => ({ 
    search, searchbarFixed, searchCssVars, searchMethods,
  }),
  dispatch => ({ 
    updateSearchTerm: value => dispatch({ type: 'UPDATE_SEARCH_TERM', data: value }),
    updateCssVarsSearchCheckbox: value => dispatch({ type: 'UPDATE_SEARCH_CHECKBOX_CSSVARS', data: value }),
    updateMethodsSearchCheckbox: value => dispatch({ type: 'UPDATE_SEARCH_CHECKBOX_METHODS', data: value }),
  }),
)(Searchbar);
