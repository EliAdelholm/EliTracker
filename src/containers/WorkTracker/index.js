// Dependencies
import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as WorkActions from '../../actions/workActionCreator'

import JobList from './JobList/jobList'
import AddJob from './JobList/addJob'
import Job from './Job/job'
import AddHours from './Job/addHours'

class WorkTracker extends Component {
    state = { view: 'Loading', jobId: null, addHourPeriod: null, addHourStatus: null }

    async componentDidMount() {
        const { onRequestJobs, onRequestPayPeriods, onRequestHourLogs } = this.props

        try {
            await onRequestJobs()
            await onRequestPayPeriods()
            await onRequestHourLogs()

            this.setState({view: 'JobList'})

        } catch (err) {
            console.error("ERROR: ", err)
            return
        }
    }

    handleAddHours = async (hourLog) => {
        const { onAddHours } = this.props
        await onAddHours(hourLog)
        this.setState({view: 'Job'})
    }

    handleAddJob = () => {
        this.setState({view: 'AddJob'})
    }

    handleViewList = () => {
        this.setState({ view: 'JobList'})
    }

    handleViewJob = (id) => {
        this.setState({ view: 'Job', jobId: id })
    }

    handleViewAddHours = (period, status) => {
        this.setState({view: 'AddHours', addHourPeriod: period, addHourStatus: status})
    }


    render() {
        let {view, jobId, addHourPeriod, addHourStatus} = this.state

        return (
            <div id="work-tracker">
                {view === 'JobList' &&
                    <JobList onAddJob={this.handleAddJob} onViewJob={this.handleViewJob}/>
                }

                {view === 'AddJob' &&
                    <AddJob onBack={this.handleViewList}/>
                }

                {view === 'Job' && jobId &&
                    <Job jobId={jobId} onBack={this.handleViewList} onViewAddHours={(period, status) => this.handleViewAddHours(period, status)}/>
                }

                {view === 'AddHours' && jobId &&
                    <AddHours onBack={this.handleViewJob} jobId={jobId} period={addHourPeriod} status={addHourStatus} onSubmit={this.handleAddHours}/>
                }
            </div>
        );
    }
}

export default connect((state) => ({
}), {
    onRequestJobs: WorkActions.fetchJobs,
    onRequestPayPeriods: WorkActions.fetchPayPeriods,
    onRequestHourLogs: WorkActions.fetchHourLogs,
    onAddHours: WorkActions.addNewHourLog
})(WorkTracker);
