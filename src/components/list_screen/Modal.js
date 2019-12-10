import React, { Component } from 'react'
// didnt use in this project
export class Modal extends Component {
    render() {
        let show;
        if(this.props.isModalShown){
            show = "is_visible"
        }else{
            show = ""
        }
        return (
            <div id="modal_yes_no_dialog" className={"invisible", show}>
                <p>Delete list?</p>
                <br/>
                <p><b>Are you sure you want to delete this list?</b></p>
                <button onClick={this.props.confirmDelete}>Yes</button>
                <button onClick={this.props.cancelDelete}>No</button><br/>
                <p>The list will not be retreivable.</p>
            </div>
        )
    }
}

export default Modal
