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
import CheckBox from '@react-native-community/checkbox';
import moment from 'moment';
import Icon from "react-native-vector-icons/Entypo";
Icon.loadFont();

import { getAttendance, setAttendance } from '../../api';
import { IMAGES } from "../../constants";
import LinearGradient from "react-native-linear-gradient";
import InsetShadow from "react-native-inset-shadow";

export default class AttendanceScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classType: this.props.route.params ? this.props.route.params.class.type : '',
      attendanceData: [],
      attendanceEqualData: [],
      classId: this.props.route.params ? this.props.route.params.class.id : '',
      checkArr: [],
      termData: [],
      justTerm: moment(),
      spinner: false,
    }
  }

  async componentDidMount() {
    if (this.state.classId) {
      this.setState({ spinner: true });
      await getAttendance(this.state.classId)
        .then((res) => {
          console.log('attendance res: ', res);
          this.setState({
            attendanceData: res.attendance,
            attendanceEqualData: res.attendance,
            classId: res.class_id,
            spinner: false
          });

          this.initTermData(res.term);
          this.updateCheckArr();
        })
        .catch((err) => {
          console.log('get attendance error: ', err);
          this.setState({ spinner: false })
        })
    }
  }

  initTermData = (termData) => {
    var today = moment();
    var objTermData = [];
    for (var i = 0; i < termData.length; i++) {
      var eachObj = moment(termData[i]);
      objTermData.push(eachObj);
    }
    this.setState({ termData: objTermData });

    for (var i = 0; i < objTermData.length; i++) {
      var eachObj = objTermData[i];

      var isSame = eachObj.isSame(today);
      var isAfter = eachObj.isAfter(today);

      if (isSame || isAfter) {
        this.setState({ justTerm: eachObj });
        break;
      }
    }
  }

  updateCheckArr = () => {
    var { attendanceData } = this.state;
    var checkArr = [];
    attendanceData.forEach((each, index) => {
      checkArr[index] = false;
      each.days.forEach((each) => {
        var eachObj = moment(each);
        if (eachObj.isSame(this.state.justTerm)) {
          checkArr[index] = true;
        }
      })
    })
    this.setState({
      checkArr: checkArr
    })
  }

  onSearchWord = (text) => {
    let filtered = this.state.attendanceEqualData.filter((each) => {
      return each.first_name.toLowerCase().includes(text.toLowerCase()) || each.last_name.toLowerCase().includes(text.toLowerCase());
    });
    this.setState({ attendanceData: filtered }, () => { this.updateCheckArr() });
  }

  onItem = (item) => {
    this.props.navigation.navigate('StudentProfile', { item: item });
  }

  onCheck = (index, value) => {
    var { attendanceData } = this.state;
    if (value) {
      var existedIndex = attendanceData[index].days.indexOf(this.state.justTerm.format('YYYY-MM-DD'));
      if (existedIndex == -1) attendanceData[index].days.push(this.state.justTerm.format('YYYY-MM-DD'));
    }
    else {
      var existedIndex = attendanceData[index].days.indexOf(this.state.justTerm.format('YYYY-MM-DD'));
      attendanceData[index].days.splice(existedIndex, 1);
    }

    this.setState({
      attendanceData: attendanceData
    })
  }

  onSave = () => {
    var { attendanceEqualData } = this.state;
    var param = [];
    attendanceEqualData.forEach((each) => {
      param.push({
        id: each.id,
        class_id: this.state.classId,
        ym: moment().format('YYYY-MM'),
        days: each.days
      })
    });

    setAttendance(JSON.stringify(param))
      .then((res) => {
        console.log('set success', res);
        Alert.alert('Saved Success!');
      })
      .catch((err) => {
        console.log('set error', err);
        Alert.alert('Failed. Try Again');
      })
  }

  onDateArrow = (arrow) => {
    var curIndex = this.state.termData.findIndex((each) => each.isSame(this.state.justTerm));
    if (arrow == 'prev') {
      curIndex = curIndex > 0 ? curIndex - 1 : 0;
    }
    else if (arrow == 'next') {
      curIndex = curIndex < this.state.termData.length - 1 ? curIndex + 1 : this.state.termData.length - 1;
    }

    this.setState({
      justTerm: this.state.termData[curIndex]
    },
      () => {
        this.updateCheckArr();
      }
    );
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

  renderItem(item, index) {
    return (
      <View style={styles.row}>
        <TouchableOpacity style={styles.row} onPress={() => this.onItem(item)}>
          <Image style={styles.profileImg} source={item.img ? { uri: item.img } : IMAGES.defaultProfileImg} resizeMode='stretch' />
          <Text style={styles.itemTxt}>{item.first_name} {item.last_name}</Text>
        </TouchableOpacity>
        <View style={styles.chkBoxContainer}>
          <CheckBox
            style={{ width: 25, height: 25 }}
            value={this.state.checkArr[index]}
            disabled={false}
            boxType={'square'}
            onValueChange={(value) => this.onCheck(index, value)}
          />
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
          <Text style={styles.headerTxt}>Attendance of {this.state.classType}</Text>
        </View>

        <View style={styles.dateContainer}>
          <TouchableOpacity style={styles.arrowBtnContainer} onPress={() => this.onDateArrow('prev')}>
            <Icon name="chevron-thin-left" style={styles.backIcon}></Icon>
          </TouchableOpacity>
          <View style={styles.dateBox}>
            <Text style={styles.date}>
              {this.state.justTerm.format('YYYY-MM-DD')}
            </Text>
          </View>
          <TouchableOpacity style={styles.arrowBtnContainer} onPress={() => this.onDateArrow('next')}>
            <Icon name="chevron-thin-right" style={styles.backIcon}></Icon>
          </TouchableOpacity>
        </View>
        <InsetShadow shadowColor='rgb(255, 255, 255)' shadowOpacity = {0.2} shadowOffset= {2} elevation= {9}  containerStyle={styles.searchBoxContainer}>
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
        </InsetShadow>

        <View style={styles.body}>
          {
            this.state.attendanceData.length ?
              <>
                <FlatList
                  keyExtractor={(item) => item.id.toString()}
                  showsVerticalScrollIndicator={false}
                  data={this.state.attendanceData}
                  renderItem={({ item, index }) => this.renderItem(item, index)}
                />
                <View style={{alignItems: 'center'}}>
                <LinearGradient colors={['#F4F4F4', '#DCDCDC','#DCDCDC']} style={styles.btnContainer}>
                  <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => this.onSave()}>
                    <Text style={styles.btnTxt}>Save</Text>
                  </TouchableOpacity>
                </LinearGradient>
                </View>
              </>
              :
              <View style={styles.noData}><Text>No Attendance</Text></View>
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
  iconContainer:{
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
    height: normalize(30, 'height'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(10, 'height'),
    // borderWidth: 2
  },
  headerTxt: {
    fontSize: RFPercentage(2.5),
  },
  dateContainer: {
    width: '60%',
    height: normalize(30, 'height'),
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: normalize(5, 'height')
  },
  arrowBtnContainer: {
    width: '10%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#333333',
    borderWidth: 1
  },
  dateBox: {
    width: '80%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#333333',
    borderWidth: 1
  },
  date: {
    fontSize: RFPercentage(2.2),
  },
  searchBoxContainer: {
    width: '90%',
    height: normalize(40, 'height'),
    alignSelf: 'center',
    borderRadius: normalize(30),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(10, 'height')
  },
  searchTxt: {
    width: '95%',
    fontSize: RFPercentage(2.2),
    color: '#333333',
    padding: 0, //android
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    padding: normalize(20),
  },
  row: {
    height: normalize(45, 'height'),
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 2
  },
  profileImg: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(50),
    borderColor: 'rgba(180, 206, 228,1)',
    borderWidth: 0
  },
  itemTxt: {
    color: '#333333',
    fontSize: RFPercentage(2.5),
    marginLeft: normalize(5)
  },
  noData: {
    alignSelf: 'center'
  },
  chkBoxContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: normalize(2),
    // borderWidth: 1
  },
  btnContainer: {
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
    // borderWidth: 1
  },
  btnTxt: {
    color: "#333333",
    fontSize: 15,
    fontWeight: "500",
    alignSelf: "center",
    // marginLeft: normalize(15),
    padding: 0
  }

});