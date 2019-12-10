import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks'
import { getFirestore } from 'redux-firestore';
import { connect } from 'react-redux';
import { compose } from 'redux';

class HomeScreen extends Component {

    handleNewList = () => {
        const fireStore = getFirestore();
        fireStore.collection('todoLists').add({
            name: 'Unknownn',
            owner: 'Unknown',
            items: [],
            timestamp: fireStore.FieldValue.serverTimestamp()
        }).then((newList) => {
            console.log(newList)
            this.props.history.push('/todoList/' + newList.id);
        })
    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <TodoListLinks />
                    </div>

                    <div className="col s8">
                        <div className="banner2">
                            @todo<br />
                            List Maker
                        </div>

                        <div className="home_new_list_container">
                            <button className="card home_new_list_button" onClick={this.handleNewList}>
                                Create a New To Do List
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        todoLists: state.firestore.ordered.todoLists,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists', orderBy: ['timestamp', 'desc'] },
    ]),
)(HomeScreen);