import React, { Component } from 'react'
import moment from 'moment'

class ListItem extends Component {


    render() {
        let { grade } = this.props;

        return (
            <li className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1"> {grade.course} </h5>
                    <h5><span className="badge badge-dark badge-pill"> {grade.grade} </span></h5>
                </div>
                <p className="mb-1"> {grade.program + ", " + grade.semester} </p>
                <small> {moment(grade.date).format('DD MMM YYYY')} </small>
            </li>
        );
    }
}

export default ListItem;
