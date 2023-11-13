import { useStore } from '@nanostores/react';
import { searchTerm } from '../stores';
import { useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import ListItem from './ListItem';

const options = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      'title',
    ],
  };

const ComponentsList = ({ scrappedData }) => {
    const $searchTerm = useStore(searchTerm);
    const [fuse] = useState(new Fuse(scrappedData, options));
    const [result, setResult] = useState(scrappedData);

    useEffect(() => {
        const result = $searchTerm ? fuse.search($searchTerm) : scrappedData;
        setResult(result);
    }, [$searchTerm]);

    return (
        <>
            {result.map((content) => {
                if (content.cssVars.length < 1) return null;
                return <ListItem content={content} key={content.title} />;
            })}
            {!result.length ? (
                <div style={{
                    textAlign: 'center', 
                    fontSize: '24px', 
                    fontWeight: '500', 
                    opacity: '0.5', 
                    margin: '50px auto',
                }}>
                    No matches.
                </div>
            ) : null}
        </>
    );
};

export default ComponentsList;