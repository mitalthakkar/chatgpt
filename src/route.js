import React, { lazy, Suspense } from 'react';
import { Route, withRouter, Redirect, Switch } from 'react-router-dom';
// Normal Import
import Header from './header.tsx';
// lazy loading
const Home = lazy(() => import('./comp/main_home.tsx'));
const Cart = lazy(() => import('./comp/cart.tsx'));
const ErrorPage = lazy(() => import('./comp/error_page.tsx'));
const Compare = lazy(() => import('./comp/compare.tsx'));
// placeholder for firm user page

export const routes = [
    {
        exact: true,
        path: '/',
        component: () => <Home />,
    },
    {
        exact: true,
        path: '/home',
        component: () => <Home />,
    },
    // user page routes
    {
        exact: true,
        path: '/cart',
        component: () => <Cart />,
    },
    {
        exact: true,
        path: '/compare',
        component: () => <Compare />,
    },
    {
        exact: true,
        path: '/404',
        component: () => <ErrorPage />,
    },
];

function AppRouter(props) {
    return (
        <div>
            <Header />
            <Suspense className="loader" fallback={<React.Fragment>Loading..</React.Fragment>}>
                <Switch>
                    {routes.map(singleRoute => (
                        <Route
                            exact={singleRoute.exact}
                            key={singleRoute.path}
                            path={`${singleRoute.path}`}
                            component={singleRoute.component}
                            {...props}
                        />
                    ))}
                    <Redirect from="/" to="/404" />
                </Switch>
            </Suspense>
        </div>
    );
}
export default withRouter(AppRouter);
