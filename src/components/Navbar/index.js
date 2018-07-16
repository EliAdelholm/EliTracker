import React from 'react';

class Navbar extends React.Component {

    render() {
        const onBackClick = this.props.onBackClick

        return (
                <div className="container-fluid bg-contrast" style={{height: 60}}>
                    {onBackClick && 
                        <span onClick={onBackClick}>
                            <i className="fas fa-arrow-circle-left text-accent" style={{ fontSize: 40, marginTop: 10 }}></i>
                        </span>
                    }
                </div>
        );
    }
}

export default Navbar;

