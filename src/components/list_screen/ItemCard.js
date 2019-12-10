import React from 'react';
import { Button, Icon } from 'react-materialize';
import { getFirestore } from 'redux-firestore';

class ItemCard extends React.Component {

    db = getFirestore().collection('todoLists');

    renderIsCompleted=(isCompleted)=>{
        if(isCompleted){
            return <span className="card_completed col s5">Completed</span>;
        }else{
            return <span className="card_pending col s5">Pending</span>;
        }
    }

    deleteItem = (id, event) => {
        event.preventDefault();
        let items = this.props.todoList.items;
        for (let i = 0; i < items.length; i++) {
            if (items[i].id == id) {
                items.splice(i, 1)
                this.db.doc(this.props.todoList.id).update({
                    items: items
                })
            }
        }
    }

    moveItemUp = (id, event) => {
        event.preventDefault();
        let items = this.props.todoList.items;
        for(let i = 0; i < items.length; i++){
            if(items[i].id == id){
                if(i == 0){
                    return;  // first row
                }
                let temp = items[i];
                items[i] = items[i-1];
                items[i-1] = temp;
                this.db.doc(this.props.todoList.id).update({
                    items:items
                })
            }
        }

    }

    moveItemDown = (id, event) => {
        console.log(id)

        event.preventDefault();

        console.log(event)
        let items = this.props.todoList.items;
        for(let i = 0; i < items.length; i++){
            if(items[i].id == id){
                if(i == items.length-1){
                    return;  // last row
                }
                let temp = items[i];
                items[i] = items[i+1];
                items[i+1] = temp;
                this.db.doc(this.props.todoList.id).update({
                    items:items
                })
                return;
            }
        }

    }

  

    render() {
        const { item } = this.props;  
        return (
            <div className="card z-depth-0 todo-list-link pink-lighten-3">
                <div className="card-content grey-text text-darken-3 row">
                    <span className="card_description col s12">{item.description}</span>
                    <span className="card_assigned_to col s4">{"Assigned to: "+item.assigned_to}</span>
                    <span className="card_due_date col s3">{item.due_date}</span>
                    {this.renderIsCompleted(item.completed)}
                    <div className="fab_button">
                        <Button floating fab={{direction: 'left'}} className="red"  large>
                            <Button floating icon={<Icon className="materialize-icons">arrow_upward</Icon>} className={this.props.item.key!=0?"red":"grey"} onClick={this.moveItemUp.bind(this, this.props.item.id)}/>
                            <Button floating icon={<Icon className="materialize-icons">arrow_downward</Icon>} className={this.props.item.key!=this.props.todoList.items.length-1?"yellow darken-1":"grey"} onClick={this.moveItemDown.bind(this, this.props.item.id)}/>
                            <Button floating icon={<Icon className="materialize-icons">clear</Icon>} className="green" onClick={this.deleteItem.bind(this, this.props.item.id)}/>
                        </Button>
                    </div>
                    
                </div>
            </div>
        );
    }
}
export default ItemCard;