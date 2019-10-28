import { createStore as reduxCreateStore } from 'redux';
import { loadLocalState, saveLocalState } from './localStore';

const reducer = (state, action) => {
  if (action.type === 'UPDATE_SEARCH_TERM') {
    const newState = Object.assign({}, state, {
      search: action.data,
    });
    return newState;
  }
  if (action.type === 'DARK_THEME') {
    const body = document.body.classList;

    if (action.data) body.add('dark-theme');
    else body.remove('dark-theme');

    const newState = Object.assign({}, state, {
      darkTheme: action.data,
    });
    return newState;
  }
  if (action.type === 'UPDATE_SEARCHBAR_FIXED') {
    const newState = Object.assign({}, state, {
      searchbarFixed: action.data,
    });
    return newState;
  }
  return state;
};

const createStore = () => {
  const store = reduxCreateStore(reducer, loadLocalState() || {});
  store.subscribe(() => {
    saveLocalState({
      darkTheme: store.getState().darkTheme,
    });
  });
  return store;
};

export default createStore;
