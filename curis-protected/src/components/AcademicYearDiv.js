import React, {Component} from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AcademicYearInfo from './AcademicYearInfo'

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
                <AppBar position="fixed" style={{backgroundColor: '#ffffff', color: '#000000', marginTop: 64}}>
                    <Tabs value={this.state.tab} onChange={this.handleTabClick}>
                        <Tab label="Home" />
                        <Tab label="Projects" />
                        <Tab label="My Applications" />
                        <Tab label="FAQ" />
                    </Tabs>
                </AppBar>
                {this.state.tab === 0 && <AcademicYearInfo />}
            </div>
        )
    }
}

export default AcademicYearDiv;