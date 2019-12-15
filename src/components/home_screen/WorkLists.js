import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getFirestore } from 'redux-firestore';
import { firestoreConnect } from 'react-redux-firebase';


import WorkCard from './WorkCard';

class WorkLists extends Component {

    updateTimeStamp = (id) => {
        let fireStore = getFirestore();
        fireStore.collection("workLists").doc(id).update({
            timestamp: fireStore.FieldValue.serverTimestamp()
        })
    }

    render() {
        let workLists = this.props.workLists;

        return (
            <div className="todo-lists" style={{ marginTop: '50px' }}>
                <div> Recent Work</div>

                {
                    workLists && workLists.map(work => (
                        <Link to={'/work/' + work.id} key={work.id} onClick={this.updateTimeStamp.bind(this, work.id)}>
                            <WorkCard work={work} />
                        </Link>
                    ))
                }
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    const data = state.firestore.data.workLists;
    let workLists = [];
    for (let i in data) {
       if(data[i]!=null){
        data[i]["id"] = i
        workLists.push(data[i])
       }
    }
    return {
        workLists,
        auth: state.firebase.auth,
    };
};


export default compose(
    connect(mapStateToProps),
    firestoreConnect(state => [
        {
            collection: 'workLists',
            orderBy: ['timestamp', 'desc'],
            where: [['owner', '==', state.auth.uid]],
        },
    ]),
)(WorkLists);

// export default compose(connect(mapStateToProps))(WorkLists);