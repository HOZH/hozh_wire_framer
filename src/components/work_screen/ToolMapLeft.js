import React, { Component } from 'react';
import { Icon, Button, Modal, TextInput } from 'react-materialize';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';



class ToolMapLeft extends Component {

    

    state = {
        name: null,
        owner: null,
        timestamp: null,
        modalActive1: false,
        modalActive2: false,
    }

    handleModalOpen = (type) => {
        if (type === "save")
            this.setState({ modalActive1: true });
        else if (type === "cancel")
            this.setState({ modalActive2: true });
    }

    handleModalClose = (type) => {
        if (type === "save")
            this.setState({ modalActive1: false });
        else if (type === "cancel")
            this.setState({ modalActive2: false });
    }

    handleChange = (e) => {
        e.persist();
        const target = e.target;
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
    }

    handleSaveWork = (type) => {
        if (type === "cancel")
            this.props.handleGoHome();
        this.props.handleSaveWork(this.state);
        this.handleModalClose(type);
    }


    formBox = (e)=>{
        console.log(e)
        console.log('forming box')


        this.props.handleAddItem(e)
    }

    handleInitState = () => {
        if (this.state.name === null && this.props.work.name)
            // eslint-disable-next-line
            this.state.name = this.props.work.name ? this.props.work.name : "";
        if (this.state.owner === null && this.props.auth.uid)
            // eslint-disable-next-line
            this.state.owner = this.props.auth.uid ? this.props.auth.uid : "";
    }

    render() {
        const { work } = this.props;
        this.handleInitState();
        return (
            <div className="col s3 total-toolmap" >
                <div className="tool-map row" style={{ height: "6.5%" }}>
                    <Button small
                        waves="purple"
                        node="button"
                        className="work-top-button"
                        icon={<Icon>save</Icon>}
                        onClick={this.handleModalOpen.bind(this, "save")}>
                    </Button>
                    <Button small
                        waves="teal"
                        node="button"
                        className="work-top-button"
                        style={{ marginLeft: "55%" }}
                        icon={<Icon>cancel</Icon>}
                        onClick={this.handleModalOpen.bind(this, "cancel")}>
                    </Button>
                    <Modal
                        bottomSheet={false}
                        fixedFooter={false}
                        header="Save Work?"
                        id={"modal-" + work.id}
                        open={this.state.modalActive1}
                        style={{ maxHeight: 'none' }}
                        options={{
                            dismissible: false,
                            endingTop: '10%',
                            inDuration: 250,
                            onCloseEnd: null,
                            onCloseStart: null,
                            onOpenEnd: null,
                            onOpenStart: null,
                            opacity: 0.5,
                            outDuration: 250,
                            preventScrolling: false,
                            startingTop: '4%'
                        }}
                    >
                        <section className="dialog_content">
                            <p><strong>Are you sure you want to save this work?</strong></p>
                        </section>
                        <Button waves="orange" id="dialog_yes_button" className='btn' onClick={this.handleSaveWork.bind(this, "save")}>Yes</Button>
                        <Button waves="yellow" id="dialog_no_button" className='btn' onClick={this.handleModalClose.bind(this, "save")}>No</Button>
                        <footer className="dialog_footer">
                           test msg...
                    </footer>
                    </Modal>
                    <Modal
                        bottomSheet={false}
                        fixedFooter={false}
                        header="Cancel Work?"
                        id={"modal-" + work.id}
                        open={this.state.modalActive2}
                        style={{ maxHeight: 'none' }}
                        options={{
                            dismissible: false,
                            endingTop: '10%',
                            inDuration: 250,
                            onCloseEnd: null,
                            onCloseStart: null,
                            onOpenEnd: null,
                            onOpenStart: null,
                            opacity: 0.5,
                            outDuration: 250,
                            preventScrolling: false,
                            startingTop: '4%'
                        }}
                    >
                        <section className="dialog_content">
                            <p><strong>Are you sure you want to cancel this work?</strong></p>
                        </section>
                        <Button waves="orange" id="dialog_yes_button" className='btn' onClick={this.handleSaveWork.bind(this, "cancel")}>Yes</Button>
                        <Button waves="yellow" id="dialog_no_button" className='btn' onClick={this.handleModalClose.bind(this, "cancel")}>No</Button>
                        <footer className="dialog_footer">
                        test msg...
                    </footer>
                    </Modal>
                </div>

                <div className="tool-map row" style={{ height: "93.5%" }}>
                    <div className="work-name-input">
                        <div className="work-property-label">Work Name</div>
                        <TextInput placeholder="Insert here" className="work-input" id='name' value={this.state.name ? this.state.name : ""}
                            onChange={this.handleChange} />
                    </div>
                    <div className="work-card" style={{ marginTop: '20%' }}>
                        <div className="work-container" onClick={this.formBox.bind(this,'container')}></div>
                        <label className="work-property-label" >container</label>
                    </div>
                    <div className="work-card">
                        <p style={{ cursor: "pointer" }}>prompt for input:</p>
                        <p className="work-property-label">label</p>
                    </div>
                    <div className="work-card">
                        <div className="work-button">submit</div>
                        <label className="work-property-label">button</label>
                    </div>
                    <div className="work-card">
                        <div className="work-textfield">input</div>
                        <label className="work-property-label">textfield</label>
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    };
};



export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'workLists' },
    ]),
)(ToolMapLeft);