import React, { Component } from 'react';

class CollapsibleCard extends Component {
    state = { collapsed: false, icon: "fa-angle-up" }

    toggleCollapse = () => {
        let icon = !this.state.collapsed ? "fa-angle-down" : "fa-angle-up"
        console.log(icon)
        this.setState({ collapsed: !this.state.collapsed, icon: icon })
    }

    render() {
        const { collapsed, icon } = this.state
        const { headerText, bodyText } = this.props
        console.log(collapsed)

        return (
            <div className="card">
                <div className="card-header d-flex w-100 pb-2 justify-content-between bg-contrast">
                    <h6>{ headerText }</h6>
                    <span className="text-accent d-lg-none" style={{ fontSize: 18 }} onClick={this.toggleCollapse}>
                    <i className={`fas ${icon} `}/>
                    </span>
                </div>

                {!collapsed &&
                    <div className="card-body bg-content pb-0">
                        <p>{ bodyText }</p>
                    </div>
                }
            </div>
        );
    }
}

export default CollapsibleCard;

