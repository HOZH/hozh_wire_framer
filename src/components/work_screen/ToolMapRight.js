import React, { Component } from 'react';
import { TextInput, Range, Button } from 'react-materialize';
import ColorPicker from './ColorPicker'
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';


const updateButtonStyle = {

    marginLeft: "30%",
    backgroundColor: "grey",



}

class ToolMapRight extends Component {

    constructor(props) {
        super(props)
        console.log(1234)
        console.log(this.props)
        this.state =
        {
            height:this.props.work.height+"",
            width: this.props.work.width + "",

            title: 1,
            disable:true
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

    updateTitle = (e) => {

        console.log(e.target.name)

        this.setState({

            // title
            [e.target.name]: e.target.value
            // e.target.value
        })
        console.log(this.state)

    }

    updateDim= (e)=>{

        
        if (Number.isInteger(Number(this.state.height)) && Number.isInteger(Number(this.state.height)) && this.state.height <= 5000 && this.state.height>=1 &&
            Number.isInteger(Number(this.state.width)) && Number.isInteger(Number(this.state.width)) && this.state.width <= 5000 && this.state.width >= 1){
          console.log('updating dim')
          console.log(e)
          console.log(this.state)
          this.props.updateDim(this.state.height, this.state.width)
      }
        this.setState({disable:true})
        console.log(this.state.disable)
    }



    render() {

        console.log('my editing work = ')
        console.log(this.props.work)
        console.log(this.props.work.height)



        return (
            <div className="col s3 total-toolmap">
                <div className="tool-map row" style={{ height: "110%" }}>

                    <div className="work-properties">
                        <div className="work-property-label" >Height</div>
                        <TextInput value={this.state.height} name="height" className="work-input" onChange={this.handleChange} />
                    </div>
                    <div className="work-properties">
                        <div className="work-property-label" >Width</div>
                        <TextInput value={this.state.width} name="width" className="work-input" onChange={this.handleChange} />
                    </div>

                    <div className="work-properties">


                        <Button
                            node="button"
                            className={this.state.disable ? "work-top-button disabled" : "work-top-button"}
                            style={updateButtonStyle}
                            onClick={this.updateDim}

                        >
                            Update
                    </Button>

                    </div>






                    <div className="work-properties" style={{}}>
                        <label className="work-property-label" >Font Size: </label>
                        <Range max="100" min="0" name="points" />
                    </div>
                    <div className="work-properties" >
                        <label className="work-property-label" >Background:</label>
                        <ColorPicker />
                    </div>
                    <div className="work-properties">
                        <label className="work-property-label" >Border Color:</label>
                        <ColorPicker />
                    </div>
                    <div className="work-properties">
                        <label className="work-property-label" >Border Thickness </label>
                        <Range max="100" min="0" name="points" />
                    </div>
                    <div className="work-properties">
                        <label className="work-property-label" >Border Radius </label>
                        <Range max="100" min="0" name="points" />
                    </div>
                    <div className="work-properties"></div>
                </div>
            </div>
        );
    }
}

// const mapStateToProps = (state) => {
//     return {
//         auth: state.firebase.auth,
//     };
// };



// export default compose(
//     connect(mapStateToProps),
//     firestoreConnect([
//         { collection: 'workLists' },
//     ]),
// )(ToolMapRight);
export default ToolMapRight;