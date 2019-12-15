import React, { Component } from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Icon, Button } from 'react-materialize';

import Item from "./Item"



class DisplayPlace extends Component {


    render() {
        console.log(this.props.state)
        const items = this.props.state.work.items;
        return (
            <div className="col s6 display-place total-toolmap" >
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
                                    className="col s3 work-top-button"
                                    icon={<Icon>zoom_in</Icon>}
                                    onClick={zoomIn}>
                                </Button>
                                <Button small
                                    waves="red"
                                    node="button"
                                    className="col s3 work-top-button"

                                    icon={<Icon>zoom_out</Icon>}
                                    onClick={zoomOut}>
                                </Button>
                            </div>
                            <TransformComponent style={{background:"white"}} >
                                <div style={{ height: "100%", width: "100%" }}>
                                    <div className="display-board center" style={{
                                        width: this.props.state.work.screenWidth + "px",
                                        height: this.props.state.work.screenHeight + "px",
                                        zIndex: 3,
                                        background:"white"
                                    }}
                                        onClick={this.props.handleUnselect}>
                                        {
                                            items && items.map(item => (
                                                <Item item={item} key={item.id}
                                                    handleSelect={this.props.handleSelect}
                                                    handleWorkModified={this.props.handleWorkModified}
                                                    state={this.props.state} />
                                            ))
                                        }
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