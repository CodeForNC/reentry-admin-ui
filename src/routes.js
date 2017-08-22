import React from 'react';
import PropTypes from 'prop-types';
// import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { ApolloProvider } from 'react-apollo';

// GraphQL Client
import { client } from './utilities/gqlClient';

// Routed components
import App from './app/App';
import Home from './app/Home';

const Routes = props => (
  <ApolloProvider store={props.store} client={client} >
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
      </Route>
    </Router>
  </ApolloProvider>
);

Routes.propTypes = {
  /* eslint-disable */
  store: PropTypes.object.isRequired, 
};

export default Routes;

