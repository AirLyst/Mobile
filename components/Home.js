import React, { Component } from 'react';
import axios from 'axios'
import PropTypes from 'prop-types'
import jwt_decode from 'jwt-decode'
import { 
  AppRegistry, 
  SectionList,
  StyleSheet, 
  Text, 
  View, 
  FlatList,
  Image,
  TextInput,
  NavigatorIOS,
  TouchableOpacity,
  AppState,
  AsyncStorage
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import ListingDetails from './ListingDetails'
import NavigationBar from './NavigationBar'
import { ifIphoneX } from 'react-native-iphone-x-helper'

import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Ionicons } from '@expo/vector-icons'

import Profile from './Profile'

import RecentFlatList from './Home/RecentFlatList'
import ShopByBrand from './Home/ShopByBrand'
import ShopByCategory from './Home/ShopByCategory'

import Chat from './Chat'

class Home extends Component {
  
    state = {
      listings: [],
      currentTab: 'home'
    }

    async componentWillMount() {
      this.queryListings()
    }
  
    queryListings = () => {
      axios.get('http://fierce-sands-22150.herokuapp.com/api/listing/recents/22')
      .then(res => {
        this.setState({ listings: res.data})
      })
      .catch(err => {
        console.log(err)
      })
    }

    onPress = item => {
      Actions.push('listing', { item })
    }

    _goToProfile = async () => {
      const token = await AsyncStorage.getItem('@token')
      if(token){
        this.setState({ currentTab: 'profile' })
      } else {
        this.setState({ currentTab: 'home' })
        Actions.push('login')
      }
    }

    _goToHome = () => {
      if(this.state.currentTab !== 'home') {
        this.setState({ currentTab: 'home' })
      }
    }

    _goToMessages = () => {
      if(this.state.currentTab !== 'messages') {
        this.setState({ currentTab: 'messages' })
        
      }
    }

    _getRoute = () => {
      switch(this.state.currentTab) {
        case 'home':
          return <View><RecentFlatList /><View style={styles.emptySpace}/><ShopByBrand /><View style={styles.emptySpace}/><ShopByCategory /></View>
          break;
        case 'profile':
          return <Profile onLogout={this._goToHome}/>
          break;
        case 'messages':
          return <Chat />
          break;
      }
    }

    onChangeText = todo => this.setState({ todo })
    render() {
      return (
        <View style={styles.homeContainer}>
          {this._getRoute()}
          <BottomNavigation
            labelColor='#E5B376'
            rippleColor='#777'
            style={styles.bottomNavigation}            
            onTabChange={(newTabIndex) => alert(`New Tab at position ${newTabIndex}`)}
          >
            <Tab
              barBackgroundColor='white'
              label='Home'
              icon={<Ionicons size={24} color='#E5B376' 
              name={this.state.currentTab === 'home' ? 'ios-home' : 'ios-home-outline'}/>}
              onPress={this._goToHome}
            />
            <Tab
              barBackgroundColor='white'
              label='Messages'
              icon={<Ionicons size={24} color='#E5B376' 
                name={this.state.currentTab === 'messages' ? 'ios-chatbubbles' : 'ios-chatbubbles-outline'}/>}
              onPress={this._goToMessages}
            />
            <Tab
              barBackgroundColor='white'
              label='Profile'
              icon={<Ionicons size={24} color='#E5B376' 
                name={this.state.currentTab === 'profile' ? 'ios-ionitron' : 'ios-ionitron-outline'}/>}
              onPress={this._goToProfile}
            />
          </BottomNavigation>            
        </View>
      )
    }
  }
  

  const styles = StyleSheet.create({
    homeContainer: {
      ...ifIphoneX({ paddingTop: 50}, {paddingTop: 20} ),
      flex: 1
    },
    bottomNavigation: { 
      height: ifIphoneX(86, 56), 
      elevation: 8, 
      position: 'absolute', 
      left: 0, 
      bottom: 0, 
      right: 0,
      paddingBottom: 0,
      borderTopWidth: 1,
      borderColor: '#eee'
     },
     emptySpace: {
       height: 30
     }
  })
  
  export default Home
