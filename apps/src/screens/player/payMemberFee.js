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

import Spinner from 'react-native-loading-spinner-overlay';
import normalize from 'react-native-normalize';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import Icon from 'react-native-vector-icons/Entypo';
Icon.loadFont();

import { CreditCardInput, LiteCreditCardInput } from "react-native-input-credit-card";
import { RouteParam } from "../../constants";
import { payMemberFee } from "../../api";

export default class PayMemberFeeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: RouteParam.id,
      fee: RouteParam.member_fee,
      card_number: '',
      expiry: '',
      cvc: '',
      spinner: false
    };
  }

  async componentDidMount() {

  }

  onChange = form => {
    // if(form.valid) {
      console.log('card form', form)
    if(form.status.number === "valid")
      this.setState({card_number: form.values.number});
    if(form.status.expiry === 'valid')
      this.setState({expiry: form.values.expiry});
    if(form.status.cvc === 'valid')
      this.setState({cvc: form.values.cvc});
    // }
  }

  validate = () => {
    if (this.state.card_number === 0) {
        Alert.alert('Please input card number');
        return false;
    }
    if (this.state.expiry === '') {
        Alert.alert('Please input expiry');
        return false;
    }
    if (this.state.cvc === '') {
        Alert.alert('Please input cvc');
        return false;
    }
    
    return true;
  }

  onConfirm = () => {
    if(this.validate())
    Alert.alert('Are you sure this payment?', '', [
      {
        text: 'Ok',
        onPress: async () => {
          //post payment method
          this.setState({ spinner: true });
          await payMemberFee(this.state)
            .then((res) => {
              this.setState({ spinner: false });
                Alert.alert('Thanks for Registering! Your membership request will be reviewed and approved by admin shortly');
                this.props.navigation.navigate('Login');
            })
            .catch((err) => {
                console.log('submit profile err', err);
        
                Alert.alert(
                    'Submit failed. \n Please try again',
                    '',
                    [
                        { text: "OK", onPress: () => this.setState({ spinner: false }) }
                    ],
                );
            })
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

  render() {
    return (
      <View
        // behavior={Platform.Os == "ios" ? "padding" : "height"}
        style={styles.container}>
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

          <View style={styles.widgetContainer}>
            <View>
              <Text style={styles.title}>Pay Member Fee</Text>
            </View>
            <View style={styles.txtInput}>
              <Text>Member Fee</Text>
              <View style={styles.txtInputContainer}>
                  <TextInput
                      style={styles.txtInput}
                      autoCapitalize='none'
                      value={this.state.fee+''}
                      readOnly
                  />
              </View>
            </View>
            <View style={styles.card}>
              {
                this.cardView()
              }
            </View>
            
            <TouchableOpacity style={styles.btn} onPress={() => this.onConfirm()}>
              <Text style={styles.btnTxt}>CONFIRM</Text>
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
    height: '10%',
    justifyContent: "space-between",
    alignItems: 'center',
    // borderWidth: 5
  },
  title: {
    fontSize: RFPercentage(4),
    marginBottom: 30
  },
  widgetContainer: {
    height: '70%',
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

  body: {
    flex: 1,
    justifyContent: 'center',
    padding: normalize(20)
  },
  card: {
    height: '60%',
    marginTop: 20
  },
  txtInput: {
    width: '85%',
    // height: '90%',
    color: "rgba(50,55,55,1)",
    fontSize: RFPercentage(2.4),
    marginLeft: normalize(10),
    padding: 0, //android
    // borderWidth: 1
  },
  txtInputContainer: {
    width: '100%',
    height: normalize(35, 'height'),
    backgroundColor: "#ffffff",
    borderRadius: normalize(8),
    borderColor: "#000000",
    borderWidth: 1,
    justifyContent: "center",
    marginTop: normalize(5, 'height'),
  },
  txt: {
    fontSize: RFPercentage(2.2)
  },
  btn: {
    width: '50%',
    height: normalize(30, 'height'),
    backgroundColor: '#bb3333',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: normalize(20, 'height'),
    borderRadius: normalize(5),
  },
  btnTxt: {
    fontSize: RFPercentage(2.4),
    color: '#ffffff'
  },
  
});