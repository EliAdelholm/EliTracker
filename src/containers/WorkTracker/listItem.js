import React, { Component } from 'react'
import moment from 'moment'

class ListItem extends Component {


    render() {
        let { item } = this.props;

        return (
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <p className="mb-0">{moment(item.date).format("DD MMM YYYY")} <small> {item.from + " - " + item.to} </small></p>
                <span className="">{parseFloat(item.hours).toFixed(2)} </span>
            </li>
        );
    }
}

export default ListItem;
