import React, {Component} from 'react'
import './components.css'

class AdminDiv extends Component {
    state = {
        tab: 0
    };

    handleTabClick = (event, value) => {
        this.setState({tab: value});
    };

    componentDidMount() {

    }

    render() {
        return (
            <div id="admin-div">

            </div>
        )
    }
}

export default AdminDiv;