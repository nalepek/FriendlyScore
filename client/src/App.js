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
    socket.on('personTransaction', (person, transaction) => {
      if (person) {
        if (!person.transactions){
          person.transactions = [];
        }

        person.transactions.push(transaction);
        
        let persons = [...this.state.persons];
        const index = persons.findIndex((e) => {
          return e.id === person.id;
        });
        if (index > -1) {
          let pers = { ...persons[index] };
          const transactions = [...pers.transactions];
          pers = person;
          pers.transactions = transactions;
          pers.transactions.push(transaction);
          persons[index] = pers;
        } else {
          persons.push(person);
        }

        this.setState({ persons: persons });
      }
    });

    socket.on('updateTransactions', (transactions) => {
      const persons = [...this.state.persons];
      for (let i = 0; i < persons.length; i++) {
        const personTransactions = transactions.filter((e) => { return e.personId === persons[i].id });
        persons[i].transactions = personTransactions;
      }

      this.setState({ persons: persons });
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
