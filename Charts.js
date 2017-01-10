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
  Image,
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
  Badge,
  Card, 
  CardItem,
  Button,
  Icon,
} from 'native-base'
import ModalView from './ModalView'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import theme from './theme'

class Charts extends Component {

  state = {
    modalVisible: false,
    title: '',
    detail: '',
    refreshing: false,
  }

  constructor(props) {
    super(props)
  }

  onRefresh() {
    // begin refresh
    this.setState({refreshing: true})
    // call refetch function
    this.props.data.refetch()
    .then(()=>{
      // refetch complete.
      this.setState({refreshing: false})
    })
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  renderRow(item) {

    const detailString = `
      ---- ${item.node.name} ----
      Model: ${item.node.model}
      Class: ${item.node.starshipClass}
      Crew: ${item.node.crew}
      Passengers: ${item.node.passengers}
      Cost: ${item.node.costInCredits}
    `

    let manufacturers = item.node.manufacturers
    manufacturers.map((item)=>{
      console.log(item)
    })

    return (
        <ListItem style={{flexDirection: 'row', alignItems: 'center'}} onPress={()=> {
            this.setModalVisible(true)
            this.setState({title: item.node.name, detail: detailString})
        }}>
            <Thumbnail circular size={100} style={{backgroundColor: 'dimgray', resizeMode: 'cover'}} />
            <H3 style={{color: 'goldenrod'}}>{item.node.name}</H3>
            <Text style={{color: 'dimgray'}} note>MODEL {item.node.model}</Text>
            <Text style={{color: 'dimgray'}} note>CLASS {item.node.starshipClass}</Text>
        </ListItem>
    )
  }

  render() {
    // get allfilms props from graphql
    const data = this.props.data
    console.log(data)

    if (data.loading) {
      return (<Spinner />)
    } else {
      return (
        <Container theme={theme} >
          <Header><Title> Top Charts</Title></Header>
          <Content style={{backgroundColor: '#212121'}} refreshControl={
            <RefreshControl
              tintColor='white'
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
             />
          }>
            
            <List
              dataArray={data.allStarships.edges} 
              renderRow={this.renderRow.bind(this)} />           

            <ModalView 
              title={this.state.title}
              detail={this.state.detail}
              visible={this.state.modalVisible} 
              onDismiss={()=> this.setModalVisible(false)}/>              
          </Content>        
        </Container>
        )
      } 
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const gqlQuery = gql`
  query {
    allStarships {
      edges {
        node {
          id
          name
          model
          starshipClass
          manufacturers
          crew
          passengers
          maxAtmospheringSpeed
          hyperdriveRating
          costInCredits
        }
      }
    }
  }
`

// wrap gql to container. 
export default graphql(gqlQuery)(Charts)