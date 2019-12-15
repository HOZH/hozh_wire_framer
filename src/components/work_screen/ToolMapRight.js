import React, { Component } from 'react';
import { TextInput, Range, Button } from 'react-materialize';
import ColorPicker from './ColorPicker'

class ToolMapRight extends Component {


    constructor(props) {
        super(props)
        console.log(1234)
        console.log(this.props)
        this.state =
        {
            height: this.props.work.height + "",
            width: this.props.work.width + "",

            title: 1,
            disable: true
        }


    }

    handleChange = (e) => {
        console.log(e)
        console.log(this.state)
        // e.persist();
        // const target = e.target;
        // this.setState(state => ({
        //     ...state,
        //     [target.id]: target.value,
        // }));
        e.preventDefault();

        this.setState({

            // title
            [e.target.name]: e.target.value
            // e.target.value
        })
        this.setState({ disable: false })
        console.log(this.state.disable)

    }

    updateDim = (e) => {


        if (Number.isInteger(Number(this.state.height)) && Number.isInteger(Number(this.state.height)) && this.state.height <= 5000 && this.state.height >= 1 &&
            Number.isInteger(Number(this.state.width)) && Number.isInteger(Number(this.state.width)) && this.state.width <= 5000 && this.state.width >= 1) {
            console.log('updating dim')
            console.log(e)
            console.log(this.state)
            this.props.updateDim(this.state.height, this.state.width)
        }
        this.setState({ disable: true })
        console.log(this.state.disable)
    }

    render() {

        return (
            <div className="col s3 total-toolmap">
                <div className="tool-map row" style={{ height: "100%" }}>
                    <div className="work-properties" style={{ height: "15%" }}>
                        <div className="work-property-label" >Property</div>
                        <TextInput placeholder="Insert here" className="work-input" />
                    </div>
                    <div className="work-properties frame-properties ">
                        <label className="work-property-label" >Frame Height: </label>
                        <Range max="5000" min="1"
                            value={this.state.height} name="height"
                            onChange={this.handleChange}
                            //  name="points"
                            style={{ width: "60%" }} />
                        <label className="work-property-label" >Frame Width: </label>
                        <Range max="5000" min="1"
                            // name="points"
                            value={this.state.width} name="width"
                            onChange={this.handleChange}
                            style={{ width: "60%" }} />
                        <Button
                        //  className={ "right btn"}
                        className={this.state.disable ? "right btn disabled" : "right btn"}
                            onClick={this.updateDim}
                            waves="yellow" style={{ marginTop: "-80px" }}>Update</Button>
                    </div>
                    <div className="work-properties" style={{ height: "10%", marginTop: 30 }}>
                        <label className="work-property-label" >Font Size: </label>
                        <Range max="100" min="0" name="points" style={{ top: -15 }} />
                    </div>
                    <div className="work-properties" style={{ height: "10%" }}>
                        <label className="work-property-label" >Border Thickness </label>
                        <Range max="100" min="0" name="points" style={{ top: -15 }} />
                    </div>
                    <div className="work-properties" style={{ height: "10%" }}>
                        <label className="work-property-label" >Border Radius </label>
                        <Range max="100" min="0" name="points" style={{ top: -15 }} />
                    </div>
                    <div className="work-properties" style={{ marginTop: 25 }}>
                        <label className="work-property-label" >Background:</label>
                        <ColorPicker />
                    </div>
                    <div className="work-properties">
                        <label className="work-property-label" >Border Color:</label>
                        <ColorPicker />
                    </div>

                </div>
            </div>
        );
    }
}

export default ToolMapRight;