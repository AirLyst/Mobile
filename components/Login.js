import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, Button, TouchableOpacity, AsyncStorage, Animated, ActivityIndicator } from 'react-native'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Actions } from 'react-native-router-flux'
import { FontAwesome } from '@expo/vector-icons'
import Signup from './Signup'
import Home from './Home'
import Spinner from 'react-native-spinkit'

export default class Login extends Component {
  state = { 
    username: '',
    password: '',
    isLoading: false,
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

  _goToSignup = () => {
    Actions.replace('signup')
  }

  onSubmit = () => {
    this.setState({ isLoading: true })
    const { username, password } = this.state
    const data = { username, password }
    axios.post('http://fierce-sands-22150.herokuapp.com/api/login', data)
    .then(async res => {
      this.setState({ isLoading: false })
      try {
        await AsyncStorage.setItem('@token', res.data.token)
        Actions.home()
      } catch (e) {
        console.log(e)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    let containerAnimation = {
      opacity: this.state.fadeAnim,
      transform: [{
        translateY: this.state.fadeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [100, 0]
        })
      }]
    }
    return (
      <View style={styles.container}>
      {
        this.state.isLoading
        ? <View style={styles.loadingContainer}>
            <ActivityIndicator size='large' color='white'/>
          </View>
        : (
          <Animated.View style={[styles.content, containerAnimation]}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>USER</Text>
            <TextInput
              placeholder='Username or E-Mail'
              onChangeText={(username) => this.setState({username})}
              style={styles.textInput}
              autoCapitalize={false}/>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>PASS</Text>
            <TextInput
              placeholder='Your Password'
              onChangeText={(password) => this.setState({password})}
              style={styles.textInput}
              autoCapitalize={false}
              secureTextEntry/>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={this._goToSignup}>
              <Text style={styles.buttonText}>NEW USER</Text>
            </TouchableOpacity>
            <View style={styles.splitter}/>
            <TouchableOpacity
              style={styles.button}
              onPress={this.onSubmit}>
              <Text style={styles.buttonText}>LOG IN</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
        )
      }
      </View>      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ff9966',
  },
  loadingContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    marginTop: '60%',    
    width: '90%',
    backgroundColor: 'white',
    paddingHorizontal: '7%',
    paddingBottom: 1,
    paddingTop: 10,
    borderRadius: 5,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 1,
  },
  inputContainer:{
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#eee',
    marginTop: 2,
    paddingVertical: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    padding: 10,
    width: '80%',
  },
  label: {
    color: '#555',
    paddingVertical: 15,
    fontWeight: 'bold',
    fontSize: 12,
    letterSpacing: 2
  },
  button: {
    backgroundColor: 'white',
    color: 'black',
    paddingVertical: 25,
    width: '49%',
  },
  buttonText: {
    textAlign: 'center',
    letterSpacing: 2,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#ff5e62',
  },
  splitter: {
    borderWidth: 0.5,
    height: '100%',
    borderColor: '#eee'
  }
})

