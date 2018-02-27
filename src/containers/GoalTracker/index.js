import React, { Component } from 'react';
import Navbar from '../../components/Navbar'

class GoalTracker extends Component {

    render() {

        return (
            <div>
                <Navbar />
                <div className="jumbotron jumbotron-fluid bg-info text-white">
                    <div className="container">
                        <h1 className="display-4">Goal Tracker</h1>
                        <p className="lead">This component will track your goals in all aspects of your life.</p>
                    </div>
                </div>
                <div className="container">
                    <div className="row">

                    <div className="col-12 mb-4">
                    <div className="d-flex w-100 justify-content-between mb-2">
                        <h3>Overall Progress</h3>
                        <button className="btn btn-info" type="submit">Add Category</button>
                    </div>
                    <div className="progress" style={{ height: 25 }}>
                        <div className="progress-bar bg-info" role="progressbar" style={{ width: "40%", ariaValuenow: 50, ariaValuemin: 0, ariaValuemax: 100 }}>40%</div>
                    </div>
                </div>
                <div className="col-12 col-md-6">

                    <div className="list-group">
                        <li className="list-group-item list-group-item-action flex-column align-items-start bg-dark text-white">
                            <div className="d-flex w-100 justify-content-between">
                                <h4 className="mb-1">Current Goals</h4>
                            </div>
                        </li>
                        
                        <li className="list-group-item" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                            <h5 className="mb-3">Planking</h5>
                            <div className="collapse show" id="collapseExample">
                            <div className="list-group list-group-flush">
                                <li className="list-group-item pl-0">Hold 1.40 min</li>
                                <li className="list-group-item pl-0">Hold 1.50 min</li>
                                <li className="list-group-item pl-0">Hold 2 min</li>
                            </div>
                            </div>
                        </li>

                        <li className="list-group-item">
                            <h5 className="mb-3">EliTracker</h5>
                            <div className="list-group list-group-flush">
                                <li className="list-group-item pl-0">Finish Templates</li>
                                <li className="list-group-item pl-0">Create Database</li>
                                <li className="list-group-item pl-0">Set up backend</li>
                            </div>
                        </li>
                        
                    </div>
                </div>

                <div className="col-12 col-md-6">

                    <div className="card">
                        <div className="card-header bg-dark text-white">
                            <h4 className="mb-1">Category Stats</h4>
                        </div>
                        <div className="card-body">
                            <h2 className="display-1"></h2>
                        </div>
                        <div className="card-footer text-muted">
                            2 days ago
                        </div>
                    </div>
                </div>

                    
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default GoalTracker;
