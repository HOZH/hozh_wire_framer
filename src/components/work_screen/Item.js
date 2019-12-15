import React, { Component } from 'react'
import Drag from './Drag'

export default class Item extends Component {

    componentDidMount(){
        // console.log(12234,this.state,this.props);
        // console.log(313,this.state);
        // console.log(313,this.props);
        this.setState({item:this.props.item})

      }
    

    constructor() {


    
  
        super()
        console.log(this.props);
    
        this.state = {
          item:null
      }
    
    }
    

 
    
    render() {

        // console.log("item page",this.state,this.props)
        return (
            <div>
        
                {/* <Drag item={this.state.item}></Drag> */}


                <Drag item={this.props.item}></Drag>

                {/* <Drag 
                                left={this.props.item.position.left}

                                top={this.props.item.position.top}

                height={this.props.item.position.height}
                width={this.props.item.position.width}

                ></Drag> */}

                
            </div>
        )
    }
}
