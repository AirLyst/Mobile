import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'

export default class ShopByBrand extends Component {
  render() {
    return (
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Brands</Text>
          <Text style={styles.seeMoreLink}>See more ></Text>
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
