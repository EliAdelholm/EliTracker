import React, { Component } from 'react'
import moment from 'moment'

// Global components
import Navbar from '../../../components/Navbar'
import Jumbotron from '../../../components/Jumbotron'

class AddJob extends Component {
    state = { company: '', position: '', startDate: moment().format("YYYY-MM-DD"), endDate: '', rate: 0, deduction: 0 }

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
        let { company, position, startDate, endDate, rate, deduction } = this.state;

        return (
            <div>
                <Navbar onBackClick={this.props.onBack} />
                <Jumbotron title="Add Job" text="Add your job to start tracking your work"/>

                <div className="container">
                    <div className="row">
                        <form className="col-12">
                            <div className="row">
                                <div className="form-group col-12 col-sm-6">
                                    <label>Company</label>
                                    <input type="text" className="form-control" name="company" value={company} onChange={this.handleInput} />
                                </div>
                                <div className="form-group col-12 col-sm-6">
                                    <label>Position</label>
                                    <input type="text" className="form-control" name="position" value={position} onChange={this.handleInput} />
                                </div>
                                <div className="form-group col-12 col-sm-6">
                                    <label>Start Date</label>
                                    <input type="date" className="form-control" name="startDate" value={startDate} onChange={this.handleInput} />
                                </div>
                                <div className="form-group col-12 col-sm-6">
                                    <label>End Date</label>
                                    <input type="date" className="form-control" name="endDate" value={endDate} onChange={this.handleInput} />
                                </div>
                                <div className="form-group col-12 col-sm-6">
                                    <label>Rate</label>
                                    <input type="number" className="form-control" name="rate" value={rate} onChange={this.handleInput} />
                                </div>
                                <div className="form-group col-12 col-sm-6">
                                    <label>Deduction</label>
                                    <input type="number" className="form-control" name="deduction" value={deduction} onChange={this.handleInput} />
                                </div>
                                <div className="form-group col-12">
                                    <button type="button" className="btn btn-accent float-right" onClick={this.handleSubmit}>Add Job</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddJob;
