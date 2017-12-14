import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, TouchableOpacity, AsyncStorage, AppState } from 'react-native'
import jwt_decode from 'jwt-decode'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import Login from './Login'
import Profile from './Profile'
import { Actions } from 'react-native-router-flux'

export default class NavigationBar extends Component {

  _goToProfile = async () => {
    const token = await AsyncStorage.getItem('@token')
    if(token){
      Actions.push('profile')
    } else {
      Actions.push('login')
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this._goToProfile}
          style={styles.buttonStyle}
          navigator={this.props.navigator}>
          <FontAwesome name="user-circle" style={styles.profileIcon}/>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={this.goToProfile}
        style={styles.buttonStyle}>
          <Ionicons name="ios-search" style={styles.searchIcon}/>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,
    width: '100%',
    paddingHorizontal: 5
  },
  buttonStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  profileIcon: {
    fontSize: 25,
    color: '#E5B376',
  },
  searchIcon: {
    fontSize: 28,
    color: '#E5B376'
  }
})