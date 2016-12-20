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
  ScrollView
} from 'react-native'
import { 
  Container, 
  Content, 
  Header, 
  Title, 
  H1,
  Button,
} from 'native-base'

const styles = StyleSheet.create({
  container: {
    marginTop: 64,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'lightblue'
  }
})

const ModalView = (props) => {
  return (
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={props.visible}
        onRequestClose={() => {alert("Modal has been closed.")}}
        >
        <View style={styles.container}>
        <ScrollView>
          <H1>{props.title}</H1>
            <Text>{props.detail}</Text>
        </ScrollView>
          <View style={{top: 20}}>
            <Button block danger onPress={() => props.onDismiss()}>Dismiss</Button> 
          </View>  
        </View>
      </Modal>
  )
}

export default ModalView