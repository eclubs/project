import React, { Component } from 'react';
import NavBar from './components/NavBar';
import MainDiv from './components/MainDiv';
import './App.css';



class App extends Component {

    render() {
        return (
            <div className="App">
                <NavBar />
                <MainDiv />


            </div>
        );
    }
}

export default App;



