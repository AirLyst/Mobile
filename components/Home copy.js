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

class Home extends Component {
  
    state = {
      listings: [],
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
  
    onChangeText = todo => this.setState({ todo })
    render() {
      return (
        <View style={styles.container}>
          <View style={styles.content}>
            <NavigationBar />
            <Text>New Listings</Text>
            <FlatList
              style={styles.flatList}
              data={this.state.listings}
              automaticallyAdjustContentInsets={false}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index}
              horizontal
              renderItem={ ({ item }) => {
                return (
                  <TouchableOpacity style={styles.listingContainer} onPress={() => this.onPress(item)}>
                    {item.photos.length > 0 
                      ? <Image onPress={this._onForward} source={{uri:item.photos[0].image}} style={styles.listingImage}/> 
                      : <Image source={{uri: 'http://via.placeholder.com/150x150'}} styles={styles.listingImage}/>
                    }
                    <View style={styles.listingInfoContainer}>
                      <Text numberOfLines={1} style={styles.listingTitle}>{item.name}</Text>
                      <Text style={styles.listingPrice}>${item.price}</Text>
                    </View>
                  </TouchableOpacity>
                )
              } }
            />
          </View>
      </View>
      );
    }
  }
  

  const styles = StyleSheet.create({
    container: {
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: 'white',
     paddingBottom: '0%',
    },
    content: {
     width: '100%',
     marginTop: 60,
    },
    listingContainer: {
      justifyContent: 'left',
      flexDirection: 'row',
      paddingVertical: 20,
      width: 300,
      paddingHorizontal: 20,
      backgroundColor: 'white',
      borderRadius: '5%',
      marginTop: 20,
      borderColor: '#ddd',
      borderBottomWidth: 0,
      shadowColor: 'black',
      shadowOffset: { width: 5, height: 5 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    listingImage: {
      width: 75,
      height: 75
    },
    flatList: {
      fontSize: 20,
      width: '100%',
      backgroundColor: 'white',
      marginTop: 10,
      marginLeft: -10,
      borderWidth: 1,
      flexDirection: 'row',
    },
    listingTitle: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'black',
      paddingLeft: 15
    },
    listingPrice: {
      fontSize: 25,
      fontWeight: 'light',
      paddingLeft: 15,
      color: '#777'
    },
    listingInfoContainer: {
      justifyContent: 'center',
      alignItems: 'left'
    }
  })
  
  export default Home

  //   <FlatList
//   style={styles.flatList}
//   data={this.state.listings}
//   automaticallyAdjustContentInsets={false}
//   showsHorizontalScrollIndicator={false}              
//   keyExtractor={(item, index) => index}
//   renderItem={({item}) => {
//     return (
//       <TouchableOpacity style={styles.listingContainer} onPress={() => this.onPress(item)}>
//         {item.photos.length > 0 
//           ? <Image onPress={this._onForward} source={{uri:item.photos[0].image}} style={styles.listingImage}/> 
//           : <Image source={{uri: 'http://via.placeholder.com/150x150'}} styles={styles.listingImage}/>
//         }
//         <View style={styles.listingInfoContainer}>
//           <Text numberOfLines={1} style={styles.listingTitle}>{item.name}</Text>
//           <Text style={styles.listingPrice}>${item.price}</Text>
//         </View>
//       </TouchableOpacity>
//     )
//   }}
// />