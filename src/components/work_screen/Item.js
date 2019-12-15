import React, { Component } from 'react';
import Drag from './Drag'




class Item extends Component {

    render() {
        const item = this.props.item;
        return (
            <div onMouseDown={this.props.handleSelect.bind(this, item)}
                onClick={this.props.handleSelect.bind(this, item)}>
                <Drag item={item}
                    handleDrag={this.props.handleDrag}
                    handleWorkModified={this.props.handleWorkModified}
                    state={this.props.state}></Drag>
            </div >

        );
    }
}

export default Item;