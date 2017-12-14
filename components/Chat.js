import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, AsyncStorage } from 'react-native'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { Actions } from 'react-native-router-flux'

export default class Chat extends Component {
  state = {
    isAuthenticated: false,
    user: {},
    conversations: []
  }

  async componentWillMount() {
    try {
      const token = await AsyncStorage.getItem('@token')
      if(token) {
        this.setState({ 
          isAuthenticated: true,
          user: jwt_decode(token)
        })

        axios.get(`http://fierce-sands-22150.herokuapp.com/api/chat/${this.state.user.id}`)
        .then(res => {
          this.setState({ conversations: res.data.conversations })
        })
        .catch(e => {
          console.log(e)
        })
      }
    }
    catch(e) {
      console.log(e)
    }
  }

  _goToChat = conversation => {
    const { id } = this.state.user
    const { conversationId } = conversation
    Actions.push('fullchat', { id, conversationId })
  }

  render() {
    return (
      <View style={styles.chatContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Messages</Text>
        </View>
        <View style={styles.chatListContainer}>
        {this.state.conversations.map(item => {
          return (
            <TouchableOpacity style={styles.chatItem} onPress={() => this._goToChat(item)}>
              <Image source={{uri:item.listing.image}} style={styles.listingImage}/>
              <View style={styles.chatInfoContainer}>
                <Text style={styles.chatAuthor}>{item.firstName} {item.lastName}</Text>
                <Text numberOfLines={1} style={styles.previewMessage}>{item.previewMessage.body}</Text>
              </View>                        
            </TouchableOpacity>
          )
        })}
        </View>
      </View>
    )
  }
}

const styles = {
  chatContainer: {

  },
  titleContainer: {
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingBottom: 8
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
  },
  chatListContainer: {
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 15
  },
  listingImage: {
    width: 50,
    height: 50,
    borderRadius: '25%',
  },
  listingItem: {
    height: 100,
    borderColor: 'red'
  },
  chatItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingVertical: 15,
    paddingLeft: 20
  },
  chatInfoContainer: {
    paddingLeft: 15
  },
  chatAuthor: {
    fontSize: 18,
    fontWeight: '700'
  },
  previewMessage: {
    fontSize: 14,
    color: '#888',
    width: '100%'
  }
}