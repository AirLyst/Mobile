import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import { Actions } from 'react-native-router-flux'
import axios from 'axios'

export default class RecentFlatList extends Component {

  state = { 
    listings: []
  }

  componentWillMount() {
    this.queryRecents()
  }

  queryRecents = () => {
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

  render() {
    return (
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Recents</Text>
          <Text style={styles.seeMoreLink}>See more ></Text>
        </View>
        <View style={styles.flatListContainer}>
          <FlatList
            style={styles.flatList}
            data={this.state.listings}
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index}
            horizontal
            renderItem={ ({ item }) => {
              return (
                <TouchableOpacity style={styles.listingItem} onPress={() => this.onPress(item)}>
                  {item.photos.length > 0 
                    ? <Image onPress={this._onForward} source={{uri:item.photos[0].image}} style={styles.listingImage}/> 
                    : <Image source={{uri: 'http://via.placeholder.com/150x150'}} styles={styles.listingImage}/>
                  }
                  <View style={styles.listingInfoContainer}>
                    <Text numberOfLines={1} style={styles.listingTitle}>{item.brand}</Text>
                    <Text style={styles.listingPrice}>${item.price}</Text>
                  </View>
                </TouchableOpacity>
              )
            }}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontWeight: '700',
    fontSize: 30,
  },
  seeMoreLink: {
    fontWeight: '300',
    fontSize: 18,
    color: '#777'
  },
  flatListContainer: {
    marginTop: 20,
  },
  listingItem: {
    paddingHorizontal: 20
  },
  listingImage: {
    height: 75,
    width: 75,
    borderRadius: 5
  }
})