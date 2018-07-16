import React, { Component } from 'react';

class Jumbotron extends Component {


    render() {
        let { title, text } = this.props;

        return (
            <div className="jumbotron jumbotron-fluid bg-contrast py-4 mb-4">
                <div className="container">
                    <h2 className="text-accent">{title}</h2>
                    <h5>{text}</h5>
                </div>
            </div>
        );
    }
}

export default Jumbotron;
