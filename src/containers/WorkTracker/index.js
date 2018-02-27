import React, { Component } from 'react';
import Navbar from '../../components/Navbar'
import moment from 'moment';

class WorkTracker extends Component {
    state = {
        settings: {
            rate: 135,
            tax: 0.36
        },
        hours: [
            { id: 1, from: "2018-02-19 09:00", to: "2018-02-19 16:00", hours: 7, rate: 135 },
            { id: 2, from: "2018-02-21 09:00", to: "2018-02-21 16:30", hours: 7.5, rate: 135 },
            { id: 3, from: "2018-02-26 09:00", to: "2018-02-21 16:15", hours: 7.25, rate: 135 }
        ],
        hourLog: {
            "February 2018": {
                period: "February 2018",
                start: "2018-01-16",
                end: "2018-02-15",
                tax: 0.36,
                hours: [
                    { id: 1, date: "2018-01-19", from: "09:00", to: "15:30", hours: 6.5, rate: 135 },
                    { id: 2, date: "2018-01-22", from: "09:00", to: "15:30", hours: 6.5, rate: 135 },
                    { id: 3, date: "2018-01-23", from: "09:00", to: "14:30", hours: 5.5, rate: 135 },
                    { id: 4, date: "2018-01-24", from: "09:00", to: "15:30", hours: 6.5, rate: 135 },
                    { id: 5, date: "2018-01-26", from: "09:00", to: "16:00", hours: 7, rate: 135 },
                    { id: 6, date: "2018-01-29", from: "09:00", to: "16:00", hours: 7, rate: 135 },
                    { id: 7, date: "2018-01-30", from: "09:00", to: "16:00", hours: 7, rate: 135 },
                    { id: 8, date: "2018-01-31", from: "09:00", to: "16:00", hours: 7, rate: 135 },
                    { id: 9, date: "2018-02-05", from: "09:00", to: "15:00", hours: 6, rate: 135 },
                    { id: 10, date: "2018-02-06", from: "09:00", to: "16:00", hours: 7, rate: 135 },
                    { id: 11, date: "2018-02-07", from: "08:45", to: "15:45", hours: 7, rate: 135 },
                    { id: 12, date: "2018-02-12", from: "09:45", to: "16:00", hours: 7.25, rate: 135 },
                    { id: 13, date: "2018-02-14", from: "09:00", to: "16:45", hours: 6.75, rate: 135 }
                ]
            },
            "March 2018": {
                period: "March 2018",
                start: "2018-02-16",
                end: "2018-03-15",
                tax: 0.36,
                hours: [
                    { id: 1, date: "2018-02-19", from: "09:00", to: "16:00", hours: 7, rate: 135 },
                    { id: 2, date: "2018-02-21", from: "09:00", to: "16:30", hours: 7.5, rate: 135 },
                    { id: 3, date: "2018-02-26", from: "09:00", to: "16:15", hours: 7.25, rate: 135 }
                ]
            },
        }
    };

    componentDidMount = () => {
        this.getPeriod()
    }

    getDate = (sDate) => {
        let date = moment(sDate).format("ddd, DD MMM YYYY");
        return date;
    }

    getTimeInterval = (sTimeFrom, sTimeTo) => {
        let from = moment(sTimeFrom).format("HH:mm");
        let to = moment(sTimeTo).format("HH:mm");
        return from + ' - ' + to;
    }

    getPeriod = () => {
        let dayOfMonth = moment().format("D");
        let month = parseInt(moment().format("M"))
        let year = moment().format("YYYY");
        let period = null;
        // console.log(dayOfMonth, month, year)

        if (dayOfMonth > 15) {
            let nextMonth = month + 1;
            let startDate = moment(year + "-" + month + "-15", "YYYY-M-DD").format("DD MMM YYYY");
            let endDate = moment(year + "-" + nextMonth + "-16", "YYYY-M-DD").format("DD MMM YYYY");


            // console.log("next month", startDate, nextMonth, endDate)
            this.setState({ startDate: startDate, endDate: endDate })
            // return startDate + " - " + endDate

        } else {
            let lastMonth = month - 1;
            let endDate = moment(year + "-" + month + "-16", "YYYY-M-DD").format("DD MMM YYYY");
            let startDate = moment(year + "-" + lastMonth + "-15", "YYYY-M-DD").format("DD MMM YYYY");

            // console.log("last month", month, year, startDate, endDate)
            this.setState({ startDate: startDate, endDate: endDate })
            // return startDate + " - " + endDate
        }
        // TODO: account for years overlapping
    }

    getSalary() {
        let salary = 0;
        this.state.hours.map((log, i) => {
            salary += (log.hours * log.rate);
        })

        let tax = (salary * this.state.settings.tax);
        return salary - tax;
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
                                <button className="btn btn-info" type="button" data-toggle="modal" data-target="#logHoursModal">Log Hours</button>
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
                                            <p className="mb-0">{this.getDate(logItem.from)} <small> {this.getTimeInterval(logItem.from, logItem.to)} </small></p>
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
                                    <h3 className="display-1">{this.getSalary()}</h3>
                                </div>
                                <div className="card-footer text-muted">
                                    {this.state.startDate && this.state.startDate} - {this.state.endDate && this.state.endDate}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="modal fade" id="logHoursModal" tabIndex="-1" role="dialog" aria-labelledby="logHoursModalTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header bg-dark text-white">
                                <h5 className="modal-title" id="exampleModalLongTitle">Log hours</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" style={{ color: "white" }}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label>Date</label>
                                        <input type="text" className="form-control" id="inputDate" />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-6">
                                            <label>Start</label>
                                            <input type="time" className="form-control" id="inputStartDate" />
                                        </div>
                                        <div className="form-group col-6">
                                            <label>End</label>
                                            <input type="time" className="form-control" id="inputEndTime" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Rate</label>
                                        <div className="input-group mb-3">
                                            <input type="text" className="form-control" aria-label="Recipient's username" aria-describedby="basic-addon2" value="135" />
                                            <div className="input-group-append">
                                                <span className="input-group-text" id="basic-addon2">DKK</span>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-success">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default WorkTracker;
