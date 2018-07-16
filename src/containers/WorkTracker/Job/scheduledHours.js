// Dependencies
import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import * as WorkActions from '../../../actions/workActionCreator'

// Local components
import HoursListItem from './hoursListItem'

class ScheduledHours extends Component {
    state = { hours: [] }

    componentDidMount() {
        let scheduledHours = this.props.hours.filter(x => x.logged === 'false')
        let sortedDates = scheduledHours.sort(function(a, b){
            return moment(a.startTime).format('X')-moment(b.startTime).format('X')
        });

        this.setState({ hours: sortedDates })
    }

    getHours = () => {
        let scheduledHours = this.props.hours.filter(x => x.logged === 'false')
        let sortedDates = scheduledHours.sort(function(a, b){
            return moment(a.startTime).format('X')-moment(b.startTime).format('X')
        });

        return sortedDates
    }

    handleDeleteLog = async (id) => {
        const { onDeleteLog } = this.props
        await onDeleteLog(id)

        const hours = Object.assign(this.state.hours);
        hours.filter(x => x.id !== Number(id))
        console.log(hours)
        
        this.setState({hours: hours})
    }

    render() {
        return (
            <ul className="list-group mb-4">
                <li className="list-group-item flex-column align-items-start bg-contrast">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">Scheduled Hours</h5>
                        <span onClick={this.props.onViewAddHours}><i className="fas fa-calendar-plus text-accent" style={{ fontSize: "20pt" }}></i></span>
                    </div>
                </li>
                
                {this.state.hours.length ? this.state.hours.map((item, i) => {
                    return (
                        <HoursListItem key={item.id} item={item} status="scheduled" onDelete={this.handleDeleteLog}/>
                    )
                }) : <li className="list-group-item d-flex justify-content-between align-items-center bg-content">
                        <p className="mb-0">You have no scheduled hours for this period.</p>
                    </li>}

            </ul>          
        );
    }
}

export default connect((state) => ({
}), {
    onDeleteLog: WorkActions.deleteOneHourLog
})(ScheduledHours);