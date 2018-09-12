import React from 'react'
import NavMain from './NavMain'
import AcademicYearDiv from './AcademicYearDiv'
import CurisDiv from './CurisDiv'
import FacultyDiv from './FacultyDiv'

class MainDiv extends React.Component {
    state = {
        page: 'NavMain'
    };

    pageHandler = (pageName) => {
        this.setState({
            page: pageName
        });
    }

    render() {
        switch (this.state.page) {
            case 'NavMain':
                return (<div><NavMain pageHandler={this.pageHandler} /></div>);
                break;
            case 'academic_year_research':
                return (<div><AcademicYearDiv pageHandler={this.pageHandler} /></div>);
                break;
            case 'curis':
                return (<div><CurisDiv pageHandler={this.pageHandler} /></div>);
                break;
            case 'projects':
                return (<div><FacultyDiv pageHandler={this.pageHandler} /></div>);
                break;
            default:
                return (<div><NavMain pageHandler={this.pageHandler} /></div>);
                break;
        }
    }
}

export default MainDiv;