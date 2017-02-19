import React, { Component } from 'react';
import { Alert, ListView, Text, ScrollView, TouchableHighlight, View } from 'react-native';
import { Button, Icon, CheckBox } from 'react-native-elements';
import { Actions, ActionConst } from 'react-native-router-flux';
import axios from 'axios';

import api from './api';
import styles from './styles';

var alertMessage = 'Are you sure that you want to delete this material? ';

export default class Materials extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      ds,
      materialsList: ds.cloneWithRows([])
    }
  }

  componentDidMount(props) {
    console.log('projectId: ' + this.props.id);
    console.log('scene name: ' + this.props.name);
    this.getMaterials()
  }

  getMaterials() {
    axios.get(api() + '/projects/' + this.props.id + '/materials')
      .then((response) => {
        let materialsList = this.state.ds.cloneWithRows(response.data);
        console.log(materialsList);
        this.setState ({materialsList})
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  deleteMaterial(material) {
    console.log(material);
    axios.delete(api() + '/projects/' + material.projectId + '/materials/' + material.id)
    .then((response) => {
      console.log('deleted');
      this.getMaterials()
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  toggleChecked(material) {
    console.log(material.checked);
    var materialChecked = material.checked
    console.log(materialChecked);
    axios.patch(api() + '/projects/' + material.projectId + '/materials/' + material.id, material)
    .then((response) => {
      console.log(material);
      this.getMaterials()
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    var br = <Text>{"\n"}</Text>
    const deleteIcon = <Icon
      style={styles.itemRowButton}
      name='delete'
      size={25}
      color='#242424'
      onPress={()=> this.deleteMaterial(material)
    }/>

    return (
      <View style={styles.contentContainer}>
        <View style={styles.topBanner}>
          <Text style={styles.title}>BULB</Text>
        </View>

        <View style ={styles.newItemsHolder}>
          <Text style ={styles.newItemsText}>Materials</Text>
          <Button
            raised
            icon={{name: 'md-add', type: 'ionicon', buttonStyle: styles.newButton }}
            title='New Material'
            color='#fcfcfc'
            backgroundColor='#2ed2ff'
            buttonStyle= {styles.newButton}
            onPress={()=> {Actions.newMaterialModal()}} />
        </View>

        <View>
          <ListView
            style={styles.itemsList}
            enableEmptySections={true}
            dataSource={this.state.materialsList}
            renderRow={
              (material) => {
                console.log(material);
                return (
                    <View style={styles.checkboxContainer} onPress={()=> {Actions.materialModal({projectId: this.props.id, id: material.id})}} >
                      <CheckBox
                        title= {material.name + ' ' + material.quantity}
                        checked={material.checked}
                        checkedColor='#00CCFF'
                        onIconPress={()=> this.toggleChecked(material)}
                        onPress={()=> {Actions.materialModal({projectId: this.props.id, id: material.id})}}
                        style={styles.checkbox} />
                      <View style={styles.itemDelete}>
                        <Icon
                          style={styles.itemDelete}
                          name='delete'
                          size={22}
                          color='#242424'
                          onPress={()=> this.deleteMaterial(material)} />
                      </View>
                    </View>
                )
              }
            }
          />
        </View>

        <View style={styles.spTabs}>
          <View style={styles.backTabButton}>
            <Icon
              name='md-arrow-back'
              type='ionicon'
              color='#242424'
              onPress={()=> {Actions.popTo('singleProject')}} />
          </View>
          <View style={styles.homeTabButton}>
            <Icon
              name='home'
              type='octicon'
              color='#242424'
              onPress={()=> {Actions.tabbar({type: ActionConst.RESET})}} />
          </View>
        </View>

      </View>
    );
  }
}
