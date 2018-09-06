import React, { Component } from 'react'
import './components.css'

class NavMainCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <div className="nav-main-card" onClick={() => this.props.pageHandler(this.props.id)}>
                    <img src={this.props.image}/>
                    <div><span>{this.props.text}</span></div>
                </div>
            </React.Fragment>
        );
    }
}

export default NavMainCard;