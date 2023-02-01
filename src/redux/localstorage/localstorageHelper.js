// import localstorage from 'localstorage';

export const loadState = () => {
  let temp;
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState) temp = JSON.parse(serializedState);
    else {
      temp = undefined;
    }
    return temp;
  } catch (err) {
    return err;
  }
};

export const saveState = state => {
  try {
    let stateCopy;
    if (state.userType) {
      stateCopy = { ...state };
    } else {
      stateCopy = {
        ...state,
      };
    }
    const serializedState = JSON.stringify(stateCopy);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.log(err);
  }
};
