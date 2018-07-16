import React, { Component } from 'react'
import moment from 'moment'

class HoursListItem extends Component {


    render() {
        let { item, status } = this.props;

        return (
            <li className="list-group-item d-flex justify-content-between align-items-center bg-content text-dark">
                <p className="mb-0">
                    { moment(item.startTime).format("ddd DD MMM") } 
                    <small className="pl-2"> { moment(item.startTime).format("HH:mm") + " - " + moment(item.endTime).format('HH:mm') } </small>
                </p>
                
                {status === "logged" ?
                    <span>{parseFloat(item.hours).toFixed(2)} </span>
                    : <span style={{ fontSize: "25px" }}>
                        <span onClick={() => this.props.onDelete(item.id)}><i className="far fa-times-circle text-danger"></i> </span>
                        <i className="far fa-check-circle text-accent"></i>
                    </span>
                }
            </li>
        );
    }
}

export default HoursListItem;
