import React, {Component} from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import CurisInfo from './CurisInfo'
import StudentProfile from './StudentProfile'
import './components.css'

class CurisDiv extends Component {
    state = {
        tab: 0
    };

    handleTabClick = (event, value) => {
        this.setState({tab: value});
    };

    render() {
        return (
            <div className="main-working-div-paper">
                <AppBar position="static" style={{'background-color': '#589D57'}}>
                    <Tabs value={this.state.tab} onChange={this.handleTabClick}>
                        <Tab label="Home" />
                        <Tab label="My Profile" />
                        <Tab label="Projects" />
                        <Tab label="My Applications" />
                        <Tab label="FAQ" />
                    </Tabs>
                </AppBar>
                {this.state.tab === 0 && <CurisInfo />}
                {this.state.tab === 1 && <StudentProfile pageHandler={this.props.pageHandler} />}
            </div>
        )
    }
}

export default CurisDiv;