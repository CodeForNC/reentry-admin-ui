import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { browserHistory } from 'react-router';
import { RadioGroup, Radio } from 'react-radio-group';
import TestPage from './TestPage';
import LoadingAnimation from '../shared/LoadingAnimation';

const EmployeeHome = (props) => {
  if (props.data.loading) { // eslint-disable-line react/prop-types
    return <LoadingAnimation />;
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
    return <Employees {...props} />
  }

  return (
    <div className="row">
      <div className="col-sm-12">
        {displayContents()}
      </div>
    </div>
  );
};

const getEmployeeQuery = gql`
  query getEmployeeQuery {
    employee {
      id
      employees {
        id
      }
    }
  }
`;

export default graphql(getEmployeeQuery, {})(EmployeeHome);