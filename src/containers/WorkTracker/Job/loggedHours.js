// Dependencies
import React, { Component } from 'react'

// Local components
import HoursListItem from './hoursListItem'

class LoggedHours extends Component {

    getHours = () => {
        return this.props.hours.filter(x => x.logged === 'true')
    }

    render() {

        return (
            <ul className="list-group mb-4">
                <li className="list-group-item flex-column align-items-start bg-contrast">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">Logged Hours</h5>
                        <span onClick={this.props.onViewAddHours}><i className="fas fa-calendar-plus text-accent" style={{ fontSize: "20pt" }}></i></span>
                    </div>
                </li>
                
                {this.getHours().length ? this.getHours().map((item, i) => {
                    return (
                        <HoursListItem key={item.id} item={item} status="logged" />
                    )
                }) : <li className="list-group-item d-flex justify-content-between align-items-center bg-content">
                        <p className="mb-0">You have not logged any hours for this period.</p>
                    </li>}

                <li className="list-group-item bg-accent">
                    <p className="mb-0 text-center">View Calculation</p>
                </li>
            </ul>          
        );
    }
}

export default LoggedHours