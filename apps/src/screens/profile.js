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
import Icon from "react-native-vector-icons/Entypo";
Icon.loadFont();
import FeatherIcons from 'react-native-vector-icons/Feather';
FeatherIcons.loadFont();

import AsyncStorage from '@react-native-community/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import SelectMultiple from 'react-native-select-multiple'

import { IMAGES, RouteParam } from "../constants";
import { getBooking, updateProfile } from '../api';
import LinearGradient from "react-native-linear-gradient";

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      id: RouteParam.user ? RouteParam.user.id : '',
      img: RouteParam.user.userprofile ? RouteParam.user.userprofile.img : '',
      firstName: RouteParam.user.userprofile ? RouteParam.user.userprofile.first_name : '',
      lastName: RouteParam.user.userprofile ? RouteParam.user.userprofile.last_name : '',
      gender: RouteParam.user.userprofile ? RouteParam.user.userprofile.gender : '',
      dob: RouteParam.user.userprofile ? RouteParam.user.userprofile.dob : '',
      age: RouteParam.user.userprofile ? RouteParam.user.userprofile.age : '',
      email: RouteParam.user.email? RouteParam.user.email : '',
      mobile: RouteParam.user.userprofile ? RouteParam.user.userprofile.mobile : '',
      address: RouteParam.user.userprofile ? RouteParam.user.userprofile.address : '',
      suburb: RouteParam.user.userprofile ? RouteParam.user.userprofile.suburb : '',
      city: RouteParam.user.userprofile ? RouteParam.user.userprofile.city : '',
      state: RouteParam.user.userprofile ? RouteParam.user.userprofile.state : '',
      country: RouteParam.user.userprofile ? RouteParam.user.userprofile.country : '',
      postalcode: RouteParam.user.userprofile ? RouteParam.user.userprofile.postalcode : '', 
      showDatePickerModal: false
    }
  }

  componentDidMount() {
    console.log('user', RouteParam.user)
  }

  onLogout = () => {
    Alert.alert('Logout?', '',
      [
        {
          text: 'YES',
          onPress: () => {
            AsyncStorage.removeItem('loggedInUser');
            this.props.navigation.navigate('Auth', { screen: 'Login' });
          }
        },
        {
          text: 'NO'
        }
      ])
  }

  getAge = (birthday) => {
    var birthYear = new Date(birthday).getFullYear();
    var currentYear = new Date().getFullYear();
    var age = currentYear - birthYear;
    this.setState({ age: age });

    return age;
  }

  validateEmail = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(this.state.email);
  }

  validate = () => {
    if (!this.state.firstName) {
      Alert.alert('Please enter first name');
      return false;
    }
    if (!this.state.lastName) {
      Alert.alert('Please enter last name');
      return false;
    }
    // if (!this.state.gender) {
    //   Alert.alert('Please select gender');
    //   return false;
    // }
    if (!this.state.dob) {
      Alert.alert('Please enter birthday');
      return false;
    }
    if (!this.state.email) {
      Alert.alert('Please enter email');
      return false;
    }
    if (!this.validateEmail()) {
      Alert.alert('Please enter a valid email address');
      return false;
    }
    if (!this.state.mobile) {
      Alert.alert('Please enter phone number');
      return false;
    }
    if (!this.state.address) {
      Alert.alert('Please enter address');
      return false;
    }
    if (!this.state.city) {
      Alert.alert('Please enter city');
      return false;
    }
    if (!this.state.state) {
      Alert.alert('Please enter state');
      return false;
    }
    if (!this.state.country) {
      Alert.alert('Please enter country');
      return false;
    }

    return true;
  }

  onUpdate = async () => {
    if (this.validate()) {
      var param = {
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        // gender: this.state.gender,
        dob: this.state.dob,
        // age: this.state.age,
        email: this.state.email,
        mobile: this.state.mobile,
        address: this.state.address,
        suburb: this.state.suburb,
        city: this.state.city,
        state: this.state.state,
        country: this.state.country,
        postalcode: this.state.postalcode        
      }

      this.setState({ spinner: true });
      await updateProfile(param)
        .then((res) => {
          // console.log('update profile res: ', res.data);
          Alert.alert('Updated Success!', '',
            [
              { text: 'OK', onPress: () => this.setState({ spinner: false }) }
            ]);
        })
        .catch((err) => {
          console.log('update profile error: ', err);
          Alert.alert('Failed. Try Again', '',
            [
              { text: 'OK', onPress: () => this.setState({ spinner: false }) }
            ])
        })
    }
  }

  render() {
    return (
      <KeyboardAvoidingView
            behavior={Platform.Os == "ios" ? "padding" : "height"}
            style={styles.container}
        >
        <LinearGradient colors={['#F9F9F9', '#E1E1E1','#E1E1E1']} >
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

        <Image style={styles.profileImg} source={this.state.img ? { uri: this.state.img } : IMAGES.defaultProfileImg} resizeMode='stretch' />
        <View style={styles.header}>
          <Text style={styles.headerTxt}>{this.state.firstName} {this.state.lastName}</Text>
        </View>

        <View style={styles.body}>
          <View style={styles.row}>
            <View style={styles.key}><Text style={styles.requireMark}>*</Text><Text style={styles.txt}>Fist Name :</Text></View>
            <View style={styles.value}>
              <TextInput
                style={styles.txtInput}
                autoCapitalize='none'
                placeholder=''
                placeholderTextColor='rgba(136,100,157,1)'
                value={this.state.firstName}
                onChangeText={(text) => this.setState({ firstName: text })}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.key}><Text style={styles.requireMark}>*</Text><Text style={styles.txt}>Last Name :</Text></View>
            <View style={styles.value}>
              <TextInput
                style={styles.txtInput}
                autoCapitalize='none'
                placeholder=''
                placeholderTextColor='rgba(136,100,157,1)'
                value={this.state.lastName}
                onChangeText={(text) => this.setState({ lastName: text })}
              />
            </View>
          </View>
          {/* <View style={[styles.row, { zIndex: 110 }]}>
            <View style={styles.key}><Text style={styles.requireMark}>*</Text><Text style={styles.txt}>Gender :</Text></View>
            <View style={styles.value}>
              <DropDownPicker
                items={[
                  { label: 'Male', value: 1 },
                  { label: 'Female', value: 2 },
                ]}
                defaultValue={this.state.gender}
                placeholder='Select Gender'
                placeholderStyle={{
                  fontSize: RFPercentage(2.2),
                }}
                labelStyle={{
                  fontSize: RFPercentage(2.2),
                  color: 'rgba(50,55,55,1)'
                }}
                containerStyle={{
                  width: '85%',
                  height: '100%',
                  marginLeft: normalize(10),
                  borderRadius: normalize(5),
                  borderWidth: normalize(1),
                }}
                // style={{ backgroundColor: 'none' }}
                itemStyle={{ justifyContent: 'flex-start' }}
                dropDownStyle={{}}
                onChangeItem={item => this.setState({ gender: item.value })}
              />
            </View>
          </View> */}
           <View style={[styles.row, {...(Platform.OS !== 'android' && {
            zIndex: 100
            }) }]}>
            <View style={styles.key}><Text style={styles.requireMark}>*</Text><Text style={styles.txt}>DOB :</Text></View>
            {
              this.state.showDatePickerModal ?
                <DatePicker
                  style={{ marginLeft: '-30%', marginTop: '-35%', zIndex: 10000 }}
                  mode="calendar"
                  onDateChange={dateStr => {
                    this.setState({
                      dob: getFormatedDate(new Date(dateStr), 'DD/MM/YYYY'),
                      showDatePickerModal: false
                    });
                    this.setState({ age: this.getAge(dateStr) });
                  }}
                />
                :
                <View style={styles.value}>
                  <TextInput
                    style={styles.txtInput}
                    value={this.state.dob}
                    onFocus={() => this.setState({ showDatePickerModal: true })}
                  />
                </View>
            }
          </View>
          {/* <View style={styles.row}>
            <View style={styles.key}><Text style={styles.txt}>Age :</Text></View>
            <View style={styles.value}><Text style={[styles.txt, { marginLeft: normalize(15) }]}>{this.state.age}</Text></View>
          </View> */}
          <View style={styles.row}>
            <View style={styles.key}><Text style={styles.requireMark}>*</Text><Text style={styles.txt}>Email :</Text></View>
            <View style={styles.value}>
              <TextInput
                style={styles.txtInput}
                autoCapitalize='none'
                placeholder=''
                placeholderTextColor='rgba(136,100,157,1)'
                value={this.state.email}
                onChangeText={(text) => this.setState({ email: text })}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.key}><Text style={styles.requireMark}>*</Text><Text style={styles.txt}>Phone :</Text></View>
            <View style={styles.value}>
              <TextInput
                style={styles.txtInput}
                autoCapitalize='none'
                placeholder=''
                placeholderTextColor='rgba(136,100,157,1)'
                keyboardType='numeric'
                value={this.state.mobile}
                onChangeText={(text) => this.setState({ mobile: text })}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.key}><Text style={styles.requireMark}>*</Text><Text style={styles.txt}>Address :</Text></View>
            <View style={styles.value}>
              <TextInput
                style={styles.txtInput}
                autoCapitalize='none'
                placeholder=''
                placeholderTextColor='rgba(136,100,157,1)'
                value={this.state.address}
                onChangeText={(text) => this.setState({ address: text })}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.key}><Text style={styles.txt}>Suburb :</Text></View>
            <View style={styles.value}>
              <TextInput
                style={styles.txtInput}
                autoCapitalize='none'
                placeholder=''
                placeholderTextColor='rgba(136,100,157,1)'
                value={this.state.suburb}
                onChangeText={(text) => this.setState({ suburb: text })}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.key}><Text style={styles.requireMark}>*</Text><Text style={styles.txt}>City :</Text></View>
            <View style={styles.value}>
              <TextInput
                style={styles.txtInput}
                autoCapitalize='none'
                placeholder=''
                placeholderTextColor='rgba(136,100,157,1)'
                value={this.state.city}
                onChangeText={(text) => this.setState({ city: text })}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.key}><Text style={styles.requireMark}>*</Text><Text style={styles.txt}>State :</Text></View>
            <View style={styles.value}>
              <TextInput
                style={styles.txtInput}
                autoCapitalize='none'
                placeholder=''
                placeholderTextColor='rgba(136,100,157,1)'
                value={this.state.state}
                onChangeText={(text) => this.setState({ state: text })}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.key}><Text style={styles.requireMark}>*</Text><Text style={styles.txt}>Country :</Text></View>
            <View style={styles.value}>
              <TextInput
                style={styles.txtInput}
                autoCapitalize='none'
                placeholder=''
                placeholderTextColor='rgba(136,100,157,1)'
                value={this.state.country}
                onChangeText={(text) => this.setState({ country: text })}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.key}><Text style={styles.requireMark}>*</Text><Text style={styles.txt}>Postal code :</Text></View>
            <View style={styles.value}>
              <TextInput
                style={styles.txtInput}
                autoCapitalize='none'
                placeholder=''
                placeholderTextColor='rgba(136,100,157,1)'
                value={this.state.postalcode}
                onChangeText={(text) => this.setState({ postalcode: text })}
              />
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
          <LinearGradient colors={['#F4F4F4', '#DCDCDC','#DCDCDC']} style={styles.loginBtnContainer}>
            <TouchableOpacity onPress={() => this.onUpdate()} style={{flexDirection: 'row'}}>
              <FeatherIcons name="check-circle" style={{ fontSize: RFPercentage(3), color: "#27AE60" }}/>
              <Text style={styles.btnTxt}>Update</Text>
            </TouchableOpacity>
          </LinearGradient>
          </View>
        </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    );
  }
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: '#FFFFFF',
    backgroundColor: '#E1E1E1',
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
  iconContainer: {
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
    width: normalize(80),
    height: normalize(80),
    alignSelf: 'center',
    marginTop: normalize(10, 'height'),
    borderRadius: normalize(100),
    borderColor: 'rgba(180, 206, 228,1)',
    borderWidth: 0
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
    marginTop: normalize(5, 'height'),
    alignSelf: 'center',
    // borderWidth: 5
  },
  row: {
    flexDirection: 'row',
    height: normalize(30, 'height'),
  },
  key: {
    width: '30%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: normalize(5),
    // borderWidth: 1
  },
  value: {
    width: '70%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    // paddingLeft: normalize(5),
    // borderWidth: 1
  },
  requireMark: {
    fontSize: RFPercentage(2.2),
    color: '#bb3333',
    marginRight: normalize(3),
    marginBottom: normalize(5, 'height'),
  },
  txt: {
    fontSize: RFPercentage(2.2)
  },
  txtInput: {
    width: '85%',
    height: '90%',
    color: "rgba(50,55,55,1)",
    fontSize: RFPercentage(2.2),
    marginLeft: normalize(10),
    borderRadius: normalize(5),
    borderWidth: normalize(1),
    padding: 0, //android
    paddingLeft: normalize(5)
  },
  loginBtnContainer: {
    width: normalize(136),
    height: normalize(48, 'height'),
    alignItems: 'center',
    borderRadius: normalize(50),
    shadowColor: 'rgb(255, 255, 255)',
    shadowOpacity: 0.2,
    shadowOffset: {width: 5, height: 5},
    elevation: 3,
    justifyContent: "center",
    marginTop: normalize(40, 'height'),
    zIndex: -1
  },

  btnTxt: {
    color: "#333333",
    fontSize: 15,
    fontWeight: "500",
    alignSelf: "center",
    marginLeft: normalize(15),
    padding: 0
  },
});