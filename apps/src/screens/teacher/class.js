import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Animated,
  ScrollView,
  Text,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  FlatList
} from "react-native";

import normalize from 'react-native-normalize';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import LinearGradient from "react-native-linear-gradient";

import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Entypo';
Icon.loadFont();

import { getClassForTeacher } from '../../api';
import { IMAGES, RouteParam } from '../../constants';
import InsetShadow from "react-native-inset-shadow";

export default class ClassScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      user: RouteParam.user ? RouteParam.user : '',
      classData: [],
      classEqualData: [],
      searchWord: ''
    }
  }

  async componentDidMount() {
    this.setState({ spinner: true });
    console.log('user', this.props.route)
    if(this.state.user){
      await getClassForTeacher()
        .then((res) => {
          console.log('class res: ', res.data);
          this.setState({
            classData: res.data,
            classEqualData: res.data,
            spinner: false
          })
        })
        .catch((err) => {
          console.log('get class error: ', err);
          this.setState({ spinner: false })
        })
    }
  }

  onSearchWord = (text) => {
    let filtered = this.state.classEqualData.filter((each) => {
      return each.type.toLowerCase().includes(text.toLowerCase());
    });
    this.setState({ classData: filtered });
  }

  onClass = (item) => {
    this.props.navigation.navigate('Attendance', { class: item });
  }

  onLogout = () => {
    Alert.alert('Logout?', '',
      [
        {
          text: 'YES',
          onPress: () => {
            AsyncStorage.removeItem('loggedInUser');
            this.props.navigation.navigate('Auth', {screen: 'Login'});
          }
        },
        {
          text: 'NO'
        }
      ])
  }

  renderItem(item) {
    return (
      <TouchableOpacity style={styles.row} onPress={() => this.onClass(item)}>
        <Text style={styles.txt}>{item.type}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <LinearGradient colors={['#F9F9F9', '#E1E1E1','#E1E1E1']} > */}
        <Spinner
          visible={this.state.spinner}
          textContent={''}
          textStyle={styles.spinnerTextStyle}
        />

        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => this.onLogout()}>
            <Icon name="log-out" style={styles.icon}></Icon>
          </TouchableOpacity>
        </View>

        <View style={styles.header}>
          <Text style={styles.headerTxt}>CLASSES</Text>
        </View>

        <InsetShadow shadowColor='rgb(255, 255, 255)' shadowOpacity = {0.9} shadowOffset= {2} elevation= {9} containerStyle={styles.searchBoxContainer}>
          <TextInput
            style={styles.searchTxt}
            placeholder={'Search'}
            autoCapitalize='none'
            value={this.state.searchWord}
            onChangeText={(text) => {
              this.setState({ searchWord: text });
              this.onSearchWord(text)
            }}
          />
          </InsetShadow>
        <View style={styles.body}>
          {
            this.state.classData.length ?
              <FlatList
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                data={this.state.classData}
                renderItem={({ item }) => this.renderItem(item)}
              />
              :
              <View style={styles.noData}><Text>No Class</Text></View>
          }
        </View>
        {/* </LinearGradient> */}
      </View>
    );
  }
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1E1E1',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    shadowColor: 'rgba(213, 213, 213, 0.2)',
    shadowOffset: {
      width: 10,
      height: 10
    },
    shadowOpacity: 20,
    shadowRadius: 10,
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
  iconContainer:{
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    marginTop: normalize(40, 'height'),    
    // borderWidth: 1
  },  
  icon: {
    fontSize: RFPercentage(2.2),
  },
  header: {
    height: normalize(50, 'height'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(10, 'height'),
    // borderWidth: 2
  },
  headerTxt: {
    fontSize: RFPercentage(2.5),
    color: '#333333'
  },
  searchBoxContainer: {
    width: '90%',
    height: normalize(40, 'height'),
    alignSelf: 'center',
    backgroundColor: "#E8E8E8",
    borderRadius: normalize(50),
    // borderWidth: 1,
    // borderColor: 'rgba(20,80,144,1)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchTxt: {
    width: '95%',
    fontSize: RFPercentage(2.2),
    color: '#333333',
    padding: 0, //android
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    padding: normalize(20)
  },
  row: {
    height: normalize(40, 'height'),
    justifyContent: 'center',
    // borderWidth: 2
  },
  txt: {
    color: '#333333',
    fontSize: RFPercentage(2.5)
  },
  noData: {
    alignSelf: 'center'
  },
});