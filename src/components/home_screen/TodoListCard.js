import React from 'react';

class TodoListCard extends React.Component {

    render() {
        const { todoList } = this.props;
        console.log(todoList)

        return (
            <div className="card z-depth-0 todo-list-link">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-content">{todoList.name?todoList.name:"Unknown"}</span>
                </div>
            </div>
        );
    }
}
export default TodoListCard;