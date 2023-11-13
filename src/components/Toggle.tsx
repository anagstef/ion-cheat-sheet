import { useStore } from '@nanostores/react';
import '../styles/Toggle.css';
import { isDarkTheme } from '../stores';

const Toggle = () => {
  const $isDarkTheme = useStore(isDarkTheme);

  return (
    <div style={{ fontSize: '12px' }}>
      <input 
        className="tgl tgl-light" 
        id="toggle" 
        type="checkbox" 
        onChange={() => isDarkTheme.set(!$isDarkTheme)} 
        checked={!$isDarkTheme}
         />
      <label className="tgl-btn" htmlFor="toggle" />
    </div>
  );
};

export default Toggle;