import React, {Component} from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import MyProjects from './MyProjects'
import AddProject from './AddProject'
import FacultyApplications from './FacultyApplications'
import FacultyFaq from './FacultyFaq'
import './components.css'

class FacultyDiv extends Component {
    state = {
        tab: 0
    };

    handleTabClick = (event, value) => {
        this.setState({tab: value});
    };

    render() {
        return (
            <div className="main-working-div-paper">
                <AppBar position="static" style={{'background-color': '#5770EA'}}>
                    <Tabs value={this.state.tab} onChange={this.handleTabClick}>
                        <Tab label="My Projects" />
                        <Tab label="+New Project" />
                        <Tab label="Applications" />
                        <Tab label="FAQ" />
                    </Tabs>
                </AppBar>
                {this.state.tab === 0 && <MyProjects pageHandler={this.props.pageHandler} />}
                {this.state.tab === 1 && <AddProject pageHandler={this.props.pageHandler} />}
                {this.state.tab === 2 && <FacultyApplications pageHandler={this.props.pageHandler} />}
                {this.state.tab === 3 && <FacultyFaq pageHandler={this.props.pageHandler} />}
            </div>
        )
    }
}

export default FacultyDiv;