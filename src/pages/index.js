import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Searchbar from "../components/searchbar";
import { connect } from "react-redux";

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
          return (<div key={content.title} className="list-item">
                    <h2>{content.title}</h2>
                    <p>{content.url}</p>
                    <table>
                      <tbody>
                        {content.cssVars.map(cssVarWithDesc =>
                            (<tr key={cssVarWithDesc.cssVar}>
                              <td>{cssVarWithDesc.cssVar}</td>
                              <td style={{width: '50%'}}>{cssVarWithDesc.cssDesc}</td>
                            </tr>)
                          )}
                      </tbody>
                    </table>
                  </div>);
        })}
        <p>{this.state.pageContext.buildDate}</p>
      </Layout>
    );
  }
}

export default connect(({ search }) => {
  return { search }
})(IndexPage)
