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
        <SEO title="Ionic 4 CheatSheet" keywords={[`ionic`, `cheatsheet`, `angular`, `css`]} />
        <Searchbar />
        {this.state.pageContext.downloadedContent.map(content => {
          if (content.cssVars.length < 1 || !content.title.includes(this.props.search || '')) return null;
          return <ListItem content={content} key={content.title} />
        })}
        <p>{this.state.pageContext.buildDate}</p>
      </Layout>
    );
  }
}

export default connect(({ search }) => {
  return { search }
})(IndexPage)
