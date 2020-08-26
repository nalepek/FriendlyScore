import React, { Component } from 'react';

class Person extends Component {
  constructor(props) {
    super(props);

    this.state = {
      persons: [],
    };
  }

  handleCollapse = (event, item) => {
    item.expanded = !item.expanded;
    console.log(item.expanded);
  };

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
                <React.Fragment>
                  <tr
                    key={item.id}
                    onClick={(event) => this.handleCollapse(event, item)}
                  >
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.creditScore}</td>
                  </tr>
                  {item.expanded && (
                    <tr>
                      <td colspan="3">BLA</td>
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
      this.setState({ persons: this.props.persons });
    }
  }

  render() {
    return <div className='table-scrollable'>{this.renderTable()}</div>;
  }
}

export default Person;
