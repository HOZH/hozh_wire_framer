import React, { Component } from 'react';
import { TextInput, Button } from 'react-materialize';
import ColorPicker from './ColorPicker'
import CONSTANT from '../Constant'


class ToolMapRight extends Component {

    state = {
        screenWidth: this.props.state.work.screenWidth,
        screenHeight: this.props.state.work.screenHeight,
        modalActive: false,
        buttonActive: false,

        property: "",
    }

    handleChange = (e) => {
        e.persist();
        const target = e.target;
        this.setState({ [target.id]: target.value, buttonActive: true });
        this.props.handleWorkModified();
    }

    handleSelectedChange = (e) => {
        const target = e.target;

        this.props.state.selected[target.id] = target.value;
        this.setState(this.props.state.selected);
        this.props.handleWorkModified();
    }

    updateFrame = () => {

        let width = this.state.screenWidth > CONSTANT.DISPLAY.MAX_WIDTH ?
            CONSTANT.DISPLAY.MAX_WIDTH : this.state.screenWidth < CONSTANT.DISPLAY.MIN_WIDTH ?
                CONSTANT.DISPLAY.MIN_WIDTH : this.state.screenWidth;
        let height = this.state.screenHeight > CONSTANT.DISPLAY.MAX_HEIGHT ?
            CONSTANT.DISPLAY.MAX_HEIGHT : this.state.screenHeight < CONSTANT.DISPLAY.MIN_HEIGHT ?
                CONSTANT.DISPLAY.MIN_HEIGHT : this.state.screenHeight;

        this.setState({ screenWidth: width, screenHeight: height, buttonActive: false })
        this.props.state.work.screenWidth = width;
        this.props.state.work.screenHeight = height;
        this.setState(this.props.state.work);
        this.props.handleWorkModified();
    }

    buttonStatus = () => {
        return this.state.buttonActive ? "" : "frame-button";
    }

    render() {
        const selected = this.props.state.selected
        const state = this.props.state;
        return (
            <div className="col s3 total-toolmap">
                <Button small className={"btn update-frame-button " + this.buttonStatus()} onClick={this.updateFrame}>update</Button>

                <div className="tool-map row" style={{ height: "20%" }}>
                    <div className="work-property-label">Frame Width: </div>
                    <TextInput type="number" className="work-input update-frame-input" id="screenWidth" value={this.state.screenWidth} onChange={this.handleChange} />
                    <div className="work-property-label" style={{ height: "40%", marginTop: "10px" }}>Frame Height: </div>
                    <TextInput type="number" className="work-input update-frame-input" id="screenHeight" value={this.state.screenHeight} onChange={this.handleChange} />
                </div>
                <div className="tool-map row" style={{ height: "80%" }}>
                    <div className="work-properties" style={{ height: "15%" }}>
                        <div className="work-property-label" style={{ marginTop: "5%" }}>Property</div>
                        <TextInput className="work-input" className="work-input" id="property" value={selected ? selected.property : ""} onChange={this.handleSelectedChange} />
                    </div>

                    <div className="work-properties" style={{ height: "15%" }}>
                        <div className="work-property-label" >Font Size: </div>
                        <TextInput type="number" className="work-input" id="fontSize" onChange={this.handleSelectedChange} value={selected ? selected.fontSize + "" : ""} />
                    </div>
                    <div className="work-properties" style={{ height: "15%" }}>
                        <div className="work-property-label" >Border Thickness </div>
                        <TextInput type="number" className="work-input" id="borderWidth" onChange={this.handleSelectedChange} value={selected ? selected.borderWidth + "" : ""} />
                    </div>
                    <div className="work-properties" style={{ height: "15%" }}>
                        <div className="work-property-label" >Border Radius </div>
                        <TextInput type="number" className="work-input" id="borderRadius" onChange={this.handleSelectedChange} value={selected ? selected.borderRadius + "" : ""} />
                    </div>
                    <div className="work-properties" style={{ marginTop: 25 }}>
                        <div className="work-property-label" >Border Color:</div>
                        <ColorPicker state={state} type={"borderColor"} handleWorkModified={this.props.handleWorkModified} />
                    </div>
                    <div className="work-properties">
                        <div className="work-property-label" >Background:</div>
                        <ColorPicker state={state} type={"backGroundColor"} handleWorkModified={this.props.handleWorkModified} />
                    </div>

                </div>
            </div>
        );
    }
}

export default ToolMapRight;