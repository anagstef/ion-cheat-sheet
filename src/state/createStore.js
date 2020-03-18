import { createStore as reduxCreateStore } from 'redux';

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_SEARCH_TERM':
      return { ...state, search: action.data };
    case 'DARK_THEME': {
      const body = document.body.classList;
      if (action.data) body.add('dark-theme');
      else body.remove('dark-theme');
      return { ...state, darkTheme: action.data };
    }
    case 'UPDATE_SEARCHBAR_FIXED':
      return { ...state, searchbarFixed: action.data };
    default:
      return state;
  }
};

const createStore = () => reduxCreateStore(reducer, {});
export default createStore;
