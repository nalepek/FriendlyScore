import React from 'react';
import './App.css';
import { socket } from './service/socket';
import Person from './components/Person';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      persons: [],
    };
  }

  subscribe = () => {
    socket.on('personTransaction', (person) => {
      if (person !== undefined) {
        let persons = [...this.state.persons];
        const index = persons.findIndex((e) => e.id === person.id);
        if (index > -1) {
          let pers = { ...persons[index] };
          pers = person;
          persons[index] = pers;
        } else {
          persons.push(person);
        }

        this.setState({ persons: persons });
        // this.setState((prevState) => ({
        //   persons: [...prevState.persons, person],
        // }));
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
