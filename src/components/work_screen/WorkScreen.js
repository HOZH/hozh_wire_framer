import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { getFirestore } from 'redux-firestore';



import ToolMapLeft from './ToolMapLeft';
import ToolMapRight from './ToolMapRight';
import DisplayPlace from './DisplayPlace';

class WorkScreen extends Component{

  constructor(){

    super()
    this.state = {
      id: null,
      owner: null,
      name: null,
      height: null,
      width: null,

      items: []
    }
  }

  updateDim = (hValue,wValue)=>{
    // console.log(e)
    // console.log(newValue)
    let fireStore = getFirestore();
    // fireStore.collection('workLists').doc(this.props.match.params.id).update({
    //   height:newValue
    // })
console.log('h value and w value',hValue,wValue)
    this.setState({height: hValue})
    this.setState({width:wValue})
    console.log(this.state)
  }

  handleSaveWork= (state) => {
    let fireStore = getFirestore();
    console.log(state)
    // eslint-disable-next-line
    state.timestamp=fireStore.FieldValue.serverTimestamp();
    if(this.props.match.params.id==='new')
      fireStore.collection('workLists').add({
        name:state.name,
        owner:state.owner,
        height:this.state.height,
        width: this.state.width,
        timestamp:state.timestamp
      })
    else
      fireStore.collection('workLists').doc(this.props.match.params.id).update({
        name:state.name,
        owner:state.owner,
        height: this.state.height,
        width: this.state.width,
        timestamp:state.timestamp
      })
  }

  render(){

    console.log(123)
    console.log(this)

    if (!this.props.auth.uid) {
        return <Redirect to="/login" />;
    }

    let work = this.props.work;
    if(work==null){
      console.log('current props work == null')
      console.log(work)
        work = this.state; // new work
    }

    console.log('current work is')
    console.log(work)
    console.log(this.props.history)
    console.log(this.props)
    return (
        <div className='row'>
          <ToolMapLeft work={work} history={this.props.history}  handleSaveWork={this.handleSaveWork}/>
        <DisplayPlace work={work} tempHeight = {this.state.height} tempWidth={this.state.width}/>
        <ToolMapRight work={work} updateDim={this.updateDim}/>
        </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const { workLists } = state.firestore.data;
    const work = workLists ? workLists[id] : null;
    if(work)
      work.id=id
  
    return {
      work,
      auth: state.firebase.auth,
    };
  };
  
  export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'workLists' },
    ]),
  )(WorkScreen);