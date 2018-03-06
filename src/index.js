import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import { enableBatching } from 'redux-batched-actions';

import rootReducer from './reducers'
import registerServiceWorker from './registerServiceWorker';

import './core.css';

// Import Views
import Home from './containers/Home'
import GradeTracker from './containers/GradeTracker'
import WorkTracker from './containers/WorkTracker'
import AssignmentTracker from './containers/AssignmentTracker'
import GoalTracker from './containers/GoalTracker'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk),
);

const store = createStore(enableBatching(rootReducer), enhancer);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div id="elitracker">
                <Route exact path="/" component={Home} />
                <Route path="/work-tracker" component={WorkTracker} />
                <Route path="/grade-tracker" component={GradeTracker} />
                <Route path="/assignment-tracker" component={AssignmentTracker} />
                <Route path="/goal-tracker" component={GoalTracker} />
            </div>
        </Router>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
