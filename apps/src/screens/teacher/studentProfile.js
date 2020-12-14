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

import Spinner from 'react-native-loading-spinner-overlay';
import CheckBox from '@react-native-community/checkbox';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from "react-native-vector-icons/Entypo";
Icon.loadFont();

import { IMAGES } from "../../constants";

export default class StudentProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.route.params ? this.props.route.params.item : '',
      spinner: false,
    }
  }

  async componentDidMount() {

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

  render() {
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textContent={''}
          textStyle={styles.spinnerTextStyle}
        />
        
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
            <Icon name="chevron-thin-left" style={styles.icon}></Icon>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onLogout()}>
            <Icon name="log-out" style={styles.icon}></Icon>
          </TouchableOpacity>
        </View>

        <Image style={styles.profileImg} source={this.state.item.img ? { uri: this.state.item.img } : IMAGES.defaultProfileImg} resizeMode='stretch' />
        <View style={styles.header}>
          <Text style={styles.headerTxt}>{this.state.item.first_name} {this.state.item.last_name}</Text>
        </View>

        <View style={styles.body}>
          <View style={styles.row}>
            <View style={styles.key}><Text style={styles.txt}>Gender :</Text></View>
            <View style={styles.value}><Text style={styles.txt}>{this.state.item.gender == 1 ? 'Male' : 'Female'}</Text></View>
          </View>
          <View style={styles.row}>
            <View style={styles.key}><Text style={styles.txt}>Birthday :</Text></View>
            <View style={styles.value}><Text style={styles.txt}>{this.state.item.dob}</Text></View>
          </View>
          <View style={styles.row}>
            <View style={styles.key}><Text style={styles.txt}>Age :</Text></View>
            <View style={styles.value}><Text style={styles.txt}>{this.state.item.age}</Text></View>
          </View>
          <View style={styles.row}>
            <View style={styles.key}><Text style={styles.txt}>Email :</Text></View>
            <View style={styles.value}><Text style={styles.txt}>{this.state.item.email}</Text></View>
          </View>
          <View style={styles.row}>
            <View style={styles.key}><Text style={styles.txt}>Phone :</Text></View>
            <View style={styles.value}><Text style={styles.txt}>{this.state.item.mobile}</Text></View>
          </View>
          <View style={styles.row}>
            <View style={styles.key}><Text style={styles.txt}>Address :</Text></View>
            <View style={styles.value}><Text style={styles.txt}>{this.state.item.address}</Text></View>
          </View>          
        </View>
      </View>
    );
  }
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
  iconContainer:{
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: normalize(40, 'height'),    
    // borderWidth: 1
  },  
  icon: {
    fontSize: RFPercentage(2.2),
  },
  profileImg: {
    width: normalize(100),
    height: normalize(100),
    alignSelf: 'center',
    marginTop: normalize(10, 'height'),
    borderRadius: normalize(100),
    borderColor: 'rgba(180, 206, 228,1)',
    // borderWidth: 2
  },
  header: {
    height: normalize(30, 'height'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(5, 'height'),
    // borderWidth: 2
  },
  headerTxt: {
    fontSize: RFPercentage(2.5),
  },

  body: {
    flex: 1,
    width: '90%',
    marginTop: normalize(10, 'height'),
    alignSelf: 'center',
    // borderWidth: 5
  },
  row:{
    flexDirection: 'row',    
    height: normalize(30, 'height'),
  },
  key:{
    width: '30%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: normalize(5),
    // borderWidth: 1
  },
  value:{
    width: '70%',    
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: normalize(5),
    // borderWidth: 1
  },
  txt:{
    fontSize: RFPercentage(2.2)
  },
});