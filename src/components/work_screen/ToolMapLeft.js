import React, { Component } from 'react';
import { Icon, Button, Modal, TextInput } from 'react-materialize';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';



class ToolMapLeft extends Component {

    handleChange = (e) => {

        e.persist();
        const target = e.target;
        this.props.state.work[target.id] = target.value;
        this.props.handleWorkModified();
        this.setState(this.props.state.work);
    }


    render() {
        return (
            <div className="col s3 total-toolmap" >
                <div className="tool-map row" style={{ height: "6.5%" }}>
                    <Button small
                        waves="purple"
                        node="button"
                        className="work-top-button"
                        style={{ width: "25%" }}
                        icon={<Icon>save</Icon>}
                        onClick={this.props.handleModalOpen.bind(this, "save")}>
                    </Button>
                    <Button small
                        waves="teal"
                        node="button"
                        className="work-top-button"
                        style={{ marginLeft: "75%", marginTop: "-25%", width: "25%" }}
                        icon={<Icon>cancel</Icon>}
                        onClick={this.props.handleModalOpen.bind(this, "cancel")}>
                    </Button>
                    <Modal
                        bottomSheet={false}
                        fixedFooter={false}
                        header="Save Work?"
                        open={this.props.state.modalActive1}
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
                        <Button waves="orange" id="dialog_yes_button" className='btn modal-button' onClick={this.props.handleSaveWork.bind(this, "save")}>Yes</Button>
                        <Button waves="yellow" id="dialog_no_button" className='btn modal-button' onClick={this.props.handleModalClose.bind(this, "save")}>No</Button>
                        <footer className="dialog_footer">
                            The list will not be retreivable.
                    </footer>
                    </Modal>
                    <Modal
                        bottomSheet={false}
                        fixedFooter={false}
                        header="Cancel Work?"
                        open={this.props.state.modalActive2}
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
                            <p><strong>THERE ARE UNSAVE MODIFICATIONS!!!!!!!!!</strong></p>
                        </section>
                        <Button waves="orange" id="dialog_yes_button" className='btn modal-button' onClick={this.props.handleSaveWork.bind(this, "cancel")}>Yes</Button>
                        <Button waves="yellow" id="dialog_no_button" className='btn modal-button' onClick={this.props.handleModalClose.bind(this, "cancel")}>No</Button>
                        <Button waves="orange" id="dialog_yes_button" className='btn modal-button' onClick={this.props.handleSaveWork.bind(this, "cancel-save")}>Save and Quit</Button>
                        <footer className="dialog_footer">
                            The will not be retreivable.
                    </footer>
                    </Modal>
                </div>

                <div className="tool-map row" style={{ height: "93.5%" }}>
                    <div className="work-name-input">
                        <div className="work-property-label">Work Name</div>
                        <TextInput placeholder="Insert here" className="work-input" id='name' value={this.props.state.work ? this.props.state.work.name : ""}
                            onChange={this.handleChange} />
                    </div>
                    <div className="work-card" style={{ marginTop: '20%' }}>
                        <div className="work-container" onClick={this.props.handleAddItem.bind(this, "Container")}></div>
                        <label className="work-property-label">container</label>
                    </div>
                    <div className="work-card">
                        <p style={{ cursor: "pointer" }} onClick={this.props.handleAddItem.bind(this, "Label")}>prompt for input:</p>
                        <p className="work-property-label" style={{ marginLeft: "10%" }}>label</p>
                    </div>
                    <div className="work-card">
                        <div className="work-button" onClick={this.props.handleAddItem.bind(this, "Button")}>submit</div>
                        <label className="work-property-label">button</label>
                    </div>
                    <div className="work-card">
                        <div className="work-textfield" onClick={this.props.handleAddItem.bind(this, "Input")}>input</div>
                        <label className="work-property-label">textfield</label>
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
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