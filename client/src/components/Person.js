import React, { Component } from 'react';
import PersonTransactions from './PersonTransactions';

class Person extends Component {
  constructor(props) {
    super(props);

    this.state = {
      persons: [],
      expandedIndex: null
    };
  }

  handleCollapse = (event, item, index) => {
    item.expanded = !item.expanded;
    let persons = [...this.state.persons];
    persons[index] = item;
    this.setState({ persons: persons });
  };

  renderTable = () => {
    if (!this.state.persons || !this.state.persons.length) {
      return null;
    } else {
      return (
        <table className='table table-striped table-sm'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Credit score</th>
            </tr>
          </thead>
          <tbody>
            {this.state.persons.map((item, index) => {
              return (
                <React.Fragment key={item.id}>
                  <tr
                    onClick={(event) => this.handleCollapse(event, item, index)}
                    className='selectable'
                  >
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.creditScore}</td>
                  </tr>
                  {item.expanded && (
                    <tr>
                      <td colSpan="3">
                        <PersonTransactions transactions={item.transactions}></PersonTransactions>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      );
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.persons !== prevProps.persons) {
      for (let i = 0; i < prevProps.persons.length; i++){
        if (prevProps.persons[i].expanded){
          this.props.persons[i].expanded = prevProps.persons[i].expanded;
        }
      }
      this.setState({ persons: this.props.persons });
    }
  }

  render() {
    return <div className='table-scrollable'>{this.renderTable()}</div>;
  }
}

export default Person;
