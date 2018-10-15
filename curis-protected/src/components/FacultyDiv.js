import React, {Component} from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import FacultyHome from './FacultyHome'
import FacultyMyProjects from './FacultyMyProjects'
import FacultyAddProject from './FacultyAddProject'
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
                <AppBar position="fixed" style={{backgroundColor: '#ffffff', color: '#000000', marginTop: 64}}>
                    <Tabs value={this.state.tab} onChange={this.handleTabClick}>
                        <Tab label="Home" />
                        <Tab label="My Projects" />
                        <Tab label="+New Project" />
                        <Tab label="Applications" />
                        <Tab label="FAQ" />
                    </Tabs>
                </AppBar>
                {this.state.tab === 0 && <FacultyHome pageHandler={this.props.pageHandler} />}
                {this.state.tab === 1 && <FacultyMyProjects pageHandler={this.props.pageHandler} />}
                {this.state.tab === 2 && <FacultyAddProject pageHandler={this.props.pageHandler} />}
                {this.state.tab === 3 && <FacultyApplications pageHandler={this.props.pageHandler} />}
                {this.state.tab === 4 && <FacultyFaq pageHandler={this.props.pageHandler} />}
            </div>
        )
    }
}

export default FacultyDiv;