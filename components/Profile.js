import React, { Component } from 'react'
import { View, Text, StyleSheet, AsyncStorage, Image, FlatList, TouchableOpacity, Animated } from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Actions } from 'react-native-router-flux'
import jwt_decode from 'jwt-decode'
import Home from './Home'

export default class Profile extends Component {
  state = {
    user: {},
    fadeAnim: new Animated.Value(0)
  }

  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 500,
      }
    ).start()
  }
  
  async componentWillMount() {
    try {
      const token = await AsyncStorage.getItem('@token')
      if(token) {
        this.setState({ 
          isAuthenticated: true,
          user: jwt_decode(token)
        })
      }
      console.log(this.state.user)
    }
    catch(e) {
      console.log(e)
    }
  }

  _onLogout = async () => {
    try {
      await AsyncStorage.removeItem('@token')
      this.props.onLogout()
    }
    catch(e) {
      console.log(e)
    }
  }

  handleRoute = route => {
    switch(route) {
      case 'listings':
        return <Listings />
      case 'favorites':
        return <Listings data={this.queryFavorites()} />
      case 'completed':
        return <Listings data={this.queryCompleted()} />
      case 'settings':
        return <Settings />
      case 'createListing':
        Actions.push('createListing')
    }
  }
  render() {
    let containerAnimation = {
      opacity: this.state.fadeAnim,
      transform: [{
        translateY: this.state.fadeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [10, 0]
        })
      }]
    }
    return (
      <Animated.View style={[styles.container, containerAnimation]}>

        <View style={styles.profileContainer}>
          <Text style={styles.profilePictureBubble}>
            {this.state.user.profile_picture === ''
              ? <View style={styles.profileTextBubbleContainer}>
                  <Text style={styles.profileTextBubble}>{this.state.user.firstName[0].toUpperCase()}</Text>
                </View>
              : <Image source={{uri: this.state.user.profile_picture}} style={styles.profilePic}/>
            }
            {this.state.user.firstName &&  `${this.state.user.firstName.toUpperCase()} ${this.state.user.lastName.toUpperCase()}`}
          </Text>
          <View style={styles.profileName}>
            <Text style={styles.fullName}>{this.state.user.firstName}</Text>
            <Text style={styles.editPicture}>Edit Profile Picture</Text>
          </View>
        </View>

        <View style={styles.profileOptionContainer}>
          <TouchableOpacity style={styles.profileOption} onPress={() => this.handleRoute('createListing')}>
            <Text style={styles.profileOptionText}>Create Listing</Text>
            <Ionicons name='ios-add-circle-outline' style={styles.fontAwesome}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileOption} onPress={() => this.handleRoute('listings')}>
            <Text style={styles.profileOptionText}>My Listings</Text>
            <Ionicons name='ios-pricetags-outline' style={styles.fontAwesome}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileOption} onPress={() => this.handleRoute('favorites')}>
            <Text style={styles.profileOptionText}>Favorites</Text>
            <Ionicons name='ios-heart-outline' style={styles.fontAwesome}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileOption} onPress={() => this.handleRoute('completed')}>
            <Text style={styles.profileOptionText}>Completed Listings</Text>
            <Ionicons name='ios-checkmark-circle-outline' style={styles.fontAwesome}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileOption} onPress={() => this.handleRoute('settings')}>
            <Text style={styles.profileOptionText}>Settings</Text>
            <Ionicons name='ios-hammer-outline' style={styles.fontAwesome}/>
          </TouchableOpacity>
        </View>

        <Text onPress={this._onLogout} style={styles.logoutButton}>
          LOGOUT
        </Text>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  profileContainer: {
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  profileName: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: 0
  },
  profilePictureBubble: {
    letterSpacing: 2,
    color: 'white',
    width: 0,
  },
  profileTextBubbleContainer: {
    width: 70,
    height: 70,
    borderRadius: '36%',
    backgroundColor: '#E5B376', 
    justifyContent: 'center',
    alignItems: 'center' ,
    
  },
  profileTextBubble: {
    color: 'white',
    fontWeight: '700',
    fontSize: 30,
  },
  editPicture: {
    color: '#888'
  },
  fullName: {
    fontSize: 25,
    fontWeight: '700',
  },
  profilePic: {
    height: 70,
    width: 70,
    borderRadius: 35
  },
  logoutButton: {
    backgroundColor: '#E5B376',
    color: 'white',
    letterSpacing: 2,
    fontWeight: '700',
    paddingVertical: 20,
    textAlign: 'center',
    fontSize: 14,
  },
  profileOptionContainer: {
    paddingHorizontal: 10
  },
  profileOption: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#eee',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  profileOptionText: {
    fontSize: 20,
    fontWeight: '300',
    color: '#666'
  },
  fontAwesome: {
    fontSize: 26,
    paddingRight: 10,
    color: '#E5B376'
  }
})
