import React from 'react'
import NavMain from './NavMain'
import AcademicYearDiv from './AcademicYearDiv'
import CurisDiv from './CurisDiv'
import FacultyDiv from './FacultyDiv'
import AdminDiv from './AdminDiv'

class MainDiv extends React.Component {
    state = {
        page: 'NavMain'
    };

    pageHandler = (pageName) => {
        this.setState({
            page: pageName
        });
    };

    render() {
        switch (this.state.page) {
            case 'NavMain':
                return (<div><NavMain pageHandler={this.pageHandler} /></div>);
            case 'academic_year_research':
                return (<AcademicYearDiv pageHandler={this.pageHandler} />);
            case 'curis':
                return (<CurisDiv pageHandler={this.pageHandler} />);
            case 'projects':
                return (<FacultyDiv pageHandler={this.pageHandler} />);
            case 'admin':
                return (<AdminDiv pageHandler={this.pageHandler} />);
            default:
                return (<div><NavMain pageHandler={this.pageHandler} /></div>);
        }
    }
}

export default MainDiv;