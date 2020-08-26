import React from 'react';
import './App.css';
import { socket } from './service/socket';
import Person from './components/Person';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      persons: []
    };
  }

  subscribe = () => {
    socket.on('personTransaction', (person) => {
      if (person !== undefined) {
        this.setState((prevState) => ({
          persons: [...prevState.persons, person],
        }));
      }
    });
  };

  connect = () => {
    socket.on('connect', (client) => {
      console.log('connected!');
      this.setState({ serverConnected: true });

      socket.emit('subscribeToServer');
    });
  };

  componentDidMount() {
    this.connect();
    this.subscribe();
  }

  render() {
    return (
      <div className='App'>
        <div className='container'>
          <Person socket={socket} persons={this.state.persons} />
        </div>
      </div>
    );
  }
}

export default App;
