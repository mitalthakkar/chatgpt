import './App.css';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import AppRouter from './route';
import Login from './comp/login.tsx';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { Provider } from 'react-redux';
import configStore from './redux/store/configStore';

const customHistory = createBrowserHistory({ basename: process.env.REACT_APP_PATHOFBUILD });
// const isLoggedIn = true;

const store = configStore();
function App() {
  const reduxState = store.getState();
  const auth = reduxState.auth;
  const isLoggedIn = auth.isLogin;
  const NonLogedInRoutes = ({ component: Component, isLoggedIn, ...rest }) => (
    <Route
      {...rest}
      render={props => {
        return (
          <Suspense className="loader" fallback={<div>loading..</div>}>
            <Component {...props} />
          </Suspense>
        )
      }
      }
    />
  );

  const RestrictedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
    <Route
      {...rest}
      render={props => {
        if (isLoggedIn) {
          if (props.location.pathname === '/') {
            return (
              <React.Fragment>
                <Redirect
                  to={{
                    pathname: '/home',
                    state: { from: props.location },
                  }}
                />
              </React.Fragment>
            );

          }
          return (
            <React.Fragment>
              <Component {...props} />
            </React.Fragment>
          );

        } else {
          if (props.location.pathname === '/') {
            return (
              <React.Fragment>
                <Redirect
                  to={{
                    pathname: '/',
                    state: { from: props.location },
                  }}
                />
              </React.Fragment>
            );
          } else {

            return (
              <Redirect
                to={{
                  pathname: '/home',
                  state: { from: props.location },
                }}
              />
            );
          }
        }
      }}
    />
  );
  return (
    <div className="App">
      <Provider store={store}>
        <Router
          history={customHistory}
          basename={process.env.REACT_APP_PATHOFBUILD}
        >
          <Route
            render={({ location }) => (
              <Switch location={location}>
                <NonLogedInRoutes
                  path="/login"
                  exact
                  title="home"
                  component={Login}
                />

                <RestrictedRoute path="/" component={AppRouter} isLoggedIn={isLoggedIn} />
              </Switch>
            )}
          />
        </Router>
      </Provider>
    </div >
  );
}

export default App;
