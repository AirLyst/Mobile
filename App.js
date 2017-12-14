import React, { Component } from 'react';
import axios from 'axios'
import PropTypes from 'prop-types'
import { 
  StyleSheet,
  AsyncStorage
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { Actions } from 'react-native-router-flux'

import { Router, Stack, Scene } from 'react-native-router-flux'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Profile from './components/Profile'
import FullChat from './components/FullChat'
import CreateListing from './components/CreateListing'
import ListingDetails from './components/ListingDetails'

export default class NavigatorIOSApp extends Component {
  state = {
    authenticated: false
  }

  isAuthenticated = async () => {
    try {
      const token = await AsyncStorage.getItem('@token')
      if(token) {
        Actions.push('profile')
        this.setState({ isAuthenticated: true })
        return true
      } else {
        Actions.push('login')
        this.setState({ isAuthenticated: false })
        return false
      }
    }
    catch(e) {
      return false
    }
  }

  loginBackButton = () => {
    return <FontAwesome 
      name="home" 
      style={styles.backIcon}
      onPress={() => Actions.pop()}/>
  }

  render() {
    return (
      <Router sceneStyle={styles.sceneStyle}>
        <Stack key='root'>
          <Scene 
            key='home' 
            title='AIRLYST' 
            titleStyle={styles.titleStyle}            
            component={Home}
            hideNavBar
            initial/>
          <Scene 
            title='LOGIN'
            key='login' 
            component={Login}
            navBarButtonColor='white'
            backButtonTintColor='white'
            backButtonTextStyle={styles.backButtonTextStyle}
            titleStyle={styles.titleStyle}
            renderBackButton={this.loginBackButton}
            backTitle='CANCEL'
            navTransparent/>
          <Scene 
            key='signup' 
            title='SIGNUP'
            component={Signup}
            navBarButtonColor='white'
            backButtonTintColor='white'
            backButtonTextStyle={styles.backButtonTextStyle}
            titleStyle={styles.titleStyle}
            renderBackButton={this.loginBackButton}
            navTransparent/>
            <Scene 
            key='profile' 
            title='PROFILE'
            component={Profile}
            navBarButtonColor='white'
            backButtonTintColor='white'
            backButtonTextStyle={styles.backButtonTextStyle}
            titleStyle={styles.titleStyle}
            renderBackButton={this.loginBackButton}
            navTransparent/>  
            <Scene 
            key='listing' 
            title='Listing Detail'
            component={ListingDetails}
            navBarButtonColor='#555'
            hideNavBar
            navTransparent/>  
            <Scene 
            key='fullchat' 
            title='Listing Detail'
            component={FullChat}
            navBarButtonColor='#555'
            hideNavBar
            navTransparent/>
            <Scene 
              key='createListing' 
              title='Create Listing'
              component={CreateListing}
              navBarButtonColor='#555'
              hideNavBar
              navTransparent/>
        </Stack>
      </Router>
    )
  }
}

const styles = StyleSheet.create({
  sceneStyle: {
    backgroundColor: 'white'
  },
  backIcon: {
    fontSize: 20,
    color: 'white',
    paddingLeft: 15,
    marginBottom: 5
  },
  backButtonTextStyle: {
    color: 'white', 
    letterSpacing: 2, 
    fontSize: 10
  },
  titleStyle: {
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 2
  },
  navBarStyle: {
    backgroundColor: '#e5b376'
  }
})