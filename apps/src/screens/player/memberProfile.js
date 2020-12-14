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

import Spinner from 'react-native-loading-spinner-overlay';
import normalize from 'react-native-normalize';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import Icon from "react-native-vector-icons/Entypo";
Icon.loadFont();

import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';

import { IMAGES, RouteParam } from "../../constants";
import { addMemberProfile } from '../../api';

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      id: RouteParam.id,
      firstName:  '',
      lastName: '',
      dob: '',
      mobile: '',
      address: '',
      city: '',
      postalcode: '', 
      showDatePickerModal: false
    }

    console.log('route param', RouteParam)
  }

  componentDidMount() {
    console.log('user', RouteParam.user)
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
    // if (!this.state.email) {
    //   Alert.alert('Please enter email');
    //   return false;
    // }
    // if (!this.validateEmail()) {
    //   Alert.alert('Please enter a valid email address');
    //   return false;
    // }
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
    if (!this.state.postalcode) {
      Alert.alert('Please enter postal code');
      return false;
    }
    // if (!this.state.state) {
    //   Alert.alert('Please enter state');
    //   return false;
    // }
    // if (!this.state.country) {
    //   Alert.alert('Please enter country');
    //   return false;
    // }
    return true;
  }

  onUpdate = async () => {
    if (this.validate()) {
      var param = {
        id: this.state.id,
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        dob: this.state.dob,
        // email: this.state.email,
        mobile: this.state.mobile,
        address: this.state.address,
        // suburb: this.state.suburb,
        city: this.state.city,
        // state: this.state.state,
        // country: this.state.country,
        postalcode: this.state.postalcode        
      }

      this.setState({ spinner: true });
      await addMemberProfile(param)
        .then((res) => {
          // console.log('update profile res: ', res.data);
          this.setState({ spinner: false });
          this.props.navigation.navigate('UploadMembership');
        })
        .catch((err) => {
          console.log('add member profile error: ', err);
          Alert.alert('Failed. Try Again', '',
            [
              { text: 'OK', onPress: () => this.setState({ spinner: false }) }
            ])
        })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Spinner
            visible={this.state.spinner}
            textContent={''}
            textStyle={styles.spinnerTextStyle}/>
        <View style={styles.logoContainer}>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
              <Icon name="chevron-thin-left" style={styles.icon}></Icon>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.row}>
            <View style={styles.key}><Text style={styles.requireMark}>*</Text><Text style={styles.txt}>First Name :</Text></View>
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
          <View style={[styles.row, {...(Platform.OS !== 'android' && {
            zIndex: 100
            }) }]}>
            <View style={styles.key}><Text style={styles.requireMark}>*</Text><Text style={styles.txt}>DOB :</Text></View>
            {
              this.state.showDatePickerModal ?
                <DatePicker
                  style={{ marginLeft: '-30%', marginTop: '-35%', zIndex: 100 }}
                  mode="calendar"
                  onDateChange={dateStr => {
                    this.setState({
                      dob: getFormatedDate(new Date(dateStr), 'DD/MM/YYYY'),
                      showDatePickerModal: false
                    });
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
            <View style={styles.key}><Text style={styles.requireMark}>*</Text><Text style={styles.txt}>Postal Code :</Text></View>
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
          <TouchableOpacity style={styles.btn} onPress={() => this.onUpdate()}>
            <Text style={styles.btnTxt}>Add</Text>
          </TouchableOpacity>
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
  logoContainer: {
    height: '20%',
    justifyContent: "space-between",
    alignItems: 'center',
    // borderWidth: 5
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
    borderWidth: 2
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
    marginTop: normalize(5, 'height'),
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
    borderRadius: normalize(8),
    borderColor: "#000000",
    paddingLeft: normalize(5),
    borderWidth: 1
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

  btn: {
    width: '80%',
    height: normalize(30, 'height'),
    backgroundColor: '#bb3333',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: normalize(20, 'height'),
    borderRadius: normalize(5)
  },
  btnTxt: {
    fontSize: RFPercentage(2.2),
    color: '#ffffff'
  },
});