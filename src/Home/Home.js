import React, {Component} from 'react';
import '../App.css'

const SetTimer = () => (
    <div className="timer-container">
        <h1>Break Time</h1>
        <div>
            <button><i className="fas fa-minus"/></button>
            <span>5</span>
            <button><i className="fas fa-plus"/></button>
        </div>
    </div>

)

class Home extends Component {
    render() {

        return (
            <div><SetTimer/></div>
        )
    }
}

export default Home;
