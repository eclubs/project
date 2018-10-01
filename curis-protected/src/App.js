import React, { Component } from 'react';
import NavBar from './components/NavBar';
import MainDiv from './components/MainDiv';
import UnderDevelopment from './components/UnderDevelopment';
import './App.css';

class App extends Component {
    state = {
        user: {
            id: 0,
            name: '',
            sunetid: '',
            suid: '',
            type: '',
            email: '',
            webpage: '',
            interestarea: '',
            major: '',
            gpa: 0,
            year: '',
            transcript: '',
            resume: '',
            admin: false
        }
    };

    componentDidMount() {
        fetch('/protected/index.php/Csresearch/current_user')
            .then(response => response.json())
            .then(data => this.setState({user: data.user}))
            .catch(error => console.error('Error:', error));
    }

    render() {
        return (
            <div className="App">
                <NavBar user={this.state.user}/>
                {this.state.user.sunetid === 'llao'
                    || this.state.user.sunetid === 'plevis'
                    || this.state.user.sunetid === 'mbernst'
                    ? <MainDiv /> : <UnderDevelopment />}
            </div>
        );
    }
}

export default App;



