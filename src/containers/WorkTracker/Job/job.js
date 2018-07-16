// Dependencies
import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'

// Global components
import Navbar from '../../../components/Navbar'
import Jumbotron from '../../../components/Jumbotron'
import Progressbar from '../../../components/Progressbar'
import CollapsibleCard from '../../../components/CollapsibleCard'

// Local components
import LoggedHours from './loggedHours'
import ScheduledHours from './scheduledHours'

class Job extends Component {
    state = {
        jobId: this.props.jobId,
        job: null,
        periods: [],
        hourLogs: [],
        showPeriod: 0,
        periodHours: [],
        settings: {
            rate: 135,
            tax: 0.36,
            amb: 0.08
        },
    };

    async componentDidMount() {
        const { job, periods, hourLogs } = this.props;
        const periodId = periods[0].id
        let periodHours = hourLogs.filter(x => x.periodId === periodId)
        return this.setState({ job: job[0], periods: periods, hourLogs: hourLogs, periodHours: periodHours })
    }

    handleShowPeriod = (e) => {
        const value = Number(e.target.value);
        const periodId = this.state.periods[value].id
        let periodHours = this.state.hourLogs.filter(x => x.periodId === periodId)

        this.setState({
            showPeriod: value,
            periodHours: periodHours
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

    getPeriodHours(logged) {
        const { periodHours } = this.state
        const sortedHours = periodHours.filter(x => x.logged === logged)

        let hours = 0;
        sortedHours.map((log, i) => {
            return hours += log.hours
        })
        return hours
    }

    getSalary(logged) {
        let salary = this.getPeriodHours(logged) * this.state.settings.rate;
        salary = salary * 0.92
        let tax = salary * this.state.settings.tax
        return parseFloat(salary - tax).toFixed(2) + ' DKK'
    }

    handleAddHours = (item) => {
        let object = { id: 9, date: item.date, startTime: item.start, endTime: item.end, hours: 7 }
        this.setState({ scheduled: [...this.state.scheduled, object] })
    }

    render() {
        const { job, periods, showPeriod, periodHours } = this.state;

        return (
            <div>
                <Navbar onBackClick={this.props.onBack}/>
                {job && 
                    <Jumbotron title={job.company} text={job.position}/>
                }

                <div className="container">

                    {!job &&
                        <div className="row">
                            <div className="col-12">
                                <h4>No jobs found.</h4>
                            </div>
                        </div>
                    }

                    {job &&
                        <div className="row mb-5 pt-4" key={job.company}>
                            <div className="col-12 mb-4">
                                <div className="d-flex w-100 justify-content-between align-items-end mb-4">
                                {periods.length &&  
                                    <h4>{ periods[showPeriod] ? periods[showPeriod].alias : periods[showPeriod].startDate + ' - ' + periods[showPeriod].endDate }</h4>
                                }

                                    <select className="form-control custom-select mb-2" style={{ width: 200 }} onChange={this.handleShowPeriod} value={showPeriod}>
                                        {periods.length && periods.map((period, i) => {
                                            return (
                                                <option key={period.id} value={period.order}>{period.alias}</option>
                                            )
                                        })}
                                        {!periods.length &&
                                            <option value="-1">No periods</option>
                                        }
                                    </select>
                                </div>

                                {periods.length ?
                                    <Progressbar progress={this.getProgress(periods[showPeriod].startDate, periods[showPeriod].endDate)} />
                                    : "Create a pay period to gert started"
                                }
                            </div>
                            
                            <div className="col-12 col-md-6">
                                <div className="row">

                                    <div className="col-12 col-lg-6 mb-4">
                                        <CollapsibleCard headerText="Logged hours" bodyText={ this.getPeriodHours("true") + ' hours'} />
                                    </div>

                                    <div className="col-12 col-lg-6 mb-4">
                                        <CollapsibleCard headerText="Calculated earnings" bodyText={ this.getSalary("true") } />
                                    </div>

                                    <div className="col-12">
                                        <LoggedHours hours={periodHours} onViewAddHours={this.props.onViewAddHours}/>
                                    </div>

                                </div>
                            </div>

                            <div className="col-12 col-md-6">
                                <div className="row">

                                    <div className="col-12 col-lg-6 mb-4">
                                        <CollapsibleCard headerText="Scheduled hours" bodyText={ this.getPeriodHours("false") + ' hours'} />
                                    </div>

                                    <div className="col-12 col-lg-6 mb-4">
                                        <CollapsibleCard headerText="Potential earnings" bodyText={ this.getSalary("false") } />
                                    </div>

                                    <div className="col-12">
                                        <ScheduledHours hours={periodHours} onViewAddHours={this.props.onViewAddHours} />
                                    </div>

                                </div>
                            </div>

                        </div>
                    }

                </div>
            </div>
        );
    }
}

export default connect((state, ownProps) => ({
    job: Object.values(state.jobs).filter(x => x.id === ownProps.jobId),
    periods: Object.values(state.payPeriods).filter(x => x.jobId === ownProps.jobId),
    hourLogs: Object.values(state.hourLogs).filter(x => x.jobId === ownProps.jobId),
}), {

})(Job);
