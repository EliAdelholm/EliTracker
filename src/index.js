import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './core.css';

// Import Views
import Home from './containers/Home'
import GradeTracker from './containers/GradeTracker'
import WorkTracker from './containers/WorkTracker'
import AssignmentTracker from './containers/AssignmentTracker'
import GoalTracker from './containers/GoalTracker'

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Router>
        <div id="elitracker">
            <Route exact path="/" component={Home} />
            <Route path="/work-tracker" component={WorkTracker} />
            <Route path="/grade-tracker" component={GradeTracker} />
            <Route path="/assignment-tracker" component={AssignmentTracker} />
            <Route path="/goal-tracker" component={GoalTracker} />
        </div>
    </Router>
    , document.getElementById('root'));
registerServiceWorker();
