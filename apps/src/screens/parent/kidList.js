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

import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Entypo';
Icon.loadFont();

import { getKidList } from '../../api';
import { IMAGES, RouteParam } from "../../constants";

export default class KidListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      user: RouteParam.user ? RouteParam.user : '',
      kidData: [],
      kidEqualData: [],
      searchWord: ''
    }
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', this.componentDidFocus.bind(this));
  }

  componentDidFocus(){
    this.getData();
  }

  getData = async () => {
    this.setState({ spinner: true });

    if (this.state.user) {
      await getKidList()
        .then((res) => {
          // console.log('kid res: ', res.data);
          this.setState({
            kidData: res.data,
            kidEqualData: res.data,
            spinner: false
          })
        })
        .catch((err) => {
          console.log('get kid error: ', err);
          this.setState({ spinner: false })
        })
    }
  }

  onSearchWord = (text) => {
    let filtered = this.state.kidEqualData.filter((each) => {
      var fullName = each.first_name + ' ' + each.last_name;
      return fullName.toLowerCase().includes(text.toLowerCase());
    });
    this.setState({ kidData: filtered });
  }

  onKid = (item) => {    
    this.props.navigation.navigate('KidProfile', { item: item, func: 'update' });
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
      <TouchableOpacity style={styles.row} onPress={() => this.onKid(item)}>
        <Image style={styles.profileImg} source={item.img ? { uri: item.img } : IMAGES.defaultProfileImg} resizeMode='stretch' />
        <Text style={styles.txt}>{item.first_name} {item.last_name}</Text>
      </TouchableOpacity>
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
          <TouchableOpacity onPress={() => this.onLogout()}>
            <Icon name="log-out" style={styles.icon}></Icon>
          </TouchableOpacity>
        </View>

        <View style={styles.header}>
          <Text style={styles.headerTxt}>Kids</Text>
        </View>

        <View style={styles.searchBoxContainer}>
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
        </View>
        <View style={styles.body}>
          {
            this.state.kidData.length ?
              <FlatList
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                data={this.state.kidData}
                renderItem={({ item }) => this.renderItem(item)}
              />
              :
              <View style={styles.noData}><Text>No Kid</Text></View>
          }
        </View>

        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('ClassBookParent', { user: this.state.user })}>
            <Text style={styles.btnTxt}>Class and Booking</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('KidProfile', { func: 'create' })}>
            <Text style={styles.btnTxt}>Create New Kid</Text>
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
    backgroundColor: '#E1E1E1'
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
  iconContainer: {
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
    fontSize: RFPercentage(2.5)
  },
  searchBoxContainer: {
    width: '90%',
    height: normalize(30, 'height'),
    alignSelf: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(20,80,144,1)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchTxt: {
    fontSize: RFPercentage(2.2),
    color: '#333333',
    width: '95%',
    padding: 0, //android
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    padding: normalize(20),
    // borderWidth: 5
  },
  row: {
    height: normalize(40, 'height'),
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 2
  },
  profileImg: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(20),
    borderColor: 'rgba(180, 206, 228,1)',
    borderWidth: 1
  },
  txt: {
    color: 'rgba(20,80,144,1)',
    fontSize: RFPercentage(2.5),
    marginLeft: normalize(5)
  },
  noData: {
    alignSelf: 'center'
  },

  btnRow: {
    width: '90%',
    height: normalize(30, 'height'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: normalize(20, 'height'),
    marginBottom: normalize(20, 'height'),
  },
  btn: {
    width: '45%',
    height: normalize(30, 'height'),
    backgroundColor: '#bb3333',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(5)
  },
  btnTxt: {
    fontSize: RFPercentage(2.2),
    color: '#ffffff'
  },
});