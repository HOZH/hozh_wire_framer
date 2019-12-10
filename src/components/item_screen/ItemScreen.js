import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';

export class ItemScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {

            item_description: this.props.todoItem ? this.props.todoItem.description : '',
            item_assigned_to: this.props.todoItem ? this.props.todoItem.assigned_to : '',
            item_due_date: this.props.todoItem ? this.props.todoItem.due_date : '',
            item_completed: this.props.todoItem ? this.props.todoItem.completed : false
        }
        this.onChange = this.onChange.bind(this);
        this.onChecked = this.onChecked.bind(this);
    }

    onChange = (event) => {
        console.log(event)
        this.setState({ [event.target.name]: event.target.value });
    }

    onChecked = (event) => {
        console.log(event)
        this.setState({ [event.target.name]: event.target.checked });
    }

    onCancel = () => {
        console.log(this.props)

        this.props.history.push('/todoList/' + this.props.match.params.id);
    }


    onSubmit = (e) => {
        e.preventDefault();
        const itemId = this.props.match.params.itemId;

        if (this.state.item_description == '' || this.state.item_assigned_to == '' || this.state.item_due_date == '') return;

        if (this.props.todoItem) {
            this.props.todoList.items.map(item => {
                if (item.id == itemId) {

                    item.completed = this.state.item_completed;
                    item.description = this.state.item_description;
                    item.assigned_to = this.state.item_assigned_to;
                    item.due_date = this.state.item_due_date;
                }
            })

        } else {

            if (itemId == 'new') {
                const uuid = require('uuid');
                const item_id = uuid.v1();
                const itemKey = this.props.todoList.items.length;
                this.props.todoList.items.push({
                    description: this.state.item_description,
                    assigned_to: this.state.item_assigned_to,
                    due_date: this.state.item_due_date,
                    completed: this.state.item_completed,
                    key: itemKey,
                    id: item_id
                })
            }

        }

        const fireStore = getFirestore();
        console.log(fireStore)


        fireStore.collection("todoLists").doc(this.props.match.params.id).update({
            items: this.props.todoList.items
        });

        this.props.history.push('/todoList/' + this.props.match.params.id);

    }

    render() {
        const auth = this.props.auth;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        return (

            <div id="item_form_container">
                <div id="item_heading">Item</div>

                <div className="item_table">
                    <div className="item_row">
                        <div className="item_left_cell"><span id="item_description_prompt" className="item_prompt">Description:</span></div>
                        <div className="item_right_cell"><input type="text" onChange={this.onChange} name="item_description" id="item_description_textfield" defaultValue={this.state.item_description} /></div>
                    </div>
                    <br />
                    <div className="item_row">
                        <div className="item_left_cell"><span id="item_assigned_to_prompt" className="item_prompt">Assigned To:</span></div>
                        <div className="item_right_cell"><input type="text" onChange={this.onChange} name="item_assigned_to" id="item_assigned_to_textfield" defaultValue={this.state.item_assigned_to} /></div>
                    </div>
                    <br />
                    <div className="item_row">
                        <div className="item_left_cell"><span id="item_due_date_prompt" className="item_prompt">Due Date:</span></div>
                        <div className="item_right_cell"><input type="date" onChange={this.onChange} name="item_due_date" id="item_due_date_picker" defaultValue={this.state.item_due_date} /></div>
                    </div>
                    <br />
                    <div className="item_row">
                        <div className="item_left_cell"><span id="item_completed_prompt" className="item_prompt">Completed:</span></div>
                        {/* <div className="item_right_cell"><input type="checkbox" onChange={this.onChecked} name="item_completed" id="item_completed_checkbox" /></div> */}
                        <label className="item_right_cell">
                            <input type="checkbox" name="item_completed" id='item_completed_checkbox' checked={this.state.item_completed ? this.state.item_completed : null} onChange={this.onChecked} />
                            <span></span>  {/* the square */}
                        </label>
                    </div>
                </div>
                <br></br>
                <div className="item_prompt">
                    <button id="item_form_submit_button" onClick={this.onSubmit}>Submit</button>
                    <button id="item_form_cancel_button" onClick={this.onCancel}>Cancel</button><br />
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {


    console.log(state)
    console.log(ownProps)

    const { id, itemId } = ownProps.match.params;
    const { todoLists } = state.firestore.data;

    const todoList = todoLists ? todoLists[id] : null;

    console.log(todoList)
    let todoItem = null;
    if (todoList != null) {
        todoItem = todoList.items.filter(item => {
            return item.id == itemId
        })[0]

    }


    return {
        todoList: todoList,
        todoItem: todoItem,
        auth: state.firebase.auth,
    };


};

export default compose(connect(mapStateToProps),
    firestoreConnect([{ collection: 'todoLists' },
    ]))(ItemScreen);

