import { useState } from 'react';
import '../styles/ListItem.css';

const ListItem = ({ content }) => {
    const [copiedValue, setCopiedValue] = useState('');

    const addCopiedText = (valueClicked) => {
        setCopiedValue(valueClicked);
        window.navigator.clipboard.writeText(valueClicked);
        setTimeout(() => {
            setCopiedValue('');
        }, 2000);
    }

    return (
        <>
            <div className="list-item">
                <div className="list-item-title">
                    <h2>{content.title}</h2>
                    <a href={content.url} target="_blank" rel="noopener noreferrer"><span>&nbsp;</span></a>
                </div>
                <div className="table">
                {content.cssVars.map(cssVarWithDesc => (
                    <div className="table-row" key={cssVarWithDesc.cssVar}>
                        <div className="row-name">
                            <span onClick={() => addCopiedText(cssVarWithDesc.cssVar)}>
                                {cssVarWithDesc.cssVar}
                            </span>
                            <div className={`copied-text ${copiedValue === cssVarWithDesc.cssVar ? 'copied-text-clicked' : ''}`}>Copied!</div>
                        </div>
                        <div className="row-desc">{cssVarWithDesc.cssDesc}</div>
                    </div>
                ))}
                </div>
            </div>
        </>
    );
};

export default ListItem;
