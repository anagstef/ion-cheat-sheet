import React from 'react';
import './list-item.scss';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const ListItem = ({ content }) => (
  <div className="list-item">
    <div className="list-item-title">
      <h2>{content.title}</h2>
      <a href={content.url} target="_blank" rel="noopener noreferrer"><span>&nbsp;</span></a>
    </div>
    <div className="table">
      {content.cssVars.map(cssVarWithDesc => (
        <div className="table-row" key={cssVarWithDesc.cssVar}>
          <div className="row-name">
            <CopyToClipboard text={cssVarWithDesc.cssVar}>
              <span>{cssVarWithDesc.cssVar}</span>
            </CopyToClipboard>
          </div>
          <div className="row-desc">{cssVarWithDesc.cssDesc}</div>
        </div>
      ))}
    </div>
  </div>
);

export default ListItem;
