/**
 * BY THUNDERBIRD7
 * FoolStack Developer
 */

import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Modal, 
  TouchableHighlight,
  TouchableOpacity,
  RefreshControl,
  Platform,
} from 'react-native'
import { 
  Container, 
  Content, 
  Header, 
  Title, 
  List, 
  ListItem,
  Thumbnail,
  H3,
  H1,
  Spinner,
} from 'native-base'
import ModalView from './ModalView'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import codePush from 'react-native-code-push'
import theme from './theme'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import FeaturedPage from './Featured'
import ChartsPage from './Charts'
import DefaultTabbar from './DefaultTabbar'

const codePushOptions = { 
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  updateDialog: true,
  installMode: codePush.InstallMode.IMMEDIATE
 }
class App extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    codePush.checkForUpdate()
    .then((update) => {
      if (!update) {
        alert('You running on lastest version!')
        console.log('Up to date!')
      } else {
        console.log('An update is available!')
      }
    })
    .catch((e)=>{
      console.error(e)
    })
  }

  render() {
    return (
    <ScrollableTabView 
      tabBarPosition="bottom" 
      renderTabBar={() => <DefaultTabbar backgroundColor="#424242" />}>
      <FeaturedPage tabLabel="Featured" />
      <ChartsPage tabLabel="Top Charts" />
    </ScrollableTabView>
    )
  }

}

// wrap codepush to container.
export default codePush(codePushOptions)(App)