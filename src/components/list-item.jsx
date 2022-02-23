/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import './list-item.scss';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { copiedValue: '' };
    this.addCopiedText = this.addCopiedText.bind(this);
  }

  addCopiedText(valueClicked) {
    this.setState({ copiedValue: valueClicked });
    setTimeout(() => {
      this.setState({ copiedValue: '' });
    }, 2000);
  }

  render() {
    const { content, showCssVars, showMethods } = this.props;
    const { copiedValue } = this.state;
    return (
      <div className="list-item">
        <div className="list-item-title">
          <h2>{content.title}</h2>
          <a href={content.url} target="_blank" rel="noopener noreferrer"><span>&nbsp;</span></a>
        </div>
        {showCssVars && content.cssVars.length > 0 && (
          <div>
            <div className="content-title">CSS Variables</div>
            <div className="table">
              {content.cssVars.map(cssVarWithDesc => (
                <div className="table-row" key={cssVarWithDesc.cssVar}>
                  <div className="row-name">
                    <CopyToClipboard text={cssVarWithDesc.cssVar}>
                      <span onClick={() => this.addCopiedText(cssVarWithDesc.cssVar)}>
                        {cssVarWithDesc.cssVar}
                      </span>
                    </CopyToClipboard>
                    <div className={`copied-text ${copiedValue === cssVarWithDesc.cssVar ? 'copied-text-clicked' : ''}`}>Copied!</div>
                  </div>
                  <div className="row-desc">{cssVarWithDesc.cssDesc}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {showMethods && content.methods.length > 0 && (
          <div>
            <div className="content-title">Methods</div>
            <div className="table">
              {content.methods.map(method => (
                <div className="table-row" key={method.name}>
                  <div className="row-name">
                    <CopyToClipboard text={method.name}>
                      <span onClick={() => this.addCopiedText(method.name)}>
                        {method.name}
                      </span>
                    </CopyToClipboard>
                    <div className={`copied-text ${copiedValue === method.name ? 'copied-text-clicked' : ''}`}>Copied!</div>
                  </div>
                  <div className="row-desc method-desc">
                    <div className="description-name">Description:</div>
                    <div className="description-content">{method.description}</div>
                    <div className="signature-name">Signature:</div>
                    <div className="signature-content"><code>{method.signature}</code></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ListItem;
