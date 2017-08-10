import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';

import reducers from './reducers';
import ProjectContainer from './containers/project-container';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
console.log(ProjectContainer)
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <ProjectContainer />
  </Provider>
  , document.querySelector('#project'));
