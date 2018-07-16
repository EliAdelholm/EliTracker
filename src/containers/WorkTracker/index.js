// Dependencies
import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as WorkActions from '../../actions/workActionCreator'

import JobList from './JobList/jobList'
import AddJob from './JobList/addJob'
import Job from './Job/job'
import AddHours from './Job/addHours'

class WorkTracker extends Component {
    state = { view: 'Loading', jobId: null }

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

    handleViewAddHours = () => {
        this.setState({view: 'AddHours'})
    }


    render() {
        let {view, jobId} = this.state

        return (
            <div id="work-tracker">
                {view === 'JobList' &&
                    <JobList onAddJob={this.handleAddJob} onViewJob={this.handleViewJob}/>
                }

                {view === 'AddJob' &&
                    <AddJob onBack={this.handleViewList}/>
                }

                {view === 'Job' && jobId &&
                    <Job jobId={jobId} onBack={this.handleViewList} onViewAddHours={this.handleViewAddHours}/>
                }

                {view === 'AddHours' && jobId &&
                    <AddHours onBack={this.handleViewJob} jobId={jobId} onSubmit={this.handleAddHours}/>
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
