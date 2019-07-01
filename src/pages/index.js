import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Searchbar from "../components/searchbar";
import { connect } from "react-redux";
import ListItem from "../components/list-item";

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageContext: props.pageContext
    };

  }

  render() {
    return (
      <Layout>
        <SEO title="ion-cheat-sheet - Ionic 4 Cheat Sheet" keywords={[`ionic`, `cheatsheet`, `angular`, `css`, `react`, `vue`, `stencil`, `web components`]} />
        <Searchbar />
        {this.state.pageContext.downloadedContent.map(content => {
          if (content.cssVars.length < 1 || !content.title.includes(this.props.search || '')) return null;
          return <ListItem content={content} key={content.title} />
        })}
        <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '14px', fontStyle: 'italic' }}>
          <span style={{ width: '70%', textAlign: 'right' }}>
            Last update from
            {` `}
            <a href="https://ionicframework.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'unset', color: '#4d8dff'}}>Ionic Framework Docs</a>
            {` `}
            was on {this.state.pageContext.buildDate}.
          </span>
        </div>

      </Layout>
    );
  }
}

export default connect(({ search }) => {
  return { search }
})(IndexPage)
