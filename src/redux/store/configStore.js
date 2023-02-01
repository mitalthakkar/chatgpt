import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { setStateToCookie, getStateFromCookie } from '../cookies/cookieHelper';
import AuthReducer from '../reducers/authReducer';
import PrefrenceReducer from "../reducers/prefrenceReducer"
import CartReducer from "../reducers/cartReducer"
import CompareReducer from '../reducers/compareReducer';
import { loadState, saveState } from '../localstorage/localstorageHelper';

const configStore = () => {
  const persistedStateCookie = getStateFromCookie();
  let persistedStateLocalstorage = {};
  if (persistedStateCookie && persistedStateCookie.auth && persistedStateCookie.auth.isLogin) {
    persistedStateLocalstorage = loadState();
  } else {
    saveState(persistedStateCookie);
    persistedStateLocalstorage = persistedStateCookie;
  }

  const store = createStore(
    combineReducers({
      auth: AuthReducer,
      prefrence: PrefrenceReducer,
      cart: CartReducer,
      compare: CompareReducer
    }),
    persistedStateLocalstorage,
    composeWithDevTools()
  );

  store.subscribe(() => {
    setStateToCookie(store.getState());
    saveState(store.getState());
  });
  return store;
};

export default configStore;
