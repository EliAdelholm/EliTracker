import React, { Component } from 'react';

class Progressbar extends Component {


    render() {
        let { progress } = this.props;

        return (
            <div className="progress bg-content" style={{ height: 25 }}>
                <div className="progress-bar progress-bar-striped bg-accent" role="progressbar" style={{ width: progress, ariaValuenow: 50, ariaValuemin: 0, ariaValuemax: 100 }}>
                    {progress}
                </div>
            </div>
        );
    }
}

export default Progressbar;
