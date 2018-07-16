import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import InputMoment from 'input-moment'
import 'input-moment/dist/input-moment.css'

// Global components
import Navbar from '../../../components/Navbar'
import Jumbotron from '../../../components/Jumbotron'

class AddHours extends Component {
    state = { 
        form: {
            jobId: this.props.jobId, 
            periodId: this.props.period, 
            startTime: moment().hours(8).minutes(30), 
            endTime: moment().hours(16).minutes(0), 
            logged: this.props.status
        },
        viewStartPicker: false,
        viewEndPicker: false,
        periods: null
    };

    componentDidMount() {
        console.log(this.props.status)
        this.setState({ periods: this.props.periods })
    }

    handleInput = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        this.setState({ 
            form: { ...this.state.form, [name]: value}
        });
    }

    toggleDatePicker = (e) => {
        const name = e.target.name;
        this.setState({ [name]: !this.state[name] })
    }

    handleChange = m => {
        let startTimeDate = this.state.form.startTime.date()
        let endDate = this.state.form.endTime

        if(m.date() === startTimeDate) {
            endDate.date(startTimeDate)
        }
        
        this.setState({  m, form: { ...this.state.form, endTime: endDate} });
    };

    handleSubmit = () => {
        let item = Object.assign(this.state.form);

        // TODO: Proper Validation
        if (item.periodId !== "") {
            this.props.onSubmit(item)
        }
    }

    render() {
        let { jobId, periodId, startTime, endTime, logged } = this.state.form;

        return (
            <div>
                <Navbar onBackClick={() => this.props.onBack(jobId)} />
                <Jumbotron title="Add Hours" text="Add your work hours to get accurate salary calculations"/>

                <div className="container">
                    <div className="row">
                        <form className="col-12">
                            <div className="row">
                                <div className="form-group col-12 col-sm-6">
                                    <label>Choose period</label>
                                    <select className="form-control" name="periodId" value={periodId} onChange={this.handleInput} required>
                                        <option value="">No period selected</option>
                                        {this.state.periods && this.state.periods.map((item, i) => {
                                            return (
                                                <option value={item.id} key={i}>{ item.alias }</option>
                                            )
                                        })}
                                    </select>
                                </div>

                                <div className="form-group col-12 col-sm-6">
                                    <label>Choose log type</label>
                                    <select className="form-control" name="logged" value={logged} onChange={this.handleInput}>
                                        <option value="true">Logged</option>
                                        <option value="false">Scheduled</option>
                                    </select>
                                </div>

                                <div className="form-group col-12 col-md-6">
                                    <label>Start Time</label>
                                    <div className="input-group">
                                        <input type="text" className="form-control" value={startTime.format("Do MMMM HH:mm")} style={{background: 'white'}} readOnly />
                                        <div className="input-group-append">
                                            <button className="btn btn-accent" type="button" name="viewStartPicker" onClick={this.toggleDatePicker}>
                                                <i className="far fa-calendar-alt"></i>
                                            </button>
                                        </div>
                                    </div>

                                    {this.state.viewStartPicker &&
                                        <InputMoment
                                            className="bg-content float-right"
                                            moment={startTime}
                                            onChange={this.handleChange}
                                            minStep={5}
                                            prevMonthIcon="fas fa-arrow-left"
                                            nextMonthIcon="fas fa-arrow-right"
                                        />
                                    }
                                </div>

                                <div className="form-group col-12 col-md-6">
                                    <label>End Time</label>
                                    <div className="input-group">
                                        <input type="text" className="form-control" value={endTime.format("Do MMMM HH:mm")} style={{background: 'white'}} readOnly />
                                        <div className="input-group-append">
                                            <button className="btn btn-accent" type="button" name="viewEndPicker" onClick={this.toggleDatePicker}>
                                                <i className="far fa-calendar-alt"></i>
                                            </button>
                                        </div>
                                    </div>
                                
                                    {this.state.viewEndPicker &&
                                        <InputMoment
                                            className="bg-content float-right"
                                            moment={endTime}
                                            onChange={this.handleChange}
                                            onSave={this.handleSave}
                                            minStep={5}
                                            prevMonthIcon="fas fa-arrow-left"
                                            nextMonthIcon="fas fa-arrow-right"
                                        />
                                    }
                                </div>

                                <div className="form-group col-12">
                                    <button type="button" className="btn btn-accent float-right" onClick={this.handleSubmit}>Add Hours</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state, ownProps) => ({
    periods: Object.values(state.payPeriods).filter(x => x.jobId === ownProps.jobId)
}), {

})(AddHours);
