import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';
import {Redirect} from 'react-router-dom';
import {getFirestore} from 'redux-firestore';
import v4 from 'uuid'


import LeftOpZone from './LeftOpZone';
import RightOpZone from './RightOpZone';
import FrameTable from './FrameTable';
import CONSTANT from '../Constant';

class WorkScreen extends Component {

    // componentDidMount(){

    //   ReactDOM.findDOMNode(FrameTable).addEventListener('keydown', this.handleKeyOp);
    //   console.log(document.getElementById("middle"),233)
    //   // document.body.addEventListener('keydown', this.handleKeyOp);

    //   // document.getElementById("middle").addEventListener('keydown', this.handleKeyOp);

    // }

    state = {
        work: {
            "id": v4(),
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
        newWork: false
    }

    handleSelect = (item, event) => {
        event.stopPropagation();
        this.handleUnselect();
        item.selected = true;
        this.setState({selected: item})
    }

    handleUnselect = () => {
        const items = this.state.work.items;
        for (let i in items) {
            items[i].selected = false;
        }
        this.setState({selected: null})
    }

    handleSaveWork = (type) => {
        this.handleUnselect();
        this.closeModal(type);
        this.handleWorkUnmodified();
        if (type === "cancel") {
            this.handleGoHome();
        } else {
            const fireStore = getFirestore();

            this.state.work.timestamp = fireStore.FieldValue.serverTimestamp();
            console.log("fire sotre", fireStore.get({collection: "workLists"}))
            fireStore.get({collection: "workLists", doc: this.props.match.params.id}).then(e => {


                if (e.exists) {
                    fireStore.collection('workLists').doc(this.props.match.params.id).update(this.state.work)
                } else {
                    fireStore.collection('workLists').add(this.state.work)

                }
            }).catch(err => {
                console.log(err)
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

    openModal = (op) => {

        if (op === "save")
            this.setState({modalActive1: true});
        else if (op === "cancel" && !(this.state.saved && !this.state.edited))
            this.setState({modalActive2: true});
        else if (op == "cancel" && (this.state.saved && !this.state.edited))
            this.handleGoHome();
    }

    closeModal = (op) => {
        console.log(op)
        if (op === "save")
            this.setState({modalActive1: false});
        else if (op === "cancel")
            this.setState({modalActive2: false});
        else if (op === "cancel-save")
            this.setState({modalActive2: false});
    }

    handleWorkModified = () => {
        this.setState({saved: false, edited: true});
    }
    handleWorkUnmodified = () => {
        this.setState({saved: true, edited: false});
    }
    // handleKeyPress = (event) => {
    //   if(event.key === 'Enter'){
    //     console.log('enter press here! ')
    //   }
    // }
    createNewControl = (type) => {
        this.handleWorkModified();
        type = type.toUpperCase()
        return {
            "id": v4(),
            "width": CONSTANT[type].INIT_WIDTH,
            "height": CONSTANT[type].INIT_HEIGHT,
            "left": CONSTANT[type].INIT_LEFT,
            "top": CONSTANT[type].INIT_TOP,
            "type": type,
            "property": CONSTANT[type].PROPERTY,
            "borderWidth": CONSTANT[type].BORDER_THICK,
            "borderRadius": CONSTANT[type].BORDER_RADIUS,
            "borderColor": CONSTANT[type].BORDER_COLOR,
            "backGroundColor": CONSTANT[type].BACKGROUND_COLOR,
            "fontSize": CONSTANT[type].FONT_SIZE,
            "selected": false,
        }
    }

    addControl = (type) => {
        let item = this.createNewControl(type)
        this.state.work.items.push(item)
        this.setState(this.state.work)
    }

    handleKeyOp = (event) => {
        // e.preventDefault();

        console.log(event.key);
        console.log(this.state.selected);
        if (event.key === "d" && event.ctrlKey && this.state.selected) {
            event.preventDefault();

            console.log('dup');
            this.dupControl();
        } else if ((event.key == "Delete" || event.keycode == 8) && this.state.selected) {
            console.log('deleting');

            this.deleteControl();
        }
    }

    dupControl = () => {
        const newItem = JSON.parse(JSON.stringify(this.state.selected));
        newItem.id = v4();
        newItem.left = this.state.selected.left - 100;
        newItem.top = this.state.selected.top - 100;
        this.state.work.items.push(newItem)
        this.setState(this.state.work)
    }

    deleteControl = () => {
        const toDelete = this.state.selected;
        for (let i = 0; i < this.state.work.items.length; i++)
            if (this.state.work.items[i] === toDelete)
                this.state.work.items.splice(i, 1)
        this.setState(this.state.work)
    }

    render() {
        const selected = this.state.selected;
        document.body.addEventListener('keydown', this.handleKeyOp);

        if (!this.props.auth.uid) {
            return <Redirect to="/login"/>;
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
            <div className='row' onKeyPress={this.handleKeyPress}>
                <LeftOpZone
                    handleModalOpen={this.openModal}
                    handleModalClose={this.closeModal}
                    handleSaveWork={this.handleSaveWork}
                    handleGoHome={this.handleGoHome}
                    state={this.state}
                    handleAddItem={this.addControl}
                    handleWorkModified={this.handleWorkModified}/>

                <FrameTable work={work} state={this.state}
                            handleWorkModified={this.handleWorkModified}
                            handleWorkUnmodified={this.handleWorkUnmodified}
                            handleSelect={this.handleSelect}
                            handleUnselect={this.handleUnselect}/>

                <RightOpZone work={work} state={this.state}
                             handleWorkModified={this.handleWorkModified}
                             handleWorkUnmodified={this.handleWorkUnmodified}/>

            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let {id} = ownProps.match.params;
    let {workLists} = state.firestore.data;
    let work = workLists ? workLists[id] : null;
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
        {collection: 'workLists'},
    ]),
)(WorkScreen);