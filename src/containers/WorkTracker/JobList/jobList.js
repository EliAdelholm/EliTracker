// Dependencies
import React, { Component } from 'react'
import { connect } from 'react-redux'

// Global components
import Navbar from '../../../components/Navbar'
import Jumbotron from '../../../components/Jumbotron'

class JobList extends Component {
    state = {
        jobs: [],
    };

    componentDidMount() {
        const jobs = this.props.jobs;
        return this.setState({ jobs: jobs })
    }

    render() {
        const jobs = this.state.jobs;

        return (
            <div>
                <Navbar />
                <Jumbotron title="Welcome" text="Student Web Developer"/>

                <div className="container">
                    <div className="row">
                        <div className="col-12 mb-4">
                            <h4>My Jobs</h4>
                        </div>

                        {jobs && jobs.map((job, i) => { return (
                            <div className="card col-sm-6 col-lg-4 col-xl-3 mb-4" key={job.id}>
                                <div className="card-header bg-contrast">
                                    {job.company}
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item bg-content">{ job.position }</li>
                                    <li className="list-group-item bg-content">{ job.startDate } - { job.endDate ? job.endDate : 'now'}</li>
                                    <li className="list-group-item bg-content">{ job.rate / 100 } DKK/hour</li>
                                    <li className="list-group-item bg-accent text-center" onClick={() => this.props.onViewJob(job.id)}>View</li>
                                </ul>
                            </div>
                        )})}

                        <div className="card col-sm-6 col-lg-4 col-xl-3 mb-4" style={{minHeight: 244}} onClick={this.props.onAddJob}>
                            <div className="card-body flex-center bg-accent">
                                <i className="fas fa-plus-square mb-3" style={{ fontSize: "35pt" }}></i>
                                <h5>Add Job</h5>
                            </div>
                        </div>
                    </div>

                </div>

                                
            </div>
        );
    }
}

// export default WorkTracker;
export default connect((state) => ({
    jobs: Object.values(state.jobs),
}), {

})(JobList);
