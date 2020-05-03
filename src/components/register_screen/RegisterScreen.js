import React, {Component} from 'react';
import {connect} from 'react-redux';
import {firebaseConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';
import {registerHandler} from '../../store/database/asynchHandler'

class RegisterScreen extends Component {
    state = {
        email: '',
        password: '',
        type: "designer",
        firstName: '',
        lastName: '',
    }

    doChange = (event) => {
        let {target} = event;
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
    }

    doSubmit = (event) => {
        event.preventDefault();
        let {props, state} = this;
        let {firebase} = props;
        let newUser = {...state};
        props.register(newUser, firebase);
    }

    render() {
        let {auth, authError} = this.props;
        console.log(auth)
        // if (authError) console.log(authrError)
        if (auth.uid) {
            return <Redirect to="/"/>;
        }

        return (
            <div className="container">
                <form onSubmit={this.doSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Register</h5>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" onChange={this.doChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" onChange={this.doChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" name="firstName" id="firstName" onChange={this.doChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" name="lastName" id="lastName" onChange={this.doChange}/>
                    </div>
                    <div className="input-field">
                        <button type="submit" className="btn pink lighten-1 z-depth-0">Sign Up</button>
                        {authError ? <div className="red-text center"><p>{authError}</p></div> : null}
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = sub_state => ({
    auth: sub_state.firebase.auth,
    authError: sub_state.auth.authError,
});

const mapDispatchToProps = dispatch => ({
    register: (newUser, firebase) => dispatch(registerHandler(newUser, firebase)),
});

export default compose(
    firebaseConnect(),
    connect(mapStateToProps, mapDispatchToProps),
)(RegisterScreen);