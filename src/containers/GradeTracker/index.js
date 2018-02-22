import React, { Component } from 'react';
import Navbar from '../../components/Navbar'

class GradeTracker extends Component {
    state = {grades: [12, 10, 12]};

    

    getAverage() {
        let grades = this.state.grades;
        let sum = grades.reduce((previous, current) => current += previous);
        let avg = sum / grades.length;
        return avg.toFixed(2);
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="jumbotron jumbotron-fluid bg-info text-white">
                    <div className="container">
                        <h1 className="display-4">Grade Tracker</h1>
                        <p className="lead">This component will track my grades and calculate an average.</p>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-12 mb-4">
                            <div className="d-flex w-100 justify-content-between mb-2">
                                <h3>BA in Web Development</h3>
                                <button className="btn btn-info" type="submit">Add Grade</button>
                            </div>
                            <div className="progress" style={{ height: 25 }}>
                                <div className="progress-bar bg-info" role="progressbar" style={{ width: "40%", ariaValuenow: 50, ariaValuemin: 0, ariaValuemax: 100 }}>40%</div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">

                            <div className="list-group">
                                <a href="#" className="list-group-item list-group-item-action flex-column align-items-start bg-dark text-white">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h4 className="mb-1">Recorded Grades</h4>
                                    </div>

                                </a>
                                <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">Databases </h5>
                                        <h5><span className="badge badge-dark badge-pill">12</span></h5>
                                    </div>
                                    <p className="mb-1">BA in Web Development, 1st Semester</p>
                                    <small>Janurary 1, 2018</small>
                                </a>
                                <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">Interface Design</h5>
                                        <h5><span className="badge badge-dark badge-pill">10</span></h5>
                                    </div>
                                    <p className="mb-1">BA in Web Development, 1st Semester</p>
                                    <small className="text-muted">December 21, 2017</small>
                                </a>
                                <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">Web Development</h5>
                                        <h5><span className="badge badge-dark badge-pill">12</span></h5>
                                    </div>
                                    <p className="mb-1">BA in Web Development, 1st Semester</p>
                                    <small className="text-muted">October 15, 2017</small>
                                </a>
                            </div>
                        </div>

                        <div className="col-12 col-md-6">

                            <div className="card">
                                <div className="card-header bg-dark text-white">
                                    <h4 className="mb-1">Current Average</h4>
                                </div>
                                <div className="card-body">
                                    <h2 className="display-1">{this.getAverage()}</h2>
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

export default GradeTracker;
