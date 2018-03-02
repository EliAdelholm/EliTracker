import React, { Component } from 'react';

class Jumbotron extends Component {


    render() {
        let { title, text } = this.props;

        return (
            <div className="jumbotron jumbotron-fluid bg-main text-white">
                <div className="container">
                    <h1 className="display-4">{title}</h1>
                    <p className="lead">{text}</p>
                </div>
            </div>
        );
    }
}

export default Jumbotron;
