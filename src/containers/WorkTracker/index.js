// Dependencies
import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'

import * as WorkActions from '../../actions/workActionCreator';

// Global components
import Navbar from '../../components/Navbar'
import Jumbotron from '../../components/Jumbotron'
import Progressbar from '../../components/Progressbar'

// Local components
import Create from './create'
import ListItem from './listItem'

class WorkTracker extends Component {
    state = {
        settings: {
            rate: 135,
            tax: 0.36
        },
        scheduled: [
            { id: 6, date: "2018-03-07", from: "09:00", to: "16:00", hours: 7, rate: 135 },
            { id: 7, date: "2018-03-12", from: "09:00", to: "16:00", hours: 7, rate: 135 },
            { id: 8, date: "2018-03-14", from: "09:00", to: "16:00", hours: 7, rate: 135 },
            { id: 9, date: "2018-03-19", from: "09:00", to: "16:00", hours: 7, rate: 135 },
            { id: 10, date: "2018-03-21", from: "09:00", to: "16:00", hours: 7, rate: 135 },
            { id: 11, date: "2018-03-26", from: "09:00", to: "16:00", hours: 7, rate: 135 },
            { id: 12, date: "2018-03-28", from: "09:00", to: "16:00", hours: 7, rate: 135 },
        ],
        hours: [
            { id: 1, date: "2018-02-19", from: "09:00", to: "16:00", hours: 7, rate: 135 },
            { id: 2, date: "2018-02-21", from: "09:00", to: "16:30", hours: 7.5, rate: 135 },
            { id: 3, date: "2018-02-26", from: "09:00", to: "16:15", hours: 7.25, rate: 135 },
            { id: 4, date: "2018-02-28", from: "08:30", to: "13:30", hours: 5, rate: 135 },
            { id: 5, date: "2018-03-05", from: "08:30", to: "16:45", hours: 8.25, rate: 135 },
        ],
        hourLog: {
            "February 2018": {
                period: "February 2018",
                start: "2018-01-16",
                end: "2018-02-15",
                tax: 0.36,
                hours: [
                    { id: 1, date: "2018-01-19", from: "09:00", to: "15:30", hours: 6.5, rate: 135 },
                    { id: 2, date: "2018-01-22", from: "09:00", to: "15:30", hours: 6.5, rate: 135 },
                    { id: 3, date: "2018-01-23", from: "09:00", to: "14:30", hours: 5.5, rate: 135 },
                    { id: 4, date: "2018-01-24", from: "09:00", to: "15:30", hours: 6.5, rate: 135 },
                    { id: 5, date: "2018-01-26", from: "09:00", to: "16:00", hours: 7, rate: 135 },
                    { id: 6, date: "2018-01-29", from: "09:00", to: "16:00", hours: 7, rate: 135 },
                    { id: 7, date: "2018-01-30", from: "09:00", to: "16:00", hours: 7, rate: 135 },
                    { id: 8, date: "2018-01-31", from: "09:00", to: "16:00", hours: 7, rate: 135 },
                    { id: 9, date: "2018-02-05", from: "09:00", to: "15:00", hours: 6, rate: 135 },
                    { id: 10, date: "2018-02-06", from: "09:00", to: "16:00", hours: 7, rate: 135 },
                    { id: 11, date: "2018-02-07", from: "08:45", to: "15:45", hours: 7, rate: 135 },
                    { id: 12, date: "2018-02-12", from: "09:45", to: "16:00", hours: 7.25, rate: 135 },
                    { id: 13, date: "2018-02-14", from: "09:00", to: "16:45", hours: 6.75, rate: 135 }
                ]
            },
            "March 2018": {
                period: "March 2018",
                start: "2018-02-16",
                end: "2018-03-15",
                tax: 0.36,
                hours: [
                    { id: 1, date: "2018-02-19", from: "09:00", to: "16:00", hours: 7, rate: 135 },
                    { id: 2, date: "2018-02-21", from: "09:00", to: "16:30", hours: 7.5, rate: 135 },
                    { id: 3, date: "2018-02-26", from: "09:00", to: "16:15", hours: 7.25, rate: 135 }
                ]
            },
        }
    };

    async componentDidMount() {
        const { onRequestWork } = this.props

        try {
            await onRequestWork();

        } catch (err) {
            console.error(err);
        }
        this.getPeriod()
    }

//     async componentDidMount() {
//         const {onRequestRestaurants, onRequestUserData, onRequestAllRestaurantTables} = this.props;

//         try {
//             await onRequestUserData();
//             await onRequestAllRestaurantTables();
//             await onRequestRestaurants();

//         } catch (err) {
//             console.error(err);
//         }

//         const [user] = this.props.user;
//         const {restaurants} = this.props;
//         this.setState({
//             isWaitingFor: user.acf.waiting_for,
//             favourites: user.acf.favourites,
//             restaurants: restaurants,
//             restaurantsPrice: restaurants.slice(),
//             restaurantsAZ: restaurants.slice(),
//             restaurantsNearby: restaurants.slice(),
//             activeFilter: position? "Nearby" : "A-Z",
//         })
// }


    getPeriod = () => {
        let dayOfMonth = moment().format("D");
        let month = parseInt(moment().format("M"), 10)
        let year = moment().format("YYYY");

        if (dayOfMonth >= 15) {
            let nextMonth = month + 1;
            let startDate = moment(year + "-" + month + "-16", "YYYY-M-DD").format("YYYY-MM-DD");
            let endDate = moment(year + "-" + nextMonth + "-15", "YYYY-M-DD").format("YYYY-MM-DD");

            this.setState({ startDate: startDate, endDate: endDate })

        } else {
            let lastMonth = month - 1;
            let endDate = moment(year + "-" + month + "-15", "YYYY-M-DD").format("YYYY-MM-DD");
            let startDate = moment(year + "-" + lastMonth + "-16", "YYYY-M-DD").format("YYYY-MM-DD");

            this.setState({ startDate: startDate, endDate: endDate })
        }
        // TODO: account for years overlapping

    }

    getProgress = () => {
        let periodInDays = moment(this.state.endDate).diff(moment(this.state.startDate), 'days')
        let progressInDays = moment().diff(moment(this.state.startDate), 'days')
        let progressinPercent = Math.round(progressInDays / periodInDays * 100);

        return progressinPercent + "%";
    }

    getSalary() {
        let salary = 0;
        this.state.hours.map((log, i) => {
            return salary += (log.hours * log.rate);
        })

        let tax = (salary * this.state.settings.tax);
        return parseFloat(salary - tax).toFixed(2)
    }

    handleAddHours = (item) => {
        let object = {id: 9, date: item.date, from: item.start, to: item.end, hours: 7, rate: item.rate}
        this.setState({scheduled: [...this.state.scheduled, object]})
    }

    render() {
        let { hours, scheduled, endDate, startDate, settings } = this.state;


        return (
            <div>
                <Navbar />
                <Jumbotron title="Work Tracker" text="This component will track my work hours and calculate my salary." />

                <div className="container">
                    <div className="row">

                        <div className="col-12 mb-4">
                            <div className="d-flex w-100 justify-content-between align-items-end mb-2">
                                <h3>Student Web Developer at Mybanker</h3>
                                <select className="form-control mb-2" style={{width: 200}}>
                                    <option>March 2018</option>
                                    <option>February 2018</option>
                                </select>

                            </div>

                            {endDate && startDate &&
                                <Progressbar progress={this.getProgress()} />
                            }

                        </div>

                        <div className="col-12 col-md-6">

                            <ul className="list-group mb-4">
                                <li className="list-group-item flex-column align-items-start bg-main text-white">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h4 className="mb-1">Scheduled Hours</h4>
                                        <i className="fas fa-calendar-plus" style={{ fontSize: "20pt" }} data-toggle="modal" data-target="#logHoursModal"></i>
                                    </div>

                                </li>
                                {scheduled && scheduled.map((item, i) => {
                                    return (
                                        <ListItem key={item.id} item={item} />
                                    )
                                })}
                            </ul>

                            <ul className="list-group mb-4">
                                <li className="list-group-item flex-column align-items-start bg-main text-white">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h4 className="mb-1">Logged Hours</h4>
                                        <i className="fas fa-calendar-plus" style={{ fontSize: "20pt" }} data-toggle="modal" data-target="#logHoursModal"></i>
                                    </div>


                                </li>
                                {hours && hours.map((logItem, i) => {
                                    return (
                                        <ListItem key={logItem.id} item={logItem} />
                                    )
                                })}
                            </ul>

                        </div>

                        <div className="col-12 col-md-6">
                            <div className="card">
                                <div className="card-header d-flex w-100 justify-content-between bg-main text-white">
                                    <h4 className="mb-1">Upcoming Salary</h4>
                                    <i className="fas fa-calculator" style={{ fontSize: "20pt" }}></i>
                                </div>
                                <div className="card-body">
                                    <h3 className="display-3">{this.getSalary()}</h3>
                                </div>
                                <div className="card-footer text-muted">
                                    {startDate && moment(startDate).format('DD MMM YYYY')} - {endDate && moment(endDate).format('DD MMM YYYY')}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <Create rate={settings.rate} onSubmit={this.handleAddHours} />
            </div>
        );
    }
}

// export default WorkTracker;
export default connect((state) => ({
    jobs: Object.values(state.jobs),
}), {
    onRequestWork: WorkActions.fetchWorkData,
})(WorkTracker);
