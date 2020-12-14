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
  FlatList,
} from "react-native";

import normalize from 'react-native-normalize';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Entypo';
Icon.loadFont();

import { CreditCardInput, LiteCreditCardInput } from "react-native-input-credit-card";
import LinearGradient from "react-native-linear-gradient";

export default class PayMethodScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      tabIndex: 0,      
      bankName: '',
      bankNumber: '',
      bankHoldName: ''
    };
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
            this.props.navigation.navigate('Auth', { screen: 'Login' });
          }
        },
        {
          text: 'NO'
        }
      ])
  }

  onChange = form => console.log(form);

  onConfirm = () => {
    Alert.alert('Are you sure this payment?', '', [
      {
        text: 'Ok',
        onPress: async () => {
          //post payment method
        }
      },
      {
        text: 'Cancel',
        onPress: () => { }
      }
    ])
  }

  cardView = () => {
    return (
      <View style={styles.tabBody}>
        <CreditCardInput onChange={this.onChange} />
      </View>
    )
  }

  bankView = () => {
    return (
      <View style={styles.tabBody}>
        <View style={styles.bankItemRow}>
          <View style={styles.bankItemKey}>
            <Text style={styles.txt}>Bank Name</Text>
          </View>
          <View style={styles.bankItemInput}>
            <TextInput
              style={styles.txtInput}
              autoCapitalize='none'
              placeholder=''
              placeholderTextColor='rgba(136,100,157,1)'
              value={this.state.bankName}
              onChangeText={(text) => this.setState({ bankName: text })}
            />
          </View>
        </View>
        <View style={styles.bankItemRow}>
          <View style={styles.bankItemKey}>
            <Text style={styles.txt}>Bank Number</Text>
          </View>
          <View style={styles.bankItemInput}>
            <TextInput
              style={styles.txtInput}
              autoCapitalize='none'
              placeholder=''
              placeholderTextColor='rgba(136,100,157,1)'
              value={this.state.bankNumber}
              onChangeText={(text) => this.setState({ bankNumber: text })}
            />
          </View>
        </View>
        <View style={styles.bankItemRow}>
          <View style={styles.bankItemKey}>
            <Text style={styles.txt}>Bank Hold Name</Text>
          </View>
          <View style={styles.bankItemInput}>
            <TextInput
              style={styles.txtInput}
              autoCapitalize='none'
              placeholder=''
              placeholderTextColor='rgba(136,100,157,1)'
              value={this.state.bankHoldName}
              onChangeText={(text) => this.setState({ bankHoldName: text })}
            />
          </View>
        </View>
      </View>
    )
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

        <View style={styles.header}>
          <Text style={styles.headerTxt}>Your Payment Method</Text>
        </View>

        <View style={styles.body}>

          <View style={styles.tabs}>
            <TouchableOpacity style={[styles.tab, this.state.tabIndex == 0 ? { borderBottomWidth: normalize(2) } : null]} onPress={() => this.setState({ tabIndex: 0 })}>
              <Text style={styles.txt}>CARD</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.tab, this.state.tabIndex == 1 ? { borderBottomWidth: normalize(2) } : null]} onPress={() => this.setState({ tabIndex: 1 })}>
              <Text style={styles.txt}>BANK</Text>
            </TouchableOpacity>
          </View>

          {
            this.state.tabIndex == 0 ? this.cardView() : this.bankView()
          }
          <View style={{alignItems: 'center'}}>
        <LinearGradient colors={['#F4F4F4', '#DCDCDC','#DCDCDC']} style={styles.btn}>
          <TouchableOpacity onPress={() => this.onConfirm()}>
            <Text style={styles.btnTxt}>CONFIRM</Text>
          </TouchableOpacity>
        </LinearGradient>
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
  header: {
    height: normalize(50, 'height'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(10, 'height'),
    // borderWidth: 2
  },
  headerTxt: {
    fontSize: RFPercentage(2.5)
  },

  body: {
    flex: 1,
    justifyContent: 'center',
    padding: normalize(20)
  },
  tabBody: {
    // flex: 1,
    width: '100%',
    padding: normalize(20),
    // borderWidth: 1
  },

  tabs: {
    width: '90%',
    height: normalize(35, 'height'),
    flexDirection: 'row',
    alignSelf: 'center',
  },
  tab: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(20,80,144,1)',
    // borderWidth:1
  },

  bankItemRow: {
    flexDirection: 'row',
    height: normalize(30, 'height'),
    marginTop: normalize(10, 'height'),
    // borderWidth: 1
  },
  bankItemKey: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: normalize(5),
    // borderWidth: 1
  },
  bankItemInput: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: normalize(5),
    borderWidth: 1
  },
  txtInput: {
    width: '85%',
    height: '90%',
    color: "rgba(50,55,55,1)",
    fontSize: RFPercentage(2.4),
    marginLeft: normalize(10),
    padding: 0, //android
    // borderWidth: 1
  },
  
  txt: {
    fontSize: RFPercentage(2.2)
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
    marginTop: normalize(40, 'height'),
  },
  btnTxt: {
    fontSize: 15,
    color: '#333333'
  },
});