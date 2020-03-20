/* eslint-disable import/default */

import React from 'react';
import { render } from '@hot-loader/react-dom';
import { AppContainer } from 'react-hot-loader';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import configureStore, { history } from './store/configureStore';
import Root from './containers/Root/Loadable';

// require('bootstrap/dist/css/bootstrap.min.css');
// require('font-awesome/css/font-awesome.min.css');
// Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.
require('./favicon.ico');

// Tell webpack to load favicon.ico
const store = configureStore();
const MOUNT_NODE = document.getElementById('app');

render(
    <AppContainer>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Router>
                    <Switch>
                        <Route path="/" component={Root} />
                    </Switch>
                </Router>
            </ConnectedRouter>
        </Provider>
    </AppContainer>,
    MOUNT_NODE
);

if (module.hot) {
    module.hot.accept('./containers/Root/Loadable', () => {
        const NewRoot = require('./containers/Root/Loadable').default;
        render(
            <AppContainer>
                <Provider store={store}>
                    <ConnectedRouter history={history}>
                        <Router>
                            <Switch>
                                <Route path="/" component={NewRoot} />
                            </Switch>
                        </Router>
                    </ConnectedRouter>
                </Provider>
            </AppContainer>,
            MOUNT_NODE
        );
    });
}
