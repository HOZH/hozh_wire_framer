import reactCSS from 'reactcss'
import {SketchPicker} from 'react-color';
import React, {Component} from 'react';


export default class ColorPicker extends Component {

    state = {
        displayColorPicker: false,
        color: "aqua",
    };

    handleClick = (event) => {
        this.setState({displayColorPicker: !this.state.displayColorPicker})
    };

    handleClose = (event) => {
        this.setState({displayColorPicker: false})
    };

    handleChange = (color) => {

        this.setState({color: color.hex})

        if (!this.props.state.selected)
            return
        this.props.state.selected[this.props.type] = color.hex
        this.setState(this.props.state.selected)
        this.props.handleWorkModified()
    };

    render() {

        let selected = this.props.state.selected
        if (!selected)
            selected = this.state.color;
        else
            selected = this.props.state.selected[this.props.type]

        const colorStyles = reactCSS({
            'default': {
                color: {
                    width: '40px',
                    height: '15px',
                    borderRadius: '100%',
                    background: selected,
                },
                swatch: {
                    padding: '5px',
                    background: '#fff',
                    borderRadius: '100%',
                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                    display: 'inline-block',
                    cursor: 'pointer',
                },
                popover: {
                    position: 'absolute',
                    zIndex: '2',
                    right: "1%",
                },
                cover: {
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                },
            },
        });
        return (
            <div className="right" style={{marginTop: "-10%"}}>
                <div style={colorStyles.swatch} onClick={this.handleClick}>
                    <div style={colorStyles.color}/>
                </div>
                {this.state.displayColorPicker ? <div style={colorStyles.popover}>
                    <div style={colorStyles.cover} onClick={this.handleClose}/>
                    <SketchPicker
                        color={this.state.color}
                        onChange={this.handleChange}
                        className="left"
                    />
                </div> : null}
            </div>
        );
    }
}

// export default ColorPicker;