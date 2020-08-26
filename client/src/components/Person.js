import React, { Component } from 'react';

class Person extends Component {
  constructor(props) {
    super(props);

    this.state = {
      persons: [],
    };
  }

  renderTable = () => {
    if (!this.state.persons || !this.state.persons.length) {
      return null;
    } else {
      return (
        <table className='table table-striped'>
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
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.creditScore}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.persons !== prevProps.persons) {
      this.setState({ persons: this.props.persons });
    }
  }

  render() {
    return <div className='table-scrollable'>{this.renderTable()}</div>;
  }
}

export default Person;
