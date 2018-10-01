import React, {Component} from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import './components.css'

class AcademicYearDiv extends Component {
    state = {
        tab: 0
    };

    handleTabClick = (event, value) => {
        this.setState({tab: value});
    };

    render() {
        return (
            <div className="main-working-div-paper">
                <AppBar position="static" style={{'background-color': '#F55A05'}}>
                    <Tabs value={this.state.tab} onChange={this.handleTabClick}>
                        <Tab label="My Profile" />
                        <Tab label="Projects" />
                        <Tab label="My Applications" />
                        <Tab label="FAQ" />
                    </Tabs>
                </AppBar>
            </div>
        )
    }
}

export default AcademicYearDiv;