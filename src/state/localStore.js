export const loadLocalState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    return undefined;
  }
};

export const saveLocalState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    // do nothing
  }
};
