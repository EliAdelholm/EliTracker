import React, { Component } from 'react'
import moment from 'moment'

class Create extends Component {
    state = { date: moment().format("YYYY-MM-DD"), start: "09:00", end: "16:00" }

    handleInput = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        this.setState({
            [name]: value
        });

    }

    handleSubmit = () => {
        let item = this.state;
        console.log(item)
        this.props.onSubmit(item)
    }

    render() {
        let { date, start, end } = this.state;

        return (
            <div className="modal fade" id="logHoursModal" tabIndex="-1" role="dialog" aria-labelledby="logHoursModalTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-info border-bottom-0">
                            <h5 className="modal-title" id="exampleModalLongTitle">Log hours</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" style={{ color: "white" }}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body bg-accent">
                            <form>
                                <div className="form-group">
                                    <label>Date</label>
                                    <input type="date" className="form-control" name="date" value={date} onChange={this.handleInput} />
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-6">
                                        <label>Start</label>
                                        <input type="time" className="form-control" name="start" value={start} onChange={this.handleInput} />
                                    </div>
                                    <div className="form-group col-6">
                                        <label>End</label>
                                        <input type="time" className="form-control" name="end" value={end} onChange={this.handleInput} />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer bg-default">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-info" onClick={this.handleSubmit}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Create;
