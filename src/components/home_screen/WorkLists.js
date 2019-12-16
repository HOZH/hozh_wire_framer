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
        console.log('worklist', this.props);

        let workLists = this.props.workLists;

        return (
            <div className="todo-lists" style={{ marginTop: '50px' }}>
                <div> Recent Work</div>

                {
                    workLists && workLists.map(work => (
                        <Link to={'/'+ this.props.auth.uid+'/work/' + work.id} key={work.id} onClick={this.updateTimeStamp.bind(this, work.id)}>
                            <WorkCard work={work} />
                        </Link>
                    ))
                }
            </div >
        );
    }
}

const mapStateToProps = (sub_state) => {
    const wl = sub_state.firestore.data.workLists;
    let workLists = [];
    for (let i in wl) {
       if(wl[i]!=null){
        wl[i]["id"] = i
        workLists.push(wl[i])
       }
    }
    return {
        workLists,
        auth: sub_state.firebase.auth,
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