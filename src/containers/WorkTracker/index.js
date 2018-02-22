import React, { Component } from 'react';
import Navbar from '../../components/Navbar'
import moment from 'moment';

class WorkTracker extends Component {
    state = {
        hours: [
            {id: 1, from: "2018-02-19 09:00", to: "2018-02-19 16:00", hours: 7, rate: 135}, 
            {id: 2, from: "2018-02-21 09:00", to: "2018-02-21 16:30", hours: 7.5, rate: 135}
        ]};

    getDate(sDate) {
        let date = moment(sDate).format("ddd, DD MMM YYYY");
        return date;
    }

    getTimeInterval(sTimeFrom, sTimeTo) {
        let from = moment.utc(sTimeFrom).format("HH:mm");
        let to = moment(sTimeTo).format("HH:mm");
        console.log(sTimeFrom, from, sTimeTo, to)
        return from + ' - ' + to;
    }

    getSalary() {
        let salary = 0;
        this.state.hours.map((log, i) => {
            salary += (log.hours * log.rate);
        })
        return salary;
    }

    render() {
        let hourLog = this.state.hours;

        return (
            <div>
                <Navbar />
                <div className="jumbotron jumbotron-fluid bg-info text-white">
                    <div className="container">
                        <h1 className="display-4">Work Tracker</h1>
                        <p className="lead">This component will track my work hours and calculate my salary.</p>
                    </div>
                </div>
                <div className="container">
                    <div className="row">

                        <div className="col-12 mb-4">
                            <div className="d-flex w-100 justify-content-between mb-2">
                                <h3>Student Web Developer at Mybanker</h3>
                                <button className="btn btn-info" type="submit">Log Hours</button>
                            </div>
                            <div className="progress" style={{ height: 25 }}>
                                <div className="progress-bar bg-info" role="progressbar" style={{ width: "40%", ariaValuenow: 50, ariaValuemin: 0, ariaValuemax: 100 }}>40%</div>
                            </div>
                        </div>

                        <div className="col-12 col-md-6">
                            <ul className="list-group">
                                <li href="#" className="list-group-item list-group-item-action flex-column align-items-start bg-dark text-white">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h4 className="mb-1">Logged Hours</h4>
                                    </div>

                                </li>
                                {hourLog.map((logItem, i) => {
                                    return (
                                        <li key={logItem.id} className="list-group-item d-flex justify-content-between align-items-center">
                                            <p className="mb-0">{ this.getDate(logItem.from) } <small> {this.getTimeInterval(logItem.from, logItem.to)} </small></p>
                                            <span className="">{logItem.hours}<small>h</small></span>
                                            <span className="">{logItem.hours * logItem.rate} <small>DKK</small></span>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>

                        <div className="col-12 col-md-6">
                            <div className="card">
                                <div className="card-header bg-dark text-white">
                                    <h4 className="mb-1">Upcoming Salary</h4>
                                </div>
                                <div className="card-body">
                                    <h2 className="display-1">{this.getSalary()}</h2>
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

export default WorkTracker;
