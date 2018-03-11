import React, { Component } from 'react';

class Jumbotron extends Component {


    render() {
        let { title, text } = this.props;

        return (
            <div className="jumbotron jumbotron-fluid bg-gradient mb-0">
                <div className="container">
                    <h1>{title}</h1>
                    <p>{text}</p>
                </div>
            </div>
        );
    }
}

export default Jumbotron;
