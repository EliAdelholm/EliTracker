import React from 'react';
import { Link } from "react-router-dom";

class Navbar extends React.Component {

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link to="/" className="navbar-brand">EliTracker</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to="/work-tracker" className="nav-link" href="">Work Tracker</Link>
                            </li>
                            <li className="nav-item">
                                <Link to ="/grade-tracker" className="nav-link" href="">Grade Tracker</Link>
                            </li>
                            <li className="nav-item">
                                <Link to ="/assignment-tracker" className="nav-link" href="">Assignment Tracker</Link>
                            </li>
                            <li className="nav-item">
                                <Link to ="/goal-tracker" className="nav-link" href="">Goal Tracker</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;

