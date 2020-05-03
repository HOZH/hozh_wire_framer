import React from 'react';
import {Button, Icon, Modal} from 'react-materialize';
import {getFirestore} from 'redux-firestore';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';


class WorkCard extends React.Component {

    state = {
        name: '',
        owner: '',
        modalActive: false,
    }


    dbref = getFirestore().collection("workLists");


    handleModalOpen = (e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log('wefw')
        this.setState({modalActive: true}, () => {
            console.log(this.state)
        });
    }

    handleModalClose = (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.setState({modalActive: false}, () => {
            console.log(this.state)
        });
    }

    deleteList = (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.dbref.doc(this.props.work.id).delete();
    }

    render() {
        const {work} = this.props;
        return (
            <div className="card list z-depth-0 todo-list-link">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title">{work.name === "" ? "Unknown" : work.name}</span>
                    <Button floating small
                            waves="purple"
                            node="button"
                            className="delete-button red"
                            icon={<Icon>clear</Icon>}
                            onClick={this.handleModalOpen}>
                    </Button>
                    <Modal
                        bottomSheet={false}
                        fixedFooter={false}
                        header="Delete Work?"
                        id={"modal-" + work.id}
                        open={this.state.modalActive}

                        options={{
                            dismissible: false,
                            outDuration: 250,
                            endingTop: '10%',
                            inDuration: 250,
                            onCloseEnd: null,
                            onCloseStart: null,
                            onOpenEnd: null,
                            onOpenStart: null,
                            opacity: 0.5,
                            preventScrolling: false,
                            startingTop: '4%'
                        }}
                    >
                        <section className="dialog_content">
                            <p><strong>Are you sure you want to delete this work?</strong></p>
                        </section>
                        <Button waves="orange" id="dialog_yes_button" className='btn'
                                onClick={this.deleteList}>Yes</Button>
                        <Button waves="orange" id="dialog_no_button" className='btn'
                                onClick={this.handleModalClose}>No</Button>
                        <footer className="dialog_footer">
                            The action cannot be redo.
                        </footer>
                    </Modal>
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
        {collection: 'workLists'},
    ]),
)(WorkCard);