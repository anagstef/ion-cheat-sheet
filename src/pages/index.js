import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ pageContext }) => (
  <Layout>
    <SEO title="Ionic 4 CheatSheet" keywords={[`ionic`, `cheatsheet`, `angular`, `css`]} />
    {pageContext.downloadedContent.map(content => {
      if (content.cssVars.length < 1) return null;
      return (<div key={content.title}>
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
    <p>{pageContext.buildDate}</p>
  </Layout>
)

export default IndexPage
