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
  Platform
} from "react-native";

import normalize from 'react-native-normalize';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';
import KeyboardManager from 'react-native-keyboard-manager';
import InsetShadow from 'react-native-inset-shadow'
import LinearGradient from "react-native-linear-gradient";

import FeatherIcons from 'react-native-vector-icons/Feather';
FeatherIcons.loadFont();
import IonIcons from 'react-native-vector-icons/Ionicons';
IonIcons.loadFont();

import { login } from '../../api';
import { IMAGES, RouteParam } from '../../constants';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pwd: '',      
      spinner: false
    }
  }

  componentDidMount() {
    this.keyboardManager();
    AsyncStorage.getItem('loggedInUser')
      .then((res) => {
        if (res) {
          var user = JSON.parse(res);
          RouteParam.user = user;
          if(user.grade == 1 ) this.props.navigation.navigate('TeacherTabs');
          else if(user.grade == 2 ) this.props.navigation.navigate('PlayerTabs');
          else if(user.grade == 3 ) this.props.navigation.navigate('ParentTabs');
        }
      })
  }

  keyboardManager = () => {
    if (Platform.OS === 'ios') {
      KeyboardManager.setEnable(true);
      KeyboardManager.setEnableDebugging(false);
      KeyboardManager.setKeyboardDistanceFromTextField(10);
      KeyboardManager.setPreventShowingBottomBlankSpace(true);
      KeyboardManager.setEnableAutoToolbar(true);
      KeyboardManager.setToolbarDoneBarButtonItemText("Done");
      KeyboardManager.setToolbarManageBehaviour(0);
      KeyboardManager.setToolbarPreviousNextButtonEnable(false);
      KeyboardManager.setShouldToolbarUsesTextFieldTintColor(false);
      KeyboardManager.setShouldShowTextFieldPlaceholder(true); // deprecated, use setShouldShowToolbarPlaceholder
      KeyboardManager.setShouldShowToolbarPlaceholder(true);
      KeyboardManager.setOverrideKeyboardAppearance(false);
      KeyboardManager.setShouldResignOnTouchOutside(true);
      KeyboardManager.resignFirstResponder();
      KeyboardManager.isKeyboardShowing()
        .then((isShowing) => {
        });
    }
  }
  
  validateEmail = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(this.state.email);
  }

  onLogin = async () => {
    if (!this.state.email) {
      Alert.alert('Please enter your email address');
      return;
    }
    if(!this.validateEmail()){
      Alert.alert('Please enter a valid email address');
      return;
    }
    if (!this.state.pwd) {
      Alert.alert('Please enter password');
      return;
    }

    this.setState({ spinner: true });

    await login(this.state.email, this.state.pwd)
      .then((res) => {
        // console.log('login success', res);
        this.setState({ spinner: false });

        AsyncStorage.setItem('loggedInUser', JSON.stringify(res.user));
        RouteParam.user = res.user;
        
        if(res.user.grade == 1) this.props.navigation.navigate('TeacherTabs');
        else if(res.user.grade == 2) this.props.navigation.navigate('PlayerTabs');
        else if(res.user.grade == 3) this.props.navigation.navigate('ParentTabs');
      })
      .catch((err) => {
        console.log('login errr', err);

        Alert.alert(
          'Login failed. \n Please try again',
          '',
          [
            { text: "OK", onPress: () => this.setState({ spinner: false }) }
          ],
        );
      })
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

        <View style={styles.logoContainer}>
          <Image
            source={IMAGES.logo}
            resizeMode="contain"
            style={styles.logo}
          />          
        </View>

        <View style={styles.widgetContainer}>
          <InsetShadow shadowColor='rgb(255, 255, 255)' shadowOpacity = {0.9} shadowOffset= {2} elevation= {9} containerStyle={styles.txtInputContainer}>
            <FeatherIcons name="mail" style={{ fontSize: RFPercentage(3), color: "#828282" }}/>
            <TextInput
              style={styles.txtInput}
              autoCapitalize='none'
              placeholder='Email'
              placeholderTextColor='rgba(0,0,0,0.4)'
              value={this.state.email}
              onChangeText={(text) => this.setState({ email: text })}
            />
          </InsetShadow>
          <InsetShadow shadowColor='rgb(255, 255, 255)' shadowOpacity = {0.2} shadowOffset= {2} elevation= {9}  containerStyle={styles.txtInputContainer}>
          <FeatherIcons name="lock" style={{ fontSize: RFPercentage(3), color: "#828282" }}/>
            <TextInput
              style={styles.txtInput}
              placeholder='Password'
              placeholderTextColor='rgba(0,0,0,0.4)'
              secureTextEntry={true}
              value={this.state.pwd}
              onChangeText={(text) => this.setState({ pwd: text })}
            />
          </InsetShadow>
            <View >
              <LinearGradient colors={['#F4F4F4', '#DCDCDC','#DCDCDC']} style={styles.loginBtnContainer}>
                <TouchableOpacity onPress={this.onLogin} style={{flexDirection: 'row'}}>
                  <FeatherIcons name="check-circle" style={{ fontSize: RFPercentage(3), color: "#27AE60" }}/>
                  <Text style={styles.loginBtn}>Login</Text>
                </TouchableOpacity>
            </LinearGradient>
            </View>
          <View style={styles.signupBtn}>
            <Text style={{color: '#828282'}}>
              Not registered yet?
            </Text>
            <TouchableOpacity  onPress={()=>this.props.navigation.navigate('Signup')}>
              <Text style={styles.signupTxt}>Create Account</Text>
            </TouchableOpacity>
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
  logoContainer: {
    height: '50%',
    justifyContent: "flex-end",
    alignItems: 'center',
    // borderWidth: 5
  },
  logo: {
    width: normalize(180),
    alignSelf: "center",
    marginBottom: normalize(50, 'height')
  },  
  widgetContainer: {
    height: '50%',
    alignItems: 'center',
    // borderWidth: 5
  },

  txtInputContainer: {
    width: '90%',
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: normalize(48, 'height'),
    backgroundColor: "#E8E8E8",
    borderRadius: normalize(50),
    // borderColor: "#ffffff",
    // borderWidth: 1,
    // justifyContent: "center",
    marginTop: normalize(20, 'height'),    
    paddingLeft: normalize(15),
  },
  txtInput: {
    width: '85%',
    color: "#828282",
    fontSize: 15,
    marginLeft: normalize(13),
    padding: 0,    //android
    // borderWidth: 5,
    // borderColor: '#ff0000'
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
  },
  loginBtn: {
    color: "#333333",
    fontSize: 15,
    fontWeight: "500",
    alignSelf: "center",
    marginLeft: normalize(15),
    padding: 0
  },
  signupBtn:{
    width: '85%',
    flexDirection: 'row',
    height: normalize(30, 'height'),
    justifyContent: 'center',
    alignItems: 'center',    
    marginTop: normalize(20)
    // borderWidth: 1,
  },
  signupTxt:{
    color: "#333333",
    fontSize: 15,
    marginLeft: 10
  }
});