import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getFirestore } from 'redux-firestore';
import { firestoreConnect } from 'react-redux-firebase';

import WorkCard from './WorkCard';

class WorkLists extends Component{

    updateTimeStamp = (id) =>{
        let fireStore = getFirestore();
        fireStore.collection("workLists").doc(id).update({
            timestamp : fireStore.FieldValue.serverTimestamp()
        })
    }

    render(){
        console.log(this.props.auth.uid)
        const workLists = this.props.workLists;
        return (
            <div className="todo-lists" style={{marginTop:'50px'}}>
                <div> Recent Work</div>
                
                {workLists && workLists.map(todoList => (
                    <Link to={'/work/' + todoList.id} key={todoList.id} onClick={this.updateTimeStamp.bind(this,todoList.id)}>
                        <WorkCard work={todoList} open={this.handleModalOpen}/>
                    </Link>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        workLists: state.firestore.ordered.workLists,
        auth: state.firebase.auth,
    };
};

const connection = (state) => {
    console.log(state);
    return [
        { 
            collection: 'workLists', 
            orderBy:['timestamp', 'desc'], 
            where: [['owner', '==', state.auth.uid]], 
        },
      ];
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(connection ),
)(WorkLists);