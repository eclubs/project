import React, { Component } from 'react';
import NavBar from './components/NavBar';
import LandingPaper from './components/LandingPaper';
//import CourseList from './components/CourseList'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <LandingPaper />
      </div>
    );
  }
}

export default App;
