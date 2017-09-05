import React, { Component } from 'react';

import Adminv2ContainerComponent from './Adminv2ContainerComponent';


//1
import  { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';

//2
// this client is going to describe the network layer between the application and the graphql server
const client = new ApolloClient({
	networkInterface: createNetworkInterface({
		uri: 'http://pokeapi-graphiql.herokuapp.com/'
	})

});

//3


export default class Adminv2ContainerComponent extends Component {
	render() {

		return <ApolloProvider client={client}>
			<Adminv2ContainerComponent />
			   </ApolloProvider>
	}
}
