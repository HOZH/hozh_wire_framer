import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import LoggedInLinks from './LoggedInLinks';
import LoggedOutLinks from './LoggedOutLinks';

class Navbar extends React.Component {

  render() {
    const { auth, profile } = this.props;
    const links = auth.uid ? <LoggedInLinks profile={profile}  auth={auth}/> : <LoggedOutLinks />;
    const databaseTester = auth.uid&&profile.type=="admin" ? (<Link to="/admin" className="tester">databseTester</Link>):"";

    console.log('123',profile)

    return (
      <nav className="nav-wrapper grey darken-3">
        <div className="container">
          <Link to={"/"+auth.uid+""} className="brand-logo" >Wireframer!</Link>
          {/* <Link to="/admin" className="tester">databseTester</Link> */}
          {databaseTester}
          {links}
        </div>
      </nav>
    );
  };
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
});

export default compose(
  firebaseConnect(),
  connect(mapStateToProps),
)(Navbar);