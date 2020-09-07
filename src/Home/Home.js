import React, {Component} from 'react';
import '../App.css';
import './Style.css';


const SetTimer = (props) => (
    <div className="timer-container">
        <h1>{props.title}</h1>
        <div className="flex actions-wrapper">
            <button onClick={props.handleDecrease}>
                <i className="fas fa-minus"/>
            </button>
            <span>{props.count}</span>
            <button onClick={props.handleIncrease}>
                <i className="fas fa-plus"/>
            </button>
        </div>
    </div>

);

class Home extends Component {

    state = {
        breakCount: 5,
        sessionCount: 25,
        clockCount: 25 * 60,
        currentTimer: 'Session',
        isPlaying: false,
        loop: undefined
    };

    constructor(props) {
        super(props);
        this.loop = undefined;
    }


    componentWillUnmount() {
        clearInterval(this.loop)
    }

    handlePlayPause = () => {
        const {isPlaying} = this.state;
        if (isPlaying) {
            clearInterval(this.loop);
            this.setState({
                isPlaying: false
            })
        } else {
            this.setState({
                isPlaying: true
            });
            this.loop = setInterval(() => {
                const {clockCount, currentTimer, sessionCount, breakCount} = this.state;
                if (clockCount === 0) {
                    this.setState({
                        currentTimer: currentTimer === 'Session' ? 'Break' : 'Session',
                        clockCount: (currentTimer === 'Session') ? (breakCount * 60) : (sessionCount * 60)
                    })
                } else {
                    this.setState({
                        clockCount: clockCount - 1
                    })
                }

            }, 1000)
        }
    };
    handleReset = () => {
        this.setState({
            breakCount: 5,
            sessionCount: 25,
            clockCount: 25 * 60,
            currentTimer: 'Session',
            isPlaying: false,
        });
        clearInterval(this.loop)
    };


    convertToTime = (count) => {
        const minutes = Math.floor(count / 60);
        let seconds = count % 60;
        seconds = seconds < 10 ? ('0' + seconds) : seconds;
        return `${minutes}:${seconds}`
    };
    handleBreakDecrease = () => {
        const {breakCount} = this.state;
        if (breakCount > 0) {
            this.setState({
                breakCount: breakCount - 1
            })
        }
    };
    handleBreakIncrease = () => {
        const {breakCount} = this.state;
        this.setState({
            breakCount: breakCount + 1
        })
    };
    handleSessionDecrease = () => {
        const {sessionCount} = this.state;
        if (sessionCount > 0) {
            this.setState({
                sessionCount: sessionCount - 1
            })
        }
    };
    handleSessionIncrease = () => {
        const {sessionCount} = this.state;
        if(sessionCount <=60){
            this.setState({
                sessionCount: sessionCount + 1
            })
        }
    };

    render() {
        const {breakCount, sessionCount, clockCount, currentTimer, isPlaying} = this.state;
        const breakProps = {
            title: "Break Length",
            count: breakCount,
            handleDecrease: this.handleBreakDecrease,
            handleIncrease: this.handleBreakIncrease,
        };
        const sessionProps = {
            title: "Session Length",
            count: sessionCount,
            handleDecrease: this.handleSessionDecrease,
            handleIncrease: this.handleSessionIncrease,
        };


        return (
            <div>
                <div className="flex">
                    <SetTimer {...breakProps} />
                    <SetTimer {...sessionProps}/>
                </div>
                <div className={"clock-container"}>
                    <h1>{currentTimer}</h1>
                    <span>{this.convertToTime(clockCount)}</span>
                    <div className={"flex"}>
                        <button onClick={this.handlePlayPause}>
                            <i className={`fas fa-${isPlaying ? 'pause' : 'play'}`}/>
                        </button>
                        <button onClick={this.handleReset}>
                            <i className="fas fa-sync"/>
                        </button>
                    </div>
                </div>

            </div>
        )
    }
}

export default Home;
