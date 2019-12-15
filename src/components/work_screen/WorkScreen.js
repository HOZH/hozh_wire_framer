import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { getFirestore } from 'redux-firestore';



import ToolMapLeft from './ToolMapLeft';
import ToolMapRight from './ToolMapRight';
import DisplayPlace from './DisplayPlace';
// import CONSTANT from '../Constant';

class WorkScreen extends Component {

  // state = {
  //   "id": null,
  //   "owner": null,
  //   "name": null,
  //   "screenHeight": 201,
  //   "screenWidth": 301,
  //   "items": []
  // }

  constructor() {

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


  updateDim = (hValue, wValue) => {
  
    console.log('h value and w value', hValue, wValue)
    this.setState({ height: hValue })
    this.setState({ width: wValue })
    console.log(this.state)
  }


  handleSaveWork = (state) => {
    let fireStore = getFirestore();
    // eslint-disable-next-line
    state.timestamp = fireStore.FieldValue.serverTimestamp();
    if (this.props.match.params.id === 'new')
      fireStore.collection('workLists').add({
        name: state.name,
        owner: state.owner,
        height: this.state.height,
        width: this.state.width,
        timestamp: state.timestamp
      })
    else
      fireStore.collection('workLists').doc(this.props.match.params.id).update({
        name: state.name,
        owner: state.owner,
        height: this.state.height,
        width: this.state.width,
        timestamp: state.timestamp
      })
  }

  handleGoHome = () => {
    this.props.history.push("/")
  }

  handleZoomIn = () => {
    this.setState({
      screenHeight: this.state.screenHeight * 2 < 5000? this.state.screenHeight * 2 : 5000,
      screenWidth: this.state.screenWidth * 2 < 5000? this.state.screenWidth * 2 :5000,
    })

  }

  handleZoomOut = () => {
    this.setState({
      screenHeight: this.state.screenHeight * 0.5 > 1? this.state.screenHeight * 0.5 : 1,
      screenWidth: this.state.screenWidth * 0.5 >1 ? this.state.screenWidth * 0.5 : 1,
    })
  }


  handleAddItem = (type) => {
    if (type === "container") {

    }
  }

  render() {
    if (!this.props.auth.uid) {
      return <Redirect to="/login" />;
    }

    let work = this.props.work;
    if (this.props.work == null) {
      work = this.state; // new work
    }

    return (
      <div className='row'>
        <ToolMapLeft
          work={work}
          handleSaveWork={this.handleSaveWork}
          handleGoHome={this.handleGoHome}
          state={this.state}
          handleZoomIn={this.handleZoomIn}
          handleZoomOut={this.handleZoomOut} />
        <DisplayPlace work={work} state={this.state} tempHeight={this.state.height} tempWidth={this.state.width}/>
        <ToolMapRight work={work} state={this.state} updateDim={this.updateDim} />
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { workLists } = state.firestore.data;
  const work = workLists ? workLists[id] : null;
  if (work)
    work.id = id

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