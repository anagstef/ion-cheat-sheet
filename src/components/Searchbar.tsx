import { useRef, useEffect } from 'react';
import '../styles/Searchbar.css';
import { useStore } from '@nanostores/react';
import { searchTerm, isSearchbarSticky } from '../stores';

const Searchbar = () => {
  const $searchTerm = useStore(searchTerm);
  const $isSearchbarSticky = useStore(isSearchbarSticky);
  const searchBarRef = useRef();

  const handleFocus = () => {
    searchBarRef.current.focus();
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.addEventListener('keypress', handleFocus);
    }

    return () => {
      if (typeof document !== 'undefined') {
        document.removeListener('keypress', handleFocus);
      }
    };
  }, []);

  return (
    <div className={`search ${$isSearchbarSticky ? 'search-fixed' : ''}`}>
      <div className="searchbar-container">
        <input
          ref={searchBarRef}
          defaultValue={$searchTerm || ''} 
          onChange={(e) => searchTerm.set(e.target.value)} 
          placeholder="Search" 
          autoFocus
        />
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
};

export default Searchbar;