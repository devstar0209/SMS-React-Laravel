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

import FeatherIcons from 'react-native-vector-icons/Feather';
FeatherIcons.loadFont();
import Icon from 'react-native-vector-icons/Entypo';
Icon.loadFont();

import { FlatGrid } from 'react-native-super-grid';

import { getClass, getBooking, setBookingNow } from '../../api';
import { IMAGES, RouteParam } from '../../constants';
import LinearGradient from "react-native-linear-gradient";

export default class ClassBookParentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      user: RouteParam.user ? RouteParam.user : '',
      classData: [], classEqualData: [],
      bookingData: [], bookingEqualData: [],
      displayData: [],
      searchWord: '',
      tabIndex: 0,
    }
  }

  async componentDidMount() {
    if (this.state.user) {
      this.getData();
    }
  }

  getData = async () => {
    this.setState({ spinner: true });
    await getClass() // now the same with player
      .then((res) => {
        // console.log('class res: ', res.data);
        this.setState({
          classData: res.data,
          classEqualData: res.data,
          spinner: false
        });

        if (this.state.tabIndex == 0) {
          this.setState({ displayData: res.data });
        }
      })
      .catch((err) => {
        console.log('get class error: ', err);
        this.setState({ spinner: false })
      })

    await getBooking()
      .then((res) => {
        // console.log('booking res: ', res.data);
        this.setState({
          bookingData: res.data,
          bookingEqualDataData: res.data,
          spinner: false
        });

        if (this.state.tabIndex == 1) {
          this.setState({ displayData: res.data });
        }
      })
      .catch((err) => {
        console.log('get booking error: ', err);
        this.setState({ spinner: false })
      })
  }

  onSearchWord = (text) => {
    var tData = [];
    if (this.state.tabIndex == 0) tData = this.state.classEqualData;
    else if (this.state.tabIndex == 1) tData = this.state.bookingEqualData;

    let filtered = tData.filter((each) => {
      return each.type.toLowerCase().includes(text.toLowerCase());
    });

    this.setState({ displayData: filtered });
  }

  onBook = (item) => {
    // this.props.navigation.navigate('Checkout', { class: item });
    Alert.alert('Are you sure this payment?', '', [
      {
        text: 'Ok',
        onPress: async () => {
          this.bookingNow(item);          
        }
      },
      {
        text: 'Cancel',
        onPress: () => { }
      }
    ])
  }

  bookingNow = async (item) => {
    this.setState({spinner: true});
    await setBookingNow(item.id)
      .then((res) => {
        // console.log('booking res: ', res.data);
        Alert.alert('Booking Successfully', '', [
          {
            text: 'OK',
            onPress: () => {
              this.setState({spinner: false});
            }
          }
        ]);
      })
      .catch((err) => {
        console.log('booking error: ', err);
        Alert.alert('Booking Error!', err, [
          {
            text: 'OK',
            onPress: () => {
              this.setState({spinner: false});
            }
          }
        ]);        
      })
  }

  onTab = (tabIndex) => {
    // var tData = [];
    // if (tabIndex == 0) tData = this.state.classData;
    // else if (tabIndex == 1) tData = this.state.bookingData;

    // this.setState({
    //   tabIndex: tabIndex,
    //   displayData: tData
    // });
    this.setState({ tabIndex: tabIndex });
    this.getData();
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

  renderItem(item) {
    const dayArr = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemHeaderTxt}>{item.type}</Text>
        </View>
        <View style={styles.itemBody}>
          <View style={styles.item}>
            <View style={styles.itemKey}>
              <Text style={styles.itemTxt}>Start Time:</Text>
            </View>
            <View style={styles.itemValue}>
              <Text style={styles.itemTxt}>{item.start_time}</Text>
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.itemKey}>
              <Text style={styles.itemTxt}>Finish Time:</Text>
            </View>
            <View style={styles.itemValue}>
              <Text style={styles.itemTxt}>{item.finish_time}</Text>
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.itemKey}>
              <Text style={styles.itemTxt}>Open Day:</Text>
            </View>
            <View style={styles.itemValue}>
              <Text style={styles.itemTxt}>{dayArr[item.day - 1]}</Text>
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.itemKey}>
              <Text style={styles.itemTxt}>Age:</Text>
            </View>
            <View style={styles.itemValue}>
              <Text style={styles.itemTxt}>{item.min_age} - {item.max_age}</Text>
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.itemKey}>
              <Text style={styles.itemTxt}>Max Qty:</Text>
            </View>
            <View style={styles.itemValue}>
              <Text style={styles.itemTxt}>{item.max_no}</Text>
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.itemKey}>
              <Text style={styles.itemTxt}>Price:</Text>
            </View>
            <View style={styles.itemValue}>
              <Text style={styles.itemTxt}>${item.price}</Text>
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.itemKey}>
              <Text style={styles.itemTxt}>Fee:</Text>
            </View>
            <View style={styles.itemValue}>
              <Text style={styles.itemTxt}>${item.fee}</Text>
            </View>
          </View>
        </View>
        {
          this.state.tabIndex == 0 &&
          <View style={styles.itemFooter}>
            <LinearGradient colors={['#F4F4F4', '#DCDCDC','#DCDCDC']} style={styles.btn}>
            <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => this.onBook(item)}>
              <FeatherIcons name="check-circle" style={{ fontSize: RFPercentage(1.8), color: "#27AE60" }}/>
              <Text style={styles.btnTxt}>Book Now</Text>
            </TouchableOpacity>
            </LinearGradient>
          </View>
        }
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
            {
              this.state.user.grade == 3 &&
              <Icon name="chevron-thin-left" style={styles.icon}></Icon>
            }
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onLogout()}>
            <Icon name="log-out" style={styles.icon}></Icon>
          </TouchableOpacity>
        </View>

        <View style={styles.header}>
          <Text style={styles.headerTxt}>{this.state.tabIndex == 0 ? 'CLASSES' : 'BOOKINGS'}</Text>
        </View>

        <View style={styles.tabs}>
          <TouchableOpacity style={[styles.tab, this.state.tabIndex == 0 ? { backgroundColor: '#E85763' } : { backgroundColor: '#ffffff' }]} onPress={() => this.onTab(0)}>
            <Text style={this.state.tabIndex == 0 ? { textColor: '#ffffff' } : { textColor: '#000000' }}>Sessions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, this.state.tabIndex == 1 ? { backgroundColor: '#E85763' } : { backgroundColor: '#ffffff' }]} onPress={() => this.onTab(1)}>
            <Text style={this.state.tabIndex == 1 ? { textColor: '#ffffff' } : { textColor: '#000000' }}>Booking Sessions</Text>
          </TouchableOpacity>
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
            this.state.displayData.length ?
              <FlatGrid
                showsVerticalScrollIndicator={false}
                itemDimension={normalize(130)}
                data={this.state.displayData}
                spacing={10}
                renderItem={({ item }) => this.renderItem(item)}
              />
              :
              <View style={styles.noData}><Text>No Class</Text></View>
          }
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
    fontSize: RFPercentage(2.5),
    marginBottom: 30
  },
  tabs: {
    width: '90%',
    height: normalize(20, 'height'),
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginRight: normalize(20),
    marginTop: normalize(-10, 'height'),
    marginBottom: normalize(10, 'height'),
  },
  tab: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(20,80,144,1)',
    borderWidth: normalize(1)
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
    padding: normalize(10)
  },

  itemContainer: {
    height: normalize(150, 'height'),
    borderRadius: normalize(5),
    borderWidth: 1
  },
  itemHeader: {
    height: '15%',
    justifyContent: 'center',
    borderColor: '#dddddd',
    borderBottomWidth: normalize(2),
    padding: normalize(5)
  },
  itemHeaderTxt: {
    fontSize: RFPercentage(2),
    color: '#333333',
  },
  itemBody: {
    height: '70%',
    justifyContent: 'center',
  },
  item: {
    height: '14%',
    flexDirection: 'row'
  },
  itemKey: {
    width: '50%',
    alignItems: 'flex-end',
    // borderWidth: 1
  },
  itemValue: {
    width: '50%',
    paddingLeft: normalize(5),
    // borderWidth: 1
  },
  itemTxt: {
    fontSize: RFPercentage(1.8),
    color: '#333333',
  },
  itemFooter: {
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 2
  },
  btn: {
    width: normalize(136),
    height: normalize(28, 'height'),
    alignItems: 'center',
    borderRadius: normalize(50),
    shadowColor: 'rgb(255, 255, 255)',
    shadowOpacity: 0.2,
    shadowOffset: {width: 5, height: 5},
    elevation: 3,
    justifyContent: "center",
    marginBottom: normalize(10, 'height'),
    marginTop: normalize(10, 'height'),
  },
  btnTxt: {
    color: "#333333",
    fontSize: 12,
    fontWeight: "500",
    alignSelf: "center",
    marginLeft: normalize(15),
    padding: 0
  },
  noData: {
    alignSelf: 'center'
  },
});