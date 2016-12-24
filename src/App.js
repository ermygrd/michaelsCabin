import React, {
    Component
} from 'react';
import logo from './logo.svg';
import {
    Navbar,
    Jumbotron,
    Button
} from 'react-bootstrap';
import './App.css';

class App extends Component {
    render() {
        return ( <
            div className = "App" >
            <
            div className = "App-header" >
            <
            img src = {
                logo
            }
            className = "App-logo"
            alt = "logo" / >
            <
            h2 > The Todd 's Hawaiian Vacation Rentals < /h2> < /
            div > <
            p className = "App-intro" >
            Welcome and take a look at our vatation rental condos and home. <
            /p> < /
            div >
        );
    }
}

export default App;
