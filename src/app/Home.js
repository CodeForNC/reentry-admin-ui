import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReentryAdminHome from './ReentryAdminHome';
import { loginLinkClicked } from '../utilities/auth/authActions';

const isValidUser(email) {
  // Need to look up in our user list and verify
  return true;
}

const Homepage = props => (
  <div>
    {!props.user.loggedIn &&
      <div>
        Welcome to Reentry Resources Hub Administration Tool. Please <a href="#" onClick={(e) => { e.preventDefault(); props.dispatch(loginLinkClicked()); }} className="">log in</a>.
      </div>
    }
    {props.user.loggedIn && !isValidUser(props.user.email) &&
      <div>Invalid user</div>
    }
    {props.user.loggedIn && isValidUser(props.user.email) &&
      <ReentryAdminHome {...props} />
    }
  </div>
);

const mapStateToProps = state => (
  {
    user: state.auth.user,
  }
);

const mapDispatchToProps = dispatch => (
  {
    dispatch,
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);