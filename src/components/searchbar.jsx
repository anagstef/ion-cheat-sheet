/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import './searchbar.css';
import { connect } from 'react-redux';

class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { updateSearchTerm } = this.props;
    updateSearchTerm(event.target.value);
  }

  render() {
    const { search } = this.props;
    return (
      <div className="search">
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
  ({ search }) => ({ search }),
  dispatch => ({ updateSearchTerm: value => dispatch({ type: 'UPDATE_SEARCH_TERM', data: value }) }),
)(Searchbar);
