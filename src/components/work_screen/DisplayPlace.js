import React, { Component } from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Icon, Button, Modal, TextInput } from 'react-materialize';


import Drag from './Drag'



class DisplayPlace extends Component {
    state = {
        ratio: 1,
    }

    render() {
        return (
            <div className="col s6 display-place total-toolmap" style={{backgroundColor:"aqua"}}>

                <TransformWrapper
                    defaultScale={1}
                    defaultPositionX={200}
                    defaultPositionY={100}
                    wheel={false}
                >
                    {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                        <React.Fragment>
                            <div className="zoom-tool">
                                <Button small
                                    waves="red"
                                    node="button"
                                    className="col s3 work-top-button zoomBtIn"
                                    icon={<Icon>zoom_in</Icon>}
                                    onClick={zoomIn}
                                    style={{
                                        
                                    }}
                                    >
                                </Button>
                                <Button small
                                    waves="red"
                                    node="button"
                                    className="col s3 work-top-button zoomBtOut"

                                    icon={<Icon>zoom_out</Icon>}
                                    onClick={zoomOut}>
                                </Button>
                            </div>
                            <TransformComponent style={{width:"100%"}}>
                                <div style={{ height: "100%", width: "100%" }}>
                                    <div className="display-board center" style={{
                                        border: "1px black solid",

                                        backgroundColor:"white",
                                        width: this.props.tempWidth ? this.props.tempWidth + "px" : this.props.work.width + "px",
                                        //  height: this.props.work.height? this.props.work.height+"px":400+"px"
                                        height: this.props.tempHeight ? this.props.tempHeight + "px" : this.props.work.height + "px",
                                        // width: this.props.state.screenWidth + "px",
                                        // height: this.props.state.screenHeight + "px",
                                        zIndex: 3,
                                    }}>
                                        {this.props.tempHeight}
                                        <br></br>
                                        {this.props.tempWidth} 

                                        <Drag></Drag>
                                    </div>
                                </div>
                            </TransformComponent>
                        </React.Fragment>
                    )}
                </TransformWrapper>

            </div>
        );
    }
}

export default DisplayPlace;