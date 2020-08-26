import React, { Component } from 'react';
import Dialog from '../modals/Dialog';
import { socket } from '../service/socket';

class PersonTransactions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            transactions: this.props.transactions,
            category: {}
        };
    }

    handleShowDialog = (event, transaction, index) => {

        let onUpdate = function (text) {
            transaction.categoryName = text;

            socket.emit('updateTransaction', transaction);

            this.setState({ transactions: [...this.state.transactions] });
        }

        this.setState({ category: { content: transaction.categoryName, header: transaction.name, onContentUpdate: onUpdate.bind(this) } });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.transactions !== prevProps.transactions) {
            this.setState({ transactions: this.props.transactions });
        }
    }

    render() {
        return (
            <div>
                <p>Person transactions:</p>
                <table className='table table-sm'>
                    <thead>
                        <tr>
                            <th>Transaction name</th>
                            <th>Transaction amount</th>
                            <th>Transaction category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.transactions.map((transaction, index) => {
                            return (
                                <React.Fragment key={transaction.id}>
                                    <tr
                                        onClick={(event) => this.handleShowDialog(event, transaction, index)}
                                        className='selectable'
                                    >
                                        <td>{transaction.name}</td>
                                        <td>{transaction.amount}</td>
                                        <td>{transaction.categoryName}</td>
                                    </tr>
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
                <Dialog editItem={this.state.category}></Dialog>
            </div>
        );
    } 
}

export default PersonTransactions;
