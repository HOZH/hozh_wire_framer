import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import Banner from '../home_screen/Banner'
import { loginHandler } from '../../store/database/asynchHandler'

class LoginScreen extends Component {
  state = {
    email: '',
    password: '',
  }

  doChange = (e) => {
    const { target } = e;

    this.setState(state => ({
      ...state,
      [target.id]: target.value,
    }));
  }

  doSubmit = (e) => {
    e.preventDefault();

    let { props, state } = this;
    let { firebase } = props;
    let credentials = { ...state };
    const authData = {
      firebase,
      credentials,
    };

    props.login(authData);
  }

  render() {
    let { auth, authError } = this.props;
    if (auth.uid) {
      return <Redirect to={"/"+auth.uid+"" }/>;
    }

    return (
      <div className="container">
        <div className="row">
          <form onSubmit={this.doSubmit} className="col s4 white">
            <h5 className="grey-text text-darken-3">Login</h5>
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input className="active" type="email" name="email" id="email" onChange={this.doChange} />
            </div>
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input className="active" type="password" name="password" id="password" onChange={this.doChange} />
            </div>
            <div className="input-field">
              <button type="submit" className="btn pink lighten-1 z-depth-0">Login</button>
              {authError ? <div className="red-text center"><p>{authError}</p></div> : null}
            </div>
          </form>
          <div className="col s8">
            <Banner />
          </div>
          
        </div>
      </div>
    );
  }
}

const mapStateToProps = sub_state => {
  console.log(sub_state)
  
  return {
    authError: sub_state.auth.authError,
    auth: sub_state.firebase.auth,
  }
};

const mapDispatchToProps = dispatch => ({
  login: authData => dispatch(loginHandler(authData)),
});

// We need firebaseConnect function to provide to this component
// firebase object with auth method.
// You can find more information on the link below
// http://docs.react-redux-firebase.com/history/v3.0.0/docs/auth.html
export default compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps),
)(LoginScreen);