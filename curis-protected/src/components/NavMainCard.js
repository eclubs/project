import React, { Component } from 'react'
import './components.css'

class NavMainCard extends Component {

    render() {
        return (
            <React.Fragment>
                <div className="nav-main-card" onClick={() => this.props.pageHandler(this.props.id)}>
                    <img src={this.props.image} alt="{this.props.text}"/>
                    <div><span>{this.props.text}</span></div>
                </div>
            </React.Fragment>
        );
    }
}

export default NavMainCard;