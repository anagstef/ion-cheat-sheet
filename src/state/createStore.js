import { createStore as reduxCreateStore } from 'redux';

const reducer = (state, action) => {
  if (action.type === 'UPDATE_SEARCH_TERM') {
    const newState = Object.assign({}, state, {
      search: action.data,
    });
    // localStorage.setItem('state', JSON.stringify(newState));
    return newState;
  }
  return state;
};

// const initialState = JSON.parse(localStorage.getItem('state')) || { };

const createStore = () => reduxCreateStore(reducer, { });
export default createStore;
