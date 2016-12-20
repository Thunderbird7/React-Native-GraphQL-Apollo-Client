/**
 * BY THUNDERBIRD7
 * FoolStack Developer
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import App from './App'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

const networkInterface = createNetworkInterface({
  uri: 'http://graphql-swapi.parseapp.com'
})

const client = new ApolloClient({ networkInterface })
export default class Apollo extends Component {

  render() {
    return (
      <ApolloProvider client={client}>
        <App/>
      </ApolloProvider>
    )
  }
}

AppRegistry.registerComponent('Apollo', () => Apollo);
