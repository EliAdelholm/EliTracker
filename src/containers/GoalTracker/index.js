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

                      

                    
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default GoalTracker;
