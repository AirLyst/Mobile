import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, AsyncStorage, ScrollView } from 'react-native'
import axios from 'axios'
import { FontAwesome } from '@expo/vector-icons'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { Actions } from 'react-native-router-flux'
export default class FullChat extends Component {
  state = {
    userId: null,
    conversationId: null,
    listing: { photos: [{image: ''}] },
    messages: []
  }
  componentWillMount() {
    const { conversationId, id } = this.props
    this.setState({ user: id, conversationId })
    axios.get(`http://fierce-sands-22150.herokuapp.com/api/chat/${id}/${conversationId}`)
    .then(res => {
      this.setState({ 
        messages: res.data.messages, 
        listing: res.data.listing,
      })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.chevronContainer}>
            <FontAwesome name='chevron-left' onPress={() => Actions.pop()} style={styles.chevron}/>
          </View>
          <View style={styles.headerUserInfo}>
            {this.state.listing.photos.length > 0 
              && <Image source={{ uri: this.state.listing.photos[0].image }} style={styles.userImage}/> 
            }
            <Text>{this.state.listing.name}</Text>
          </View>
          <View style={styles.chevronContainerRight}>
            <Text style={styles.chevronText}>See Listing ></Text>
          </View>       
        </View>
        <ScrollView style={styles.chatThreadContainer}>
          {this.state.messages.map(message => {
            return (<Text>{message.body}</Text>)
          })}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...ifIphoneX({ paddingTop: 35}, {paddingTop: 10} ),
    flex: 1
  },
  header: {
    width: '100%',
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingBottom: 10
  },
  chevron: {
    fontSize: 24,
    color: '#E5B376'
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: '20%'
  },
  headerUserInfo: {
    width: '33%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chevronContainer: {
    width: '33%',
    alignItems: 'flex-start',
  },
  chevronContainerRight: {
    width: '33%',
    alignItems: 'flex-end',
  },
  chevronText: {
    color: '#888',
    fontSize: 16
  },
  chatThreadContainer: {
    height: 50,
    borderWidth: 1
  }
})
