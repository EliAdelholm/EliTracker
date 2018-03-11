import React, { Component } from 'react'
import moment from 'moment'

class ListItem extends Component {


    render() {
        let { item, status } = this.props;

        return (
            <li className="list-group-item d-flex justify-content-between align-items-center bg-accent">
                <p className="mb-0">{moment(item.date).format("DD MMM")} <small className="pl-2"> {item.startTime + " - " + item.endTime} </small></p>
                {status === "logged" ?
                    <span>{parseFloat(item.hours).toFixed(2)} </span>
                    : <span style={{ fontSize: "20pt" }}><i class="far fa-times-circle"></i> <i class="far fa-check-circle"></i> </span>
                }
            </li>
        );
    }
}

export default ListItem;
