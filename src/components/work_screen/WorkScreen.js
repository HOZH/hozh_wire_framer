import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { getFirestore } from 'redux-firestore';
import v1 from 'uuid'



import ToolMapLeft from './ToolMapLeft';
import ToolMapRight from './ToolMapRight';
import DisplayPlace from './DisplayPlace';
import CONSTANT from '../Constant';

class WorkScreen extends Component {

  state = {
    work: {
      "id": v1(),
      "owner": this.props.auth.uid,
      "name": "",
      "screenHeight": CONSTANT.DISPLAY.INIT_HEIGHT,
      "screenWidth": CONSTANT.DISPLAY.INIT_WIDTH,
      "items": [],
      "tiemstamp": "",
    },
    isEditing: false,
    edited: false,
    saved: true,
    modalActive1: false,
    modalActive2: false,
    selected: null,
    newWork:false
  }

  handleSelect = (item, e) => {
    e.stopPropagation();
    this.handleUnselect();
    item.selected = true;
    this.setState({ selected: item })
  }

  handleUnselect = () => {
    const items = this.state.work.items;
    for (let i in items) {
      items[i].selected = false;
    }
    this.setState({ selected: null })
  }

  handleSaveWork = (type) => {
    this.handleUnselect();
    this.handleModalClose(type);
    this.handleWorkUnmodified();
    if (type === "cancel") {
      this.handleGoHome();
    }
    else {
      let fireStore = getFirestore();

      // eslint-disable-next-line
      this.state.work.timestamp = fireStore.FieldValue.serverTimestamp();
      console.log("fire sotre",fireStore.get({collection:"workLists"}))
      fireStore.get({collection:"workLists",doc:this.props.match.params.id}).then(e=>{   


        if(e.exists){
          fireStore.collection('workLists').doc(this.props.match.params.id).update(this.state.work)
        }
        else{
          fireStore.collection('workLists').add(this.state.work)

        }
      })
      // if (this.props.match.params.id === 'new')
      //   fireStore.collection('workLists').add(this.state.work)
      // else
      //   fireStore.collection('workLists').doc(this.props.match.params.id).update(this.state.work)

      if (type === "cancel-save")
        this.handleGoHome();
    }
  }

  handleGoHome = () => {
    console.log(this.props)
    this.props.history.push("/")
  }

  handleModalOpen = (type) => {

    if (type === "save")
      this.setState({ modalActive1: true });
    else if (type === "cancel" && !(this.state.saved && !this.state.edited))
      this.setState({ modalActive2: true });
    else if (type === "cancel" && (this.state.saved && !this.state.edited))
      this.handleGoHome();
  }

  handleModalClose = (type) => {
    console.log(type)
    if (type === "save")
      this.setState({ modalActive1: false });
    else if (type === "cancel")
      this.setState({ modalActive2: false });
    else if (type === "cancel-save")
      this.setState({ modalActive2: false });
  }

  handleWorkModified = () => {
    this.setState({ saved: false, edited: true });
  }
  handleWorkUnmodified = () => {
    this.setState({ saved: true, edited: false });
  }
  // handleKeyPress = (event) => {
  //   if(event.key === 'Enter'){
  //     console.log('enter press here! ')
  //   }
  // }
  createNewItem = (type) => {
    this.handleWorkModified();
    type = type.toUpperCase()
    return {
      "id": v1(),
      "left": CONSTANT[type].INIT_LEFT,
      "top": CONSTANT[type].INIT_TOP,
      "type": type,
      "property": CONSTANT[type].PROPERTY,
      "backGroundColor": CONSTANT[type].BACKGROUND_COLOR,
      "borderWidth": CONSTANT[type].BORDER_THICK,
      "borderRadius": CONSTANT[type].BORDER_RADIUS,
      "borderColor": CONSTANT[type].BORDER_COLOR,
      "fontSize": CONSTANT[type].FONT_SIZE,
      "width": CONSTANT[type].INIT_WIDTH,
      "height": CONSTANT[type].INIT_HEIGHT,
      "selected": false,
    }
  }

  handleAddItem = (type) => {
    let item = this.createNewItem(type)
    this.state.work.items.push(item)
    this.setState(this.state.work)
  }

  handleKeyEvent = (e) => {
    // e.preventDefault();

    console.log(e.key);
    console.log(this.state.selected);
    if (e.key === "d" && e.ctrlKey && this.state.selected) {
      e.preventDefault();

console.log('dup');
      this.handleDuplicate();
    } else if ((e.key == "Delete"||e.keycode==8) && this.state.selected) {
      console.log('deleting');

      this.handleDelete();
    }
  }

  handleDuplicate = () => {
    const newItem = JSON.parse(JSON.stringify(this.state.selected));
    newItem.id = v1();
    newItem.left = this.state.selected.left - 100;
    newItem.top = this.state.selected.top - 100;
    this.state.work.items.push(newItem)
    this.setState(this.state.work)
  }

  handleDelete = () => {
    const toDelete = this.state.selected;
    for (let i = 0; i < this.state.work.items.length; i++)
      if (this.state.work.items[i] === toDelete)
        this.state.work.items.splice(i, 1)
    this.setState(this.state.work)
  }

  render() {
    const selected = this.state.selected;
    document.body.addEventListener('keydown', this.handleKeyEvent);

    if (!this.props.auth.uid) {
      return <Redirect to="/login" />;
    }


    if (this.props.work && this.state.isEditing === false) {
      // eslint-disable-next-line
      this.state.work = this.props.work
      // eslint-disable-next-line
      this.state.isEditing = true;
    }

    let work = this.props.work;
    if (!work) {
      work = this.state.work;
    }

    return (
      <div className='row' onKeyPress={this.handleKeyPress} >
        <ToolMapLeft
          handleModalOpen={this.handleModalOpen}
          handleModalClose={this.handleModalClose}
          handleSaveWork={this.handleSaveWork}
          handleGoHome={this.handleGoHome}
          state={this.state}
          handleAddItem={this.handleAddItem}
          handleWorkModified={this.handleWorkModified} />

        <DisplayPlace  work={work} state={this.state}
          handleWorkModified={this.handleWorkModified}
          handleWorkUnmodified={this.handleWorkUnmodified}
          handleSelect={this.handleSelect}
          handleUnselect={this.handleUnselect} />

        <ToolMapRight work={work} state={this.state}
          handleWorkModified={this.handleWorkModified}
          handleWorkUnmodified={this.handleWorkUnmodified} />

      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { workLists } = state.firestore.data;
  const work = workLists ? workLists[id] : null;
  if (work) {
    work.id = id;
  }

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