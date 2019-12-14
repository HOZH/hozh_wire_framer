import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

let sandboxStyle = 
{ 
    border: "1px black solid",
 backgroundColor: "white",
  width: 301, height: 200 
  ,
    writable: true

}
class DisplayPlace extends Component {

    

    
   


    render() {

        console.log('display123')
        // sandboxStyle.width=100
        console.log(this.props)
        console.log(this.props.work)
        console.log(this.props.work.height)

        return (
            <div className="col s6 display-place total-toolmap">

                <Scrollbars style={{ backgroundColor: "aqua" }} autoHide={false} autoHideTimeout={500} autoHideDuration={200}>
                    <div style={{
                        border: "1px black solid",
                        backgroundColor: "white",
                        width: this.props.tempWidth ? this.props.tempWidth + "px" : this.props.work.width + "px",
                        //  height: this.props.work.height? this.props.work.height+"px":400+"px"
                        height: this.props.tempHeight ? this.props.tempHeight + "px" : this.props.work.height + "px"

                     
    }}>{this.props.tempHeight}</div>
                </Scrollbars>
            </div>
        );
    }
}

export default DisplayPlace;