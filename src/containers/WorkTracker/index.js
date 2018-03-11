// Dependencies
import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'

import * as WorkActions from '../../actions/workActionCreator';

// Global components
import Navbar from '../../components/Navbar'
import Jumbotron from '../../components/Jumbotron'
import Progressbar from '../../components/Progressbar'

// Local components
import Create from './create'
import ListItem from './listItem'

class WorkTracker extends Component {
    state = {
        jobs: [],
        showPeriod: 0,
        settings: {
            rate: 135,
            tax: 0.36,
            amb: 0.08
        },
    };

    async componentDidMount() {
        const { onRequestJobs } = this.props

        try {
            await onRequestJobs()

            const jobs = this.props.jobs;
            return this.setState({ jobs: jobs })

        } catch (err) {
            console.error(err);
            return
        }

    }

    handleShowPeriod = (e) => {
        const value = e.target.value;

        if (value === "create") {
            // Do something
            return
        }

        this.setState({
            showPeriod: value
        });

    }

    getProgress = (startDate, endDate) => {
        let periodInDays = moment(endDate).diff(moment(startDate), 'days')
        let progressInDays = moment().diff(moment(startDate), 'days')
        let progressinPercent = 0

        // Progress can never be more than 100%
        if (progressInDays >= periodInDays) {
            progressinPercent = 100
        } else {
            progressinPercent = Math.round(progressInDays / periodInDays * 100);
        }

        return progressinPercent + "%";
    }

    getPeriodHours(job) {
        let hours = 0;
        const { jobs } = this.state
        jobs[job].periods[this.state.showPeriod].loggedHours.map((log, i) => {
            return hours += log.hours;
        })
        return hours + ' hours'
    }

    getSalary(job) {
        let salary = 0;
        const { jobs } = this.state
        jobs[job].periods[this.state.showPeriod].loggedHours.map((log, i) => {
            return salary += (log.hours * jobs[job].rate);
        })
        console.log(salary / 135)

        salary = salary * 0.92

        let tax = (salary * this.state.settings.tax);
        return parseFloat(salary - tax).toFixed(2) + ' DKK'
    }

    handleAddHours = (item) => {
        let object = { id: 9, date: item.date, startTime: item.start, endTime: item.end, hours: 7 }
        this.setState({ scheduled: [...this.state.scheduled, object] })
    }

    render() {
        const { jobs, showPeriod } = this.state;

        return (
            <div>
                <Navbar />
                <Jumbotron title="Work Tracker" text="This component will track my work hours and calculate my salary." />

                <div className="container">


                    {jobs && jobs.map((job, i) => {
                        return (
                            <div className="row mb-5 pt-4" key={job.company}>

                                <div className="col-12 mb-4">
                                <ul className="nav nav-tabs custom-tabs" role="tablist">
                                        <li className="nav-item">
                                            <p className="nav-link active mb-0" data-toggle="tab">Statistics</p>
                                        </li>
                                        <li className="nav-item">
                                            <p className="nav-link mb-0" data-toggle="tab">Settings</p>
                                        </li>
                                    </ul>
                                </div>
                                
                                <div className="col-12 mb-4">
                                    
                                    <div className="d-flex w-100 justify-content-between align-items-end mb-4">
                                        <h4 className="text-white">{job.position} at {job.company}</h4>

                                        <select className="form-control custom-select mb-2" style={{ width: 200 }} onChange={this.handleShowPeriod}>
                                            {job.periods && job.periods.map((period, i) => {
                                                return (
                                                    <option key={period.name} value={i}>{period.name}</option>
                                                )
                                            })}
                                            {!job.periods &&
                                                <option value="create">No periods</option>
                                            }
                                            <option value="create">Create period</option>
                                        </select>

                                    </div>

                                    {job.periods ?
                                        <Progressbar progress={this.getProgress(job.periods[showPeriod].startDate, job.periods[showPeriod].endDate)} />
                                        : "Create a pay period to gert started"
                                    }

                                </div>

                                <div className="col-12 col-sm-6 col-lg-3 mb-4">
                                    <div className="card">
                                        <div className="card-header d-flex w-100 justify-content-between bg-info">
                                            <h5>Total hours</h5>
                                        </div>
                                        <div className="card-body bg bg-accent">
                                            <p>{job.periods ? this.getPeriodHours(i) : 'No hours logged'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-sm-6 col-lg-3 mb-4">
                                    <div className="card">
                                        <div className="card-header d-flex w-100 justify-content-between bg-info">
                                            <h5>Total earnings</h5>
                                        </div>
                                        <div className="card-body bg-accent">
                                            <p>{job.periods ? this.getSalary(i) : 'No hours logged'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-sm-6 col-lg-3 mb-4">
                                    <div className="card">
                                        <div className="card-header d-flex w-100 justify-content-between bg-info">
                                            <h5>Upcoming Salary</h5>
                                        </div>
                                        <div className="card-body bg-accent">

                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-sm-6 col-lg-3 mb-4">
                                    <div className="card">
                                        <div className="card-header d-flex w-100 justify-content-between bg-info">
                                            <h5>Upcoming Salary</h5>
                                        </div>
                                        <div className="card-body bg-accent">

                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-md-6">

                                    <ul className="list-group mb-4">
                                        <li className="list-group-item flex-column align-items-start bg-info">
                                            <div className="d-flex w-100 justify-content-between">
                                                <h5 className="mb-1">Logged Hours</h5>
                                                <i className="fas fa-calendar-plus" style={{ fontSize: "20pt" }} data-toggle="modal" data-target="#logHoursModal"></i>
                                            </div>
                                        </li>
                                        {job.periods && job.periods[showPeriod].loggedHours.length > 0 ? job.periods[showPeriod].loggedHours.map((item, i) => {
                                            return (
                                                <ListItem key={item.id} item={item} status="logged" />
                                            )
                                        }) : <li className="list-group-item d-flex justify-content-between align-items-center bg-accent">
                                                <p className="mb-0">You have not logged any hours for this period.</p>
                                            </li>}
                                    </ul>

                                </div>

                                <div className="col-12 col-md-6">

                                    <ul className="list-group mb-4">
                                        <li className="list-group-item flex-column align-items-start bg-info">
                                            <div className="d-flex w-100 justify-content-between">
                                                <h5 className="mb-1">Scheduled Hours</h5>
                                                <i className="fas fa-calendar-plus" style={{ fontSize: "20pt" }} data-toggle="modal" data-target="#logHoursModal"></i>
                                            </div>
                                        </li>
                                        {job.periods && job.periods[showPeriod].scheduledHours.length > 0 ? job.periods[showPeriod].scheduledHours.map((item, i) => {
                                            return (
                                                <ListItem key={item.id} item={item} status="scheduled" />
                                            )
                                        }) : <li className="list-group-item d-flex justify-content-between align-items-center bg-accent">
                                                <p className="mb-0">You have not scheduled any hours for this period.</p>
                                            </li>}
                                    </ul>

                                </div>

                            </div>
                        )
                    })}

                </div>

                <Create onSubmit={this.handleAddHours} />
            </div>
        );
    }
}

// export default WorkTracker;
export default connect((state) => ({
    jobs: Object.values(state.jobs),
}),
    {
        onRequestJobs: WorkActions.fetchJobs,
    })(WorkTracker);
