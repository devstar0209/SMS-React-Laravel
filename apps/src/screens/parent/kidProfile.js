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

import AsyncStorage from '@react-native-community/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import SelectMultiple from 'react-native-select-multiple'

import { IMAGES } from "../../constants";
import { getBooking, createKid, updateKid } from '../../api';
import LinearGradient from "react-native-linear-gradient";

export default class KidProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      func: this.props.route.params ? this.props.route.params.func : 'create',
      id: '',
      img: '',
      firstName: '',
      lastName: '',
      gender: '',
      dob: '',
      age: '',
      email: '',
      mobile: '',
      address: '',
      suburb: '',
      city: '',
      state: '',
      country: '',
      classIds: [],
      showDatePickerModal: false,
      bookingClassData: [],
      selectedBookingClassData: []
    }
  }

  async componentDidMount() {
    var item = this.props.route.params ? this.props.route.params.item : '';
    if (item) {
      this.setState({
        id: item.id,
        img: item.img,
        firstName: item.first_name,
        lastName: item.last_name,
        gender: item.gender,
        dob: item.dob,
        age: item.age,
        email: item.email,
        mobile: item.mobile,
        address: item.address,
        suburb: item.suburb,
        city: item.city,
        state: item.state,
        country: item.country,
        classIds: item.class_id
      });

      if(!item.age) this.getAge(item.dob);
    }

    await getBooking()
      .then((res) => {
        // console.log('booking res: ', res.data);
        var tData = [];
        res.data.forEach((each) => {
          tData.push({
            label: each.type,
            value: each.id,
          })
        });

        /////// hard values ///////
        tData = [
          { label: 'HP - Mon', value: 15 },
          { label: 'HP - Wed', value: 16 },
          { label: 'HP - Thu', value: 17 },
          { label: 'HP - Fri', value: 18 },
          { label: 'HP - Sat', value: 19 },
          { label: 'HP - Sun', value: 20 },
          { label: 'HP - Oth', value: 21 },
          { label: 'HP - Bin', value: 22 }
        ]
        ///////////
        var selectedBookingClassData = tData.filter((each)=>this.state.classIds.includes(each.value));
        this.setState({
          bookingClassData: tData,
          selectedBookingClassData: selectedBookingClassData,
          spinner: false
        });
      })
      .catch((err) => {
        console.log('get booking error: ', err);
        this.setState({ spinner: false })
      })
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

  getAge = (birthday) => {
    var birthYear = new Date(birthday).getFullYear();
    var currentYear = new Date().getFullYear();
    var age = currentYear - birthYear;

    this.setState({age: age});
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
    if (!this.state.gender) {
      Alert.alert('Please select gender');
      return false;
    }
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
    // if (!this.state.mobile) {
    //   Alert.alert('Please enter phone number');
    //   return false;
    // }
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
    // if (!this.state.country) {
    //   Alert.alert('Please enter country');
    //   return false;
    // }

    return true;
  }

  onCreate = async () => {
    if (this.validate()) {
      let classIds = [];
      this.state.selectedBookingClassData.forEach((each) => {
        classIds.push(each.value);
      })

      var param = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        gender: this.state.gender,
        dob: this.state.dob,
        age: this.state.age,
        email: this.state.email,
        mobile: this.state.mobile,
        address: this.state.address,
        suburb: this.state.suburb,
        city: this.state.city,
        state: this.state.state,
        country: this.state.country,
        classIds: classIds
      }

      this.setState({ spinner: true });
      await createKid(param)
        .then((res) => {
          // console.log('create kid res: ', res.data);
          Alert.alert('Created Success!', '', 
          [
            {text: 'OK', onPress: ()=>this.setState({spinner: false})}
          ]);          
        })
        .catch((err) => {
          console.log('create kid error: ', err);
          Alert.alert('Failed. Try Again', '', 
          [
            {text: 'OK', onPress: ()=>this.setState({spinner: false})}
          ])          
        })
    }
  }

  onUpdate = async () => {
    if (this.validate()) {
      let classIds = [];
      this.state.selectedBookingClassData.forEach((each) => {
        classIds.push(each.value);
      })

      var param = {
        id: this.state.id,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        gender: this.state.gender,
        dob: this.state.dob,
        age: this.state.age,
        email: this.state.email,
        mobile: this.state.mobile,
        address: this.state.address,
        suburb: this.state.suburb,
        city: this.state.city,
        state: this.state.state,
        country: this.state.country,
        classIds: classIds
      }

      this.setState({ spinner: true });
      await updateKid(param)
        .then((res) => {
          // console.log('update kid res: ', res.data);
          Alert.alert('Updated Success!', '', 
          [
            {text: 'OK', onPress: ()=>this.setState({spinner: false})}
          ]);          
        })
        .catch((err) => {
          console.log('update kid error: ', err);
          Alert.alert('Failed. Try Again', '', 
          [
            {text: 'OK', onPress: ()=>this.setState({spinner: false})}
          ])          
        })
    }
  }

  render() {
    return (
      <View style={styles.container}>
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
          <View style={[styles.row, { zIndex: 110 }]}>
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
          </View>
          <View style={[styles.row, {...(Platform.OS !== 'android' && {
            zIndex: 100
            }) }]}>
            <View style={styles.key}><Text style={styles.requireMark}>*</Text><Text style={styles.txt}>Birthday :</Text></View>
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
          <View style={styles.row}>
            <View style={styles.key}><Text style={styles.txt}>Age :</Text></View>
            <View style={styles.value}><Text style={[styles.txt, { marginLeft: normalize(15) }]}>{this.state.age}</Text></View>
          </View>
          {/* <View style={styles.row}>
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
          </View> */}
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
            <View style={styles.key}><Text style={styles.txt}>Country :</Text></View>
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
            <View style={styles.key}><Text style={styles.txt}>Classes :</Text></View>
            <View style={{ width: '63%', height: normalize(100, 'height') }}>
              <SelectMultiple
                style={{
                  marginLeft: normalize(10),
                  borderRadius: normalize(5),
                  borderWidth: normalize(1)
                }}
                rowStyle={{ height: normalize(25, 'height'), paddingTop: 0, paddingBottom: 0 }}
                items={this.state.bookingClassData}
                selectedItems={this.state.selectedBookingClassData}
                onSelectionsChange={(selectedItems) => {
                  this.setState({
                    selectedBookingClassData: selectedItems
                  });
                }}
              />
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
          <LinearGradient colors={['#F4F4F4', '#DCDCDC','#DCDCDC']} style={styles.btn}>
          {
            this.state.func == 'create' ?
              <TouchableOpacity  onPress={() => this.onCreate()}>
                <Text style={styles.btnTxt}>Create</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => this.onUpdate()}>
                <Text style={styles.btnTxt}>Update</Text>
              </TouchableOpacity>
          }
          </LinearGradient>
          </View>
        </View>
        </LinearGradient>
      </View>
    );
  }
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  btn: {
    width: normalize(136),
    height: normalize(48, 'height'),
    alignItems: 'center',
    borderRadius: normalize(50),
    shadowColor: 'rgb(255, 255, 255)',
    shadowOpacity: 0.2,
    shadowOffset: {width: 5, height: 5},
    elevation: 3,
    justifyContent: "center",
    marginTop: normalize(10, 'height'),
  },
  btnTxt: {
    fontSize: RFPercentage(2.2),
    color: '#333333'
  },
});