import React, { Component } from 'react'
import moment from 'moment'

import Navbar from '../../components/Navbar'
import Jumbotron from '../../components/Jumbotron'
import Progressbar from '../../components/Progressbar'

import ListItem from './listItem'

class GradeTracker extends Component {
    state = {
        program: {
            startDate: "2017-09-01",
            endDate: "2019-01-31"
        },
        grades: [
            { id: 1, course: "Web Development", program: "BA in Web Development", semester: "1st Semester", date: "2017-10-15", grade: 12 },
            { id: 2, course: "Interface Design", program: "BA in Web Development", semester: "1st Semester", date: "2017-12-21", grade: 10 },
            { id: 3, course: "Databases", program: "BA in Web Development", semester: "1st Semester", date: "2018-01-18", grade: 12 }
        ]
    };

    getAverage() {
        let grades = []
        this.state.grades.map((grade, i) => {
            return grades.push(grade.grade)
        })
        let sum = grades.reduce((previous, current) => current += previous);
        let avg = sum / grades.length;
        return avg.toFixed(2);
    }

    getProgress = () => {
        let program = this.state.program;
        let periodInDays = moment(program.endDate).diff(moment(program.startDate), 'days')
        let progressInDays = moment().diff(moment(program.startDate), 'days')
        let progressinPercent = Math.round(progressInDays / periodInDays * 100);

        return progressinPercent + "%";
    }

    render() {
        let { grades } = this.state;
        this.getProgress()

        return (
            <div>
                <Navbar />
                <Jumbotron title="Grade Tracker" text="This component will track my grades and calculate an average." />
                
                <div className="container">
                    <div className="row">
                        <div className="col-12 mb-4">
                            <div className="d-flex w-100 justify-content-between mb-2">
                                <h3>BA in Web Development</h3>
                                <button className="btn btn-info" type="submit">Add Grade</button>
                            </div>

                            <Progressbar progress={this.getProgress()} />
                            
                        </div>
                        <div className="col-12 col-md-6">

                            <div className="list-group">
                                <li className="list-group-item list-group-item-action flex-column align-items-start bg-dark text-white">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h4 className="mb-1">Recorded Grades</h4>
                                    </div>

                                </li>

                                {grades && grades.map((grade, i) => {
                                    return (
                                        <ListItem key={grade.id} grade={grade} />
                                    )
                                })}

                                
                            </div>
                        </div>

                        <div className="col-12 col-md-6">

                            <div className="card">
                                <div className="card-header bg-dark text-white">
                                    <h4 className="mb-1">Current Average</h4>
                                </div>
                                <div className="card-body">
                                    <h2 className="display-1">{this.getAverage()}</h2>
                                </div>
                                <div className="card-footer text-muted">
                                    2 days ago
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default GradeTracker;
