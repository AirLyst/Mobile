/**
 * Author : Brandon Karl, Serey Morm
 * Contact : serey_morm@student.uml.edu, brandon_karl@student.uml.edu
 * This file is responsible for rendering the signup page
 */
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, AsyncStorage, Animated } from 'react-native'
import axios from 'axios'

import { Actions } from 'react-native-router-flux'
// { firstName, lastName, email, username, password }
export default class Signup extends Component {
  state = { 
    firstName: '',
    lastName: '',
    email: '', 
    username: '', 
    password: '',
    confirmPassword: '',
    errors: {},
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
  validateInputs = () => {
    const { 
      firstName, 
      lastName, 
      email, 
      username, 
      password, 
      confirmPassword 
    } = this.state
    let errors = {}
    let isValid = true

    if(username === '')
      errors.username = 'A username is required'
    if(firstName === '')
      errors.firstName = 'Field required'
    if(lastName === '')
      errors.lastName = 'Field required'
    if(email === '' || !email.includes('@'))
      errors.email = 'Invalid Email'
    if(password === '')
      errors.password = 'Password required'
    if(confirmPassword === '')
      errors.confirmPassword = 'Please verify password'
    if(password.length < 6)
      errors.password = 'Password size must be greater than 6.'
    if(password !== confirmPassword) {
      isValid = false
      errors.confirmPassword = "Passwords do not match."
    }
    if(Object.keys(errors).length > 0 )
      isValid = false

    return { errors, isValid }
  }

  onSubmit = () => {
    const form = this.validateInputs()
    console.log(form.isValid)
    if(form.isValid) {
      const formData = { 
        firstName: this.state.firstName, 
        lastName: this.state.lastName,
        email: this.state.email,
        username: this.state.username,
        password: this.state.password
      }
      axios.post('http://fierce-sands-22150.herokuapp.com/api/signup', formData)
      .then(async res => {
        const { token } = res.data
        try {
          await AsyncStorage.setItem('@token', res.data.token)
          Actions.home()
        } catch (e) {
          console.log(e)
        }
      })
      .catch(err => {
        console.log('fail')
        console.log(err)
      })
    } else {
      this.setState({ errors: form.errors })
      return    
    }
  }

  goToLogin = () => {
    Actions.replace('login')
  }
  render() {
    let containerAnimation = {
      opacity: this.state.fadeAnim,
      transform: [{
        translateY: this.state.fadeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [-100, 0]
        })
      }]
    }
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.formContainer, containerAnimation]}>
          <View style={styles.smallInputContainer}>
            <View style={styles.smallInputLeft}>
              {this.state.errors.firstName
                ? <Text style={styles.labelError}>{this.state.errors.firstName}</Text>
                : <Text style={styles.label}>FIRST</Text>
              }
              <TextInput
                placeholder='Name'
                onChangeText={(firstName) => this.setState({firstName})}
                style={styles.textInputSmall}
                autoCapitalize={false}/>
            </View>
            <View style={styles.smallInput}>
              {this.state.errors.firstName
                ? <Text style={styles.labelError}>{this.state.errors.lastName}</Text>
                : <Text style={styles.label}>LAST</Text>
              }
              <TextInput
                placeholder='Name'
                onChangeText={(lastName) => this.setState({lastName})}
                style={styles.textInputSmall}
                autoCapitalize={false}/>
            </View>
          </View>
          <View style={styles.input}>
            {this.state.errors.email
              ? <Text style={styles.labelError}>{this.state.errors.email}</Text>
              : <Text style={styles.label}>MAIL</Text>
            }
            <TextInput
              placeholder='E-Mail'
              onChangeText={(email) => this.setState({email})}
              style={styles.textInputWide}
              autoCapitalize={false}/>
          </View>
          <View style={styles.input}>
            {this.state.errors.email
              ? <Text style={styles.labelError}>{this.state.errors.username}</Text>
              : <Text style={styles.label}>USER</Text>
            }
            <TextInput
              placeholder='To Login'
              onChangeText={(username) => this.setState({username})}
              style={styles.textInputWide}
              autoCapitalize={false}/>
          </View>
          <View style={styles.smallInputContainer}>
            <View style={styles.smallInputLeft}>
              {this.state.errors.email
                ? <Text style={styles.labelError}>{this.state.errors.password}</Text>
                : <Text style={styles.label}>PASS</Text>
              }
              <TextInput
                placeholder='Password'
                onChangeText={(password) => this.setState({password})}
                style={styles.textInputSmall}
                autoCapitalize={false}
                secureTextEntry/>
            </View>
            <View style={styles.smallInput}>
              {this.state.errors.email
                ? <Text style={styles.labelError}>{this.state.errors.confirmPassword}</Text>
                : <Text style={styles.label}>PASS</Text>
              }
              <TextInput
                placeholder='Confirm'
                onChangeText={(confirmPassword) => this.setState({confirmPassword})}
                style={styles.textInputSmall}
                autoCapitalize={false}
                secureTextEntry/>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
            style={styles.buttonLeft}
            onPress={this.goToLogin}>
              <Text style={styles.buttonText}>EXISTING USER</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.button}
            onPress={this.onSubmit}>
              <Text style={styles.buttonText}>SIGNUP</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e5b376',
  },
  formContainer: {
    marginTop: -200,
    width: '90%',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: '5%',
    paddingBottom: 1,
    // paddingTop: 10,
    borderRadius: '5%',
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#888',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 25,
    elevation: 1,
  },
  inputDouble: {
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row'
  },
  smallInputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  smallInput: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#eee',
    width: '50%',
    padding: 10,
    paddingVertical: 20
  },
  smallInputLeft: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#eee',
    width: '50%',
    padding: 10,
    paddingVertical: 20
  },
  textInputSmall: {
    paddingLeft: 2,
    fontSize: 18,
    width: '70%'
  },
  label: {
    color: '#666',
    fontWeight: 'bold',
    fontSize: 12,
    letterSpacing: 2,
    width: 44,
    paddingTop: 4,
  },
  input: {
    width: '100%',
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingVertical: 20
  },
  textInputWide: {
    paddingLeft: 2,
    fontSize: 18,
    width: '80%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'white',
    color: 'black',
    paddingVertical: 25,
    width: '50%',
  },  
  buttonLeft: {
    backgroundColor: 'white',
    color: 'black',
    paddingVertical: 25,
    width: '50%',
    borderRightWidth: 1,
    borderColor: '#eee'
  },
  buttonText: {
    textAlign: 'center',
    letterSpacing: 2,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#E59C76',
  },
  splitter: {
    borderWidth: 0.5,
    height: '100%',
    borderColor: '#eee'
  }
})
