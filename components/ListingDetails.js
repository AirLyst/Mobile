import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { StatusBar } from 'react-native'

export default class componentName extends Component {

  state = {
    item: {
      photos: []
    }
  }
  componentWillMount() {
    StatusBar.setHidden(true)
    const { item } = this.props
    if (item) {
      this.setState({ item })
    }
  }

  componentWillUnmount() {
    StatusBar.setHidden(false)
  }

  _renderItem({ item, index}) {
    return (
      <Image source={{uri: item.image}} style={styles.image}/>
    )
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <View className='carouselContainer'>
        <Carousel
          ref={(c) => { this._carousel = c; }}
          data={this.state.item.photos}
          renderItem={this._renderItem}
          sliderWidth={375}
          itemWidth={300}/>
        </View>
        <Text>{this.state.item.name}</Text>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',

    backgroundColor: '#FFFFFF'
  },
  carouselContainer: {
    borderWidth: 1
  },
  image: {
    flex: 1,
    width: 300,
    height: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2, 
  }
})