import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { browserHistory } from 'react-router';
import { RadioGroup, Radio } from 'react-radio-group';
import LoadingAnimation from '../shared/LoadingAnimation';
import Adminv2ContainerComponent from './adminv2/Adminv2ContainerComponent';

const MainHome = (props) => {
  if (props.data.loading) { // eslint-disable-line react/prop-types
    return;
  }
  if (props.data.error) { // eslint-disable-line react/prop-types
    return <p>{props.data.error.message}</p>; // eslint-disable-line react/prop-types
  }

  const refreshLocation = (value) => {
    browserHistory.push([props.location.pathname, '?mode=', value].join(''));
  };

  const displayContents = () => {
    // Logic here could test user type (superuser vs locale admin)
    // and configure the page accordingly.
    return (
      <div>
        <h2>Welcome to Reentry Hub Administration {props.data.version}</h2>
        <p> Our jurisdiction is {props.data.config.pairs[0].value}</p>
      </div>
    )
  }

  return (
    <div className="row">
      <div className="col-sm-12">
        {displayContents()}
      </div>
        <Adminv2ContainerComponent />
    </div>
  );
};

const getPlatformConfigQuery = gql`
  query  {
    version
    config {
      pairs {
        name
        value
      }
    }
  }
`;

export default graphql(getPlatformConfigQuery, {})(MainHome);