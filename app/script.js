import React from 'react';
import { render } from 'react-dom';
// import AppDescription from './AppDescription';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status: {
        off: true,
        work: false,
        rest: false,
      },
      time: 0,
      timer: null
    }
  }


  formatTime = (time) => {
    // console.log(time);
    const rawMinutes = Math.floor((time % 3600) / 60);
    const rawSeconds = (time % 3600) % 60;
    const minutes = rawMinutes < 10 ? "0" + rawMinutes : rawMinutes;
    const seconds = rawSeconds < 10 ? "0" + rawSeconds : rawSeconds;
    return minutes + ':' + seconds;
  }

  step = () => {
    // console.log('step is working');
    this.setState({
      time: this.state.time - 1,
    });
    if (this.state.time === 0) {
      this.playBell();
      if (this.state.status.work) {
        this.setState({
          status: {
            off: false,
            work: false,
            rest: true,
          },
          time: 20,
        })
      } else if (this.state.status.rest) {
        this.setState({
          status: {
            off: false,
            work: true,
            rest: false,
          },
          time: 1200,
        })
      }
    }
  }

  startTimer = () => {
    this.setState({
      status: {
        off: false,
        work: true,
        rest: false,
      },
      time: 1200,
      timer: setInterval(this.step, 1000),
    });
  }

  stopTimer = () => {
    clearInterval(this.state.timer);
    this.setState({
      status: {
        off: true,
        work: false,
        rest: false,
      },
      time: 0,
    });
  }

  closeApp = () => {
    window.close();
  }

  playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  }

  render() {

    const { status } = this.state;
    // console.log(status);
    return (
      <div>
        <h1>Protect your eyes</h1>
        {/* <AppDescription /> */}
        {(status.off) &&
          <div>
            <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
            <p>This app will help you track your time and inform you when it's time to rest.</p>
          </div>
        }
        {(status.work) && <img src="./images/work.png" />}
        {(status.rest) && <img src="./images/rest.png" />}
        {(!status.off) &&
          <div className="timer">
            {this.formatTime(this.state.time)}
          </div>
        }
        {(status.off) && <button onClick={() => this.startTimer()} className="btn">Start</button>}
        {(!status.off) && <button onClick={() => this.stopTimer()} className="btn">Stop</button>}
        <button onClick={() => this.closeApp()} className="btn btn-close">X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
