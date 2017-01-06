import React, { Component } from 'react';
import {Alert, Text, ScrollView, TouchableHighlight, View } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form'

import styles from './styles';


export default class NewPhoto extends Component {
  constructor () {
    super()
  }
  render() {
    return (
      <View style={styles.homeContainer}>
        <Text style={styles.pageTitle}> Upload Photo</Text>
        <Text style={styles.pageDescription}>
          Add a new photo
        </Text>
        <Button
          reverse
          iconRight
          backgroundColor= '#FFC107'
          icon={{name: 'navigate-next'}}
          title='SAVE'
          onPress={()=> {Actions.pop()}}/>
      </View>
    );
  }
}