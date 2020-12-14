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
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";

import normalize from 'react-native-normalize';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import InsetShadow from 'react-native-inset-shadow'
import LinearGradient from "react-native-linear-gradient";

import Spinner from 'react-native-loading-spinner-overlay';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-community/async-storage';
import RadioForm from 'react-native-simple-radio-button';
import Icon from 'react-native-vector-icons/Entypo';
Icon.loadFont();
import FeatherIcons from 'react-native-vector-icons/Feather';
FeatherIcons.loadFont();
import DropDownPicker from 'react-native-dropdown-picker';

import { signup } from '../../api';
import { IMAGES, RouteParam } from '../../constants';

export default class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pwd: '',
      cPwd: '',
      role: '',
      playerSignupAsMember: false,
      spinner: false
    }
  }

  componentDidMount() {
  }

  validateEmail = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(this.state.email);
  }

  onSignup = async () => {
    if (!this.state.email) {
      Alert.alert('Please enter your email address');
      return;
    }
    if (!this.validateEmail()) {
      Alert.alert('Please enter a valid email address');
      return;
    }
    if (!this.state.pwd) {
      Alert.alert('Please enter password');
      return;
    }
    if (this.state.pwd.length < 6) {
      Alert.alert('Please enter password at least 6 length');
      return;
    }
    if (this.state.pwd != this.state.cPwd) {
      Alert.alert('Password not matched!');
      return;
    }
    if (!this.state.role) {
      Alert.alert('Please select role');
      return;
    }
    this.setState({ spinner: true });

    await signup(this.state.email, this.state.pwd, this.state.role, this.state.playerSignupAsMember)
      .then((res) => {
        this.setState({ spinner: false });

        const {id, is_member} = res;

        Alert.alert('Account has been created successfully!');
        if(!is_member)
          this.props.navigation.navigate('Login');
        else {
          RouteParam.id = id;
          this.props.navigation.navigate('AddMemberProfile');
        }
      })
      .catch((err) => {
        console.log('signup err', err);

        Alert.alert(
          'Signup failed. \n Please try again',
          '',
          [
            { text: "OK", onPress: () => this.setState({ spinner: false }) }
          ],
        );
      })
  }

  onRadio = () => { }

  render() {
    return (
        <KeyboardAvoidingView
            behavior={Platform.Os == "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <LinearGradient colors={['#F9F9F9', '#E1E1E1','#E1E1E1']} style={{flex: 1}}>
                <Spinner
                    visible={this.state.spinner}
                    textContent={''}
                    textStyle={styles.spinnerTextStyle}
                />
                
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                        <Icon name="chevron-thin-left" style={styles.icon}></Icon>
                    </TouchableOpacity>
                </View>
                {/* <View style={{flex: 1}}> */}
                    <View style={styles.logoContainer}>
                        <Image
                            source={IMAGES.logo}
                            resizeMode="contain"
                            style={styles.logo}
                        />
                    </View>

                    <View style={styles.widgetContainer}>
                
                        <InsetShadow shadowColor='rgb(255, 255, 255)' shadowOpacity = {0.9} shadowOffset= {2} elevation= {9} containerStyle={styles.txtInputContainer}>
                            <TextInput
                                style={styles.txtInput}
                                autoCapitalize='none'
                                placeholder='Email'
                                placeholderTextColor='rgba(0,0,0,0.4)'
                                value={this.state.email}
                                onChangeText={(text) => this.setState({ email: text })}
                            />
                        </InsetShadow>
                        <InsetShadow shadowColor='rgb(255, 255, 255)' shadowOpacity = {0.9} shadowOffset= {2} elevation= {9} containerStyle={styles.txtInputContainer}>
                            <TextInput
                                style={styles.txtInput}
                                placeholder='Password'
                                placeholderTextColor='rgba(0,0,0,0.4)'
                                secureTextEntry={true}
                                value={this.state.pwd}
                                onChangeText={(text) => this.setState({ pwd: text })}
                            />
                        </InsetShadow>
                        <InsetShadow shadowColor='rgb(255, 255, 255)' shadowOpacity = {0.9} shadowOffset= {2} elevation= {9} containerStyle={styles.txtInputContainer}>
                            <TextInput
                                style={styles.txtInput}
                                placeholder='Confirm Password'
                                placeholderTextColor='rgba(0,0,0,0.4)'
                                secureTextEntry={true}
                                value={this.state.cPwd}
                                onChangeText={(text) => this.setState({ cPwd: text })}
                            />
                        </InsetShadow>
                        <View style={[styles.dropdown, {...(Platform.OS !== 'android' && {
                            zIndex: 10
                            })}]}>
                            <DropDownPicker
                                items={[
                                    { label: 'PLAYER', value: 1 },
                                    { label: 'PARENT', value: 2 },
                                ]}
                                defaultValue={this.state.role}
                                placeholder='Select Role'
                                placeholderStyle={{
                                    fontSize: RFPercentage(2.4),
                                    color: 'rgba(0,0,0,0.4)'
                                }}
                                labelStyle={{
                                    fontSize: RFPercentage(2.4),
                                    color: '#333333'
                                }}
                                containerStyle={{ height: '100%' }}
                                style={{ backgroundColor: '#E8E8E8' }}
                                itemStyle={{ justifyContent: 'flex-start' }}
                                dropDownStyle={{ backgroundColor: '#E8E8E8', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
                                onChangeItem={item => this.setState({ role: item.value })}
                            />
                        </View>
                        {
                            this.state.role === 1 &&
                            <View style={{width: '90%', flexDirection: 'row', justifyContent: 'flex-start'}}>
                                <View style={styles.playerRoleCheck}>
                                    <CheckBox
                                        style={{ width: 20, height: 20 }}
                                        tintColors={true? '##F9F9F9': "#333333"}
                                        tintColor="##F9F9F9"
                                        onCheckColor="#333333"
                                        onFillColor="##F9F9F9"
                                        value={this.state.playerSignupAsMember}
                                        disabled={false}
                                        boxType={'square'}
                                        onValueChange={(value) => this.setState({ playerSignupAsMember: value })}
                                    />
                                    <Text style={styles.playerRoleLabel}>Signup as Member</Text>
                                </View>
                            </View>
                            }
                            <LinearGradient colors={['#F4F4F4', '#DCDCDC','#DCDCDC']} style={styles.signupBtnContainer}>
                                <TouchableOpacity onPress={this.onSignup} style={{flexDirection: 'row'}}>
                                    <FeatherIcons name="check-circle" style={{ fontSize: RFPercentage(3), color: "#27AE60" }}/>
                                    <Text style={styles.signupBtn}>Signup</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                    {/* </View> */}
                </LinearGradient>
            </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
        alignSelf: 'center',
        marginTop: normalize(40, 'height'),
        // borderWidth: 1
    },
    icon: {
        fontSize: RFPercentage(2.2),
    },
    logoContainer: {
        height: '40%',
        justifyContent: "space-between",
        alignItems: 'center',
        // borderWidth: 5
    },
    
    logo: {
        width: normalize(180),
        alignSelf: "center",
        marginBottom: normalize(0, 'height')
    },

    widgetContainer: {
        height: '60%',
        alignItems: 'center',
        // borderWidth: 5
    },
    dropdownContainer: {
        width: '90%',
        height: normalize(148, 'height'),
    },
    dropdown: {
        width: '90%',
        height: normalize(48, 'height'),
        borderRadius: normalize(50),
        // borderColor: "#000000",
        justifyContent: "center",
        marginTop: normalize(10, 'height'),
    },
    txtInputContainer: {
        width: '90%',
        height: normalize(48, 'height'),
        backgroundColor: "#E8E8E8",
        borderRadius: normalize(50),
        // borderColor: "#000000",
        justifyContent: "center",
        marginTop: normalize(10, 'height'),
    },
    txtInput: {
        color: "rgba(0,0,0,1)",
        fontSize: RFPercentage(2.4),
        marginLeft: normalize(10),
        padding: 0 //android
    },
    playerRoleCheck: {
        flexDirection: 'row',
        marginLeft: normalize(10),
        marginTop: normalize(10, 'height')
    },
    playerRoleLabel: {
        color: "#333333",
        fontSize: RFPercentage(2.4),
        marginLeft: normalize(20),
    },
    signupBtnContainer: {
        width: normalize(136),
        height: normalize(48, 'height'),
        alignItems: 'center',
        // backgroundColor: "rgba(255,255,255,0.8)",
        borderRadius: normalize(50),
        shadowColor: 'rgb(255, 255, 255)',
        shadowOpacity: 0.2,
        shadowOffset: {width: 5, height: 5},
        elevation: 3,
        // borderColor: "rgba(255,255,255,1)",
        // borderWidth: 2,
        justifyContent: "center",
        marginTop: normalize(70, 'height'),
    },
    signupBtn: {
        color: "#333333",
        fontSize: 15,
        fontWeight: "500",
        alignSelf: "center",
        marginLeft: normalize(15),
        padding: 0
    }
});