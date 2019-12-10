import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';

class ItemsList extends React.Component {
    render() {
        const todoList = this.props.todoList;
        const items = todoList.items;

        console.log(todoList)
        console.log(items)
        return (
            <div className="todo-lists section">
                {items && items.map(function(item) {
                    return (
                        <Link to={'/todoList/'+todoList.id+"/"+item.id} todoList={todoList} todoItem={item}>
                            <ItemCard todoList={todoList} item={item} key={item.key}/>
                        </Link>
                    );})
                }
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const todoList = ownProps.todoList;
    console.log(todoList)
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
)(ItemsList);