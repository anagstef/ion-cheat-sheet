import React from "react"
import './searchbar.css'
import { connect } from "react-redux";

class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.updateSearchTerm(event.target.value);
  }

  render() {
    return (
      <div className="search">
        <div className="searchbar-container">
          <input defaultValue={this.props.search || ''} onChange={this.handleChange} placeholder="Search" />
        </div>
        <div className="checkboxes">
          <div>
            <input type="checkbox" name="option1" value="CSS" checked /><label htmlFor="option1">CSS Vars</label>
          </div>
          {/* <div>
            <input type="checkbox" name="option2" value="Methods" /><label htmlFor="option2">Methods</label>
          </div>
          <div>
            <input type="checkbox" name="option3" value="Properties" /><label htmlFor="option3">Properties</label>
          </div> */}
        </div>
      </div>
    );
  }
}

export default connect(
  ({ search }) => { return { search } },
  dispatch => { return { updateSearchTerm: (value) => dispatch({ type: `UPDATE_SEARCH_TERM`, data: value }) } }
)(Searchbar)