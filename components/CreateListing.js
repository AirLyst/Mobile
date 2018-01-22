import React, { Component } from 'react'
import { Text, View, ScrollView, TextInput, StyleSheet, 
  Button, TouchableOpacity, AsyncStorage, Animated, 
  ActivityIndicator, Picker, KeyboardAvoidingView } from 'react-native'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { Actions } from 'react-native-router-flux'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { sizing } from './data/Sizing'
import { CreateListingStrings } from './data/Strings'

import ImagePicker from 'react-native-image-crop-picker'

export default class CreateListing extends Component {
  state = {
    category: 'tops',
    size: 'Small',
    condition: '',
    price: null,
    brand: '',
    title: '',
    description: '',
    photos: [],
    photoDescriptions: [],
    sizeLabel: 'Small',
    sizingType:  [...sizing.oneSize, ...sizing.tops],
    showCategoryPicker: false,
    showSizePicker: false,
  }

  categoryChange = (category, index) => {
    this.setState({ category })
    switch(category) {
      case 'tops':
        this.setState({ 
          sizingType: [...sizing.oneSize, ...sizing.tops], 
          size: sizing.tops[0], 
          sizeLabel: sizing.tops[0].label 
        })
        break
      case 'bottoms':
        this.setState({ 
          sizingType: [...sizing.oneSize, ...sizing.bottoms], 
          size: sizing.bottoms[0], 
          sizeLabel: sizing.bottoms[0].label 
        })
        break
      case 'shoes':
        this.setState({ 
          sizingType: [...sizing.oneSize, ...sizing.kicks],
          size: sizing.kicks[0],
          sizeLabel: sizing.kicks[0].label 
        })
        break
      case 'accessories':
        this.setState({ 
          sizingType: [...sizing.oneSize, ...sizing.accessories],
          size: sizing.accessories[0],
          sizeLabel: sizing.accessories[0].label 
        })
        break
      case 'headwear': 
        this.setState({ 
          sizingType: [...sizing.oneSize, ...sizing.headwear],
          size: sizing.headwear[0],
          sizeLabel: sizing.headwear[0].label 
        })
        break
    }
    console.log(this.state.sizingType)
  }

  sizeChange = (size, index) => {
    this.setState({ size, sizeLabel: this.state.sizingType[index].label })
  }

  conditionChange = (condition) => this.setState({ condition })

  toggleCategoryPicker = () => {
    this.setState({ 
      showCategoryPicker: !this.state.showCategoryPicker,
      showSizePicker: false
    }) 
  }

  toggleSizePicker = () => { 
    this.setState({ 
      showSizePicker: !this.state.showSizePicker,
      showCategoryPicker: false
    })
  }

  onAddImages = () => {
    ImagePicker.openPicker()
    // ImagePicker.openPicker({
    //   multiple: true
    // }).then(images => {
    //   console.log(images);
    // });
  }
  render() {
    return (
      <View styles={styles.container}>
      
        <View style={styles.headerContainer}>
          <View style={styles.headerContent}>
            <Ionicons name='ios-arrow-round-back' style={styles.iconBack} onPress={() => Actions.pop()}/>
            <View style={styles.headerTitle}>
              <Text style={styles.headerTitleText}>Create Listing</Text>
            </View>
          </View>
        </View>

        <ScrollView style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{CreateListingStrings.listingKind}</Text>
            <View style={styles.pickerDisplay} onPress={this.toggleCategoryPicker}>
              <Text onPress={this.toggleCategoryPicker} style={styles.pickerDisplayText}>
                {this.state.category.charAt(0).toUpperCase() + this.state.category.slice(1)}
              </Text>
              <Ionicons name='ios-arrow-round-down' style={styles.pickerIcon} onPress={this.toggleCategoryPicker}/>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{CreateListingStrings.listingSize}</Text>
            <View style={styles.pickerDisplay} onPress={this.toggleSizePicker}>
              <Text onPress={this.toggleSizePicker} style={styles.pickerDisplayText}>
              {this.state.sizeLabel}
              </Text>
              <Ionicons name='ios-arrow-round-down' style={styles.pickerIcon} onPress={this.toggleSizePicker}/>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{CreateListingStrings.listingCondition}</Text>
            <View style={styles.conditionButtonContainer}>
              <Text 
                style={this.state.condition === 'new' ? styles.conditionButtonActive : styles.conditionButton}
                onPress={() => this.conditionChange('new')}>
                New
              </Text>
              <Text 
                style={this.state.condition === 'worn' ? styles.conditionButtonActive : styles.conditionButton} 
                onPress={() => this.conditionChange('worn')}>
                Worn
              </Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{CreateListingStrings.listingBrand}</Text>
            <View style={styles.textInputContainer}>
              <TextInput 
                style={styles.textInput}
                onChangeText={(brand) => this.setState({ brand })}
                value={this.state.brand}/>
              <Ionicons name='ios-shirt-outline' style={styles.keypadIcon} />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{CreateListingStrings.listingPrice}</Text>
            <View style={styles.textInputContainer}>
              <TextInput 
                style={styles.textInput}
                onChangeText={(price) => this.setState({ price })}
                value={this.state.price}
                />
              <Ionicons name='ios-cash-outline' style={styles.keypadIcon} />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{CreateListingStrings.listingTitle}</Text>
            <View style={styles.textInputContainer}>
              <TextInput 
                style={styles.textInput}
                onChangeText={(title) => this.setState({ title })}
                value={this.state.title}
                />
              <Ionicons name='ios-bonfire-outline' style={styles.keypadIcon} />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{CreateListingStrings.listingDescription}</Text>
            <View style={styles.textInputContainer}>
              <TextInput 
                style={styles.textInput}
                onChangeText={(description) => this.setState({ description })}
                value={this.state.description}
                multiline
                />
            </View>
          </View>

          <View style={styles.imagePickerContainer}>
            <Text onPress={this.onAddImages} style={{backgroundColor: 'red', width: 200}}>Add Images</Text>
          </View>

          <View style={{height: 500}}/>
        </ScrollView>

        {this.state.showCategoryPicker 
          &&  <View style={styles.pickerContainer}>
                <View style={styles.pickerTopButtons}>
                  <Text onPress={this.toggleCategoryPicker} style={styles.doneButton}>Done</Text>
                </View>
                <Picker
                selectedValue={this.state.category}
                onValueChange={this.categoryChange}
                style={styles.picker}>
                  <Picker.Item label="Tops" value="tops" />
                  <Picker.Item label="Bottoms" value="bottoms" />
                  <Picker.Item label="Shoes" value="shoes" />
                  <Picker.Item label="Accessories" value="accessories" />
                  <Picker.Item label="Headwear" value="headwear" />
                </Picker>
              </View>
        }

        {this.state.showSizePicker 
          &&  <View style={styles.pickerContainer}>
                <View style={styles.pickerTopButtons}>
                  <Text onPress={this.toggleSizePicker} style={styles.doneButton}>Done</Text>
                </View>
                <Picker
                selectedValue={this.state.size}
                onValueChange={this.sizeChange}
                style={styles.picker}>
                  {this.state.sizingType.map(size => {
                    return (
                      <Picker.Item label={size.label} value={size.value} />
                    )
                  })}
                </Picker>
              </View>
        }

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  headerContainer: {
    width: '100%',
    backgroundColor: '#E5B376',
    ...ifIphoneX({ paddingTop: 40}, { paddingTop: 20} ),
    paddingHorizontal: 10,
  },
  headerContent: {
    width: '100%',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  introText: {
    fontSize: 20,
  },
  iconBack: {
    fontSize: 46,
    color: 'white',
    width: '33%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: {
    width: '34%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitleText: {
    ...ifIphoneX({ fontSize: 18}, { fontSize: 16} ),
    color: 'white',
    fontWeight: '700'
  },
  formContainer: {
    paddingHorizontal: 35,
    paddingTop: 15
  },
  inputContainer: {
    paddingVertical: 14
  },
  inputLabel: {
    fontWeight: '300',
    fontSize: 16,
    color: '#555'
  },
  pickerContainer: {
    position: 'absolute',
    bottom: 120,
    left: 0,
    right: 0,
    backgroundColor: 'white'
  },
  picker: {
  },
  pickerItem: {
  },
  pickerDisplay: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginTop: 5,
  },
  pickerDisplayText: {
    fontSize: 24,
    color: '#888'
  },
  pickerIcon: {
    fontSize: 20,
    textAlign: 'right',
    width: 30,
    color: '#888'
  },
  pickerTopButtons: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#aaa'
  },
  doneButton: {
    color: '#888',
    fonSize: 20,
    paddingRight: 20,
  },
  conditionButtonContainer: {
    width: '100%',
  },
  conditionButton: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#E5B376',
    borderRadius: 5,
    color: '#E5B376',
    width: '100%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    overflow: 'hidden'
  },
  conditionButtonActive: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#E5B376',
    borderRadius: 5,
    color: 'white',
    fontWeight: '700',
    backgroundColor: '#E5B376',
    width: '100%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    overflow: 'hidden'
  },
  textInputContainer: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginTop: 5,
  },
  textInput: {
    fontSize: 24,
    color: '#888',
    width: '85%'
  },
  keypadIcon: {
    fontSize: 20,
    textAlign: 'right',
    width: 30,
    color: '#ddd'
  }
})