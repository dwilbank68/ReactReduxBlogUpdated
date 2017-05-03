import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import ReduxPromise from 'redux-promise';

import PostsIndex from './components/PostsIndex.jsx';
import PostsNew from './components/PostsNew.jsx';
import PostShow from './components/PostShow.jsx';

import reducers from './reducers';

// const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, {}, composeEnhancers(
    applyMiddleware(ReduxPromise)
));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
        <div>
            <Switch>
                <Route path="/posts/new" component={PostsNew} />
                <Route path="/posts/:id" component={PostShow} />
                <Route path="/" component={PostsIndex} />
            </Switch>
        </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
