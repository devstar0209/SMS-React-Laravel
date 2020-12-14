import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Animated,
  ScrollView,
  Image,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  FlatList
} from "react-native";

import Spinner from 'react-native-loading-spinner-overlay';
import RadioForm from 'react-native-simple-radio-button';
import normalize from 'react-native-normalize';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import PhotoUpload from 'react-native-photo-upload'

import Icon from 'react-native-vector-icons/Entypo';
Icon.loadFont();

import { uploadMembership } from '../../api';
import { IMAGES, RouteParam } from "../../constants";
import LinearGradient from "react-native-linear-gradient";

export default class UploadMembershipScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state={
            id: RouteParam.id,
            member_plan: 0,
            member_no: '',
            member_card: '',
            spinner: false
        }
    }

    validate = () => {
        if (this.state.member_plan === 0) {
            Alert.alert('Please select fee plan');
            return false;
        }
        if (this.state.member_no === '') {
            Alert.alert('Please input member number');
            return false;
        }
        if (this.state.member_card === '') {
            Alert.alert('Please select member card photo');
            return false;
        }
        this.setState({ spinner: true });
        return true;
    }

    onSubmit = async () => {
        if(this.validate()) {
            await uploadMembership(this.state)
            .then((res) => {
                this.setState({ spinner: false });
                RouteParam.member_fee = res.member_fee;
                this.props.navigation.navigate('PayMemberFee');
            })
            .catch((err) => {
                console.log('submit profile err', err);
        
                Alert.alert(
                    'Submit is failed. \n Please try again',
                    '',
                    [
                        { text: "OK", onPress: () => this.setState({ spinner: false }) }
                    ],
                );
            })
        }
    }

    render() {
        

        var radio_props = [
            {label: 'Lifetime member (Fee $1)', value: 1 },
            {label: 'Adult member (Half-year Fee $30)', value: 2 },
            {label: 'Adult member (Full-year Fee $60)', value: 3 },
            {label: 'Junior member (Fee $6)', value: 4 },
        ];

        return(
            <KeyboardAvoidingView
                behavior={Platform.Os == "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <LinearGradient colors={['#F9F9F9', '#E1E1E1','#E1E1E1']} style={{flex: 1}}>
                <Spinner
                    visible={this.state.spinner}
                    textContent={''}
                    textStyle={styles.spinnerTextStyle}
                    />
                <View style={styles.logoContainer}>
                    <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                        <Icon name="chevron-thin-left" style={styles.icon}></Icon>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.widgetContainer}>
                    <View>
                        <Text style={styles.title}>Choose Membership</Text>
                        <RadioForm 
                            radio_props={radio_props}
                            initial={0}
                            labelHorizontal={true}
                            onPress={(value) => {this.setState({member_plan: value})}}
                        />
                    </View>
                    <View style={styles.membership}>
                        <Text>Membership number</Text>
                        <View style={styles.txtInputContainer}>
                            <TextInput
                                style={styles.txtInput}
                                autoCapitalize='none'
                                placeholder='Enter Membership Number'
                                placeholderTextColor='rgba(0,0,0,0.4)'
                                value={this.state.member_no}
                                onChangeText={(text) => this.setState({ member_no: text })}
                                />
                        </View>
                    </View>
                    <View style={styles.card_image}>
                        <Text>Membership card</Text>
                        <PhotoUpload
                            onPhotoSelect={avatar => {
                                if (avatar) {
                                    this.setState({member_card: avatar})
                                }
                            }}
                            >
                            <Image
                                style={{
                                    paddingVertical: 30,
                                    width: 150,
                                    height: 150,
                                    borderColor: 'rgba(0,0,0,0.4)',
                                    borderWidth: 1,
                                    borderRadius: 5
                                }}
                                resizeMode='cover'
                                // source={{
                                //     uri: 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
                                // }}
                            />
                        </PhotoUpload>
                    </View>
                    <LinearGradient colors={['#F4F4F4', '#DCDCDC','#DCDCDC']} style={styles.signupBtnContainer}>
                        <TouchableOpacity onPress={this.onSubmit}>
                            <Text style={styles.signupBtn}>Submit</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
                </LinearGradient>
            </KeyboardAvoidingView>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: RFPercentage(4),
        marginBottom: 30
    },
    logoContainer: {
        height: '10%',
        justifyContent: "space-between",
        alignItems: 'center',
        // borderWidth: 5
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
    widgetContainer: {
        height: '40%',
        alignItems: 'center',
        // borderWidth: 5
      },
    membership: {
        marginTop: 30,
        width: '70%'
    },
    card_image: {
        marginTop: 30,
        width: '70%',
        height: '80%',
    },
    txtInputContainer: {
        width: '90%',
        height: normalize(35, 'height'),
        backgroundColor: "#ffffff",
        borderRadius: normalize(8),
        borderColor: "#000000",
        borderWidth: 1,
        justifyContent: "center",
        marginTop: normalize(5, 'height'),
      },
    txtInput: {
        color: "rgba(0,0,0,1)",
        fontSize: RFPercentage(2.4),
        marginLeft: normalize(10),
        padding: 0 //android
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