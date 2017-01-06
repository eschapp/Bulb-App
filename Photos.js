import React, { Component } from 'react';
import {Alert, ListView, Text, ScrollView, TouchableHighlight, View } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import {Actions} from 'react-native-router-flux';

import styles from './styles';


export default class Photos extends Component {
  constructor (props) {
    super(props)
  }
  render() {
    return (
      <View style={styles.homeContainer}>
        <Text style={styles.pageTitle}>Photos</Text>
        <Text style={styles.pageDescription}>
          These are your photos
        </Text>
        <View style ={styles.newProjectsHolder}>
          <Text style ={styles.newProjectsText}>UPLOAD PHOTOS</Text>
          <Icon
            name='add'
            color='#212121'
            size={25}
            onPress={()=> {Actions.newPhotoModal()}}/>
        </View>
        <Button
          raised
          icon={{name: 'arrow-back'}}
          title='Back'
          backgroundColor= '#FFC107'
          onPress={()=> {Actions.pop()}}/>
      </View>
    );
  }
}
