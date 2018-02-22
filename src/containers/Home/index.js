import React, { Component } from 'react';
import Navbar from '../../components/Navbar'

class Home extends Component {

    render() {

        return (
            <div>
                <Navbar />
                <div className="jumbotron jumbotron-fluid bg-info text-white">
                    <div className="container">
                        <h1 className="display-4">Welcome Eli</h1>
                        <p className="lead">This is your personal life tracker - built by you just for you. Enjoy!</p>
                    </div>
                </div>
                <div className="container">
                    <div className="row">

                      

                    
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
