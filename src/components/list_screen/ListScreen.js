import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
// import Modal from'./Modal';
import { Modal, Button } from 'react-materialize';

class ListScreen extends Component {
    fireStore = getFirestore();

    constructor(props){
        super(props);
        
        this.state = {
            name: '',
            owner: '',
            task_asc: true,
            due_date_asc: true,
            status_asc: true
        }

    }
    

    


    sortByTask=()=>{

        console.log('sortByTask');
        let items = this.props.todoList.items;
        items.sort(this.compareTask);

        this.state.task_asc = !this.state.task_asc;
        this.state.due_date_asc = true;
        this.state.status_asc = true;



        this.fireStore.collection("todoLists").doc(this.props.todoList.id).update({
            items: items
        })

        console.log('\n')
    }

    sortByDueDate=()=>{
        console.log('sortByDueDate');
        console.log('\n')

        let items = this.props.todoList.items;
        items.sort(this.compareDueDate);
        
        //toggle sorting criteria
        this.state.task_asc = true;
        this.state.due_date_asc = !this.state.due_date_asc;
        this.state.status_asc = true;
        
        //update index after sorting
        // for(let i = 0; i < this.props.todoList.items.length; i++){
        //     this.props.todoList.items[i].key = i;
        // }

        //update view
        this.fireStore.collection("todoLists").doc(this.props.todoList.id).update({
            items: items
        })
    }

    sortByStatus=()=>{
        console.log('sortByStatus');
        console.log('\n')

        let items = this.props.todoList.items;
        items.sort(this.compareStatus);
        
        this.state.task_asc = true;
        this.state.due_date_asc = true;
        this.state.status_asc = !this.state.status_asc;
        

        //update index after sorting
       

        //update view
        this.fireStore.collection("todoLists").doc(this.props.todoList.id).update({
            items: items
        })
    }

    compareTask=(item1, item2)=>{
        if(!this.state.task_asc){
            let temp = item1;
            item1 = item2;
            item2 = temp;
        }

        if (item1.description < item2.description)
            return -1;
        else if (item1.description > item2.description)
            return 1;
        else
            return 0;
    }

    compareDueDate=(item1, item2)=>{
        if(!this.state.due_date_asc){
            let temp = item1;
            item1 = item2;
            item2 = temp;
        }

        if (item1.due_date < item2.due_date)
            return -1;
        else if (item1.due_date > item2.due_date)
            return 1;
        else
            return 0;
    }

    compareStatus=(item1, item2)=>{
        if(!this.state.status_asc){
            let temp = item1;
            item1 = item2;
            item2 = temp;
        }

        if (item1.completed < item2.completed)
            return -1;
        else if (item1.completed > item2.completed)
            return 1;
        else
            return 0;
    }

    confirmDelete=()=>{
        this.fireStore.collection('todoLists').doc(this.props.todoList.id).delete();
        this.props.history.push('/');
    }


    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));

        this.fireStore.collection('todoLists').doc(this.props.todoList.id).update({
            [target.id] : target.value,
        })
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        return (
            <div className="container light-grey">
                <h5 className="grey-text text-darken-3">Todo List</h5>

                <Modal header="Delete list?" trigger={<div className="trash right">&#128465;</div>} actions={<div style={{ textAlign: 'center' }} ><Button className="button" modal="close" onClick={this.confirmDelete}>Yes</Button><Button className="button" modal="close">No</Button></div>}>
                <p><b>Are you sure you want to delete this list?</b></p>
                <p>The list will not be retreivable.</p>
                </Modal>
                <div className="row">
                    <div className="input-field col s5">
                        <label className="active list_title" htmlFor="email">Name</label>
                        <input className="active" type="text" name="name" id="name" onChange={this.handleChange} value={todoList.name} />
                    </div>
                    <div className="input-field col s5">
                        <label className="active list_owner" htmlFor="password">Owner</label>
                        <input className="active" type="text" name="owner" id="owner" onChange={this.handleChange} value={todoList.owner} />
                    </div>
                </div>
                
                <div className="card z-depth-0 todo-list-header green">
                    <div className="card-content grey-text text-darken-3 row">
                        <span className = "card-title col s4" onClick={this.sortByTask.bind(this)}>Task</span>
                        <span className = "card-title col s3" onClick={this.sortByDueDate.bind(this)}>Due Date</span>
                        <span className = "card-title col s2" onClick={this.sortByStatus.bind(this)}>Status</span>
                    </div>
                </div>
                <ItemsList todoList={todoList} />

                <Link to={'/todoList/'+this.props.todoList.id+"/new" } >
                    <div className="card z-depth-0 todo-list-link lighten-3" >
                        <div className="card-content grey-text text-darken-3 row valign-wrapper" style={{height:"90px"}}>
                            <span className="large material-icons col s6">add</span>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  var todoList;
    if(todoLists){
        todoList = todoLists[id];
        const uuid = require('uuid');
        todoList.items.map(item => {
            if(!item.id){
                const item_id = uuid.v1();
                item.id = item_id;
            }
        })

        let items = todoList.items;
        for(let i = 0; i < items.length; i++){
            items[i].key = i;
        }

        const fireStore = getFirestore();
        console.log(fireStore)
        fireStore.collection("todoLists").doc(id).update({
            items: todoList.items
        });
    }else{
        const fireStore = getFirestore();
        todoList = fireStore.collection('todoLists').doc(id).get();
    }
  todoList.id = id;
    console.log(todoList);
    console.log()
  return {
    todoList,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ListScreen);