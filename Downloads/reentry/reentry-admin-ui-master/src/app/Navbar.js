import React from 'react';
import { IndexLink, Link } from 'react-router';
import Icon from '../shared/Icon';
import { IM_SEARCH } from '../shared/iconConstants';
import AuthControl from '../utilities/auth/authControl';

export const Navbar = (props) => (
  <div>
    <nav className="navbar navbar-default" style={{ backgroundColor: '#f6fcff'}}>
      <div className="container-fluid">
        <div className="pull-left" style={{ marginRight: '5px', marginTop: '5px', marginBottom: '5px' }}>
          <IndexLink to="/">TBD-LOGO</IndexLink>
        </div>
        <div className="navbar-header">
          <div className="pull-left">
            <IndexLink to="/" className="navbar-brand nounderline" >
              <span style={{ fontSize: '30px', marginBottom: '-10px' }}> Reentry Resources Administration
              </span>
              <br />
              <span style={{ fontStyle: 'italic', fontSize: '13px' }}>Reentry Resources Administration</span>
            </IndexLink>
          </div>
        </div>
        <div className="pull-right" style={{ paddingTop: '15px' }}>
          <AuthControl />
        </div>
      </div>
    </nav>
  </div>
);

export default Navbar;
