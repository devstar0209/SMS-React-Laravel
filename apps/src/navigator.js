import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from './screens/auth/login';
import SignupScreen from './screens/auth/signup';

import ClassScreen from './screens/teacher/class';
import AttendanceScreen from './screens/teacher/attendance';
import StudentProfileScreen from './screens/teacher/studentProfile';

import ClassBookPlayerScreen from './screens/player/classBookPlayer';
import UploadMembershipScreen from './screens/player/uploadMembership';
import AddMemberProfile from './screens/player/memberProfile';
import PayMemberFeeScreen from './screens/player/payMemberFee';

import ClassBookParentScreen from './screens/parent/classBookParent';
import KidListScreen from './screens/parent/kidList';
import KidProfileScreen from './screens/parent/kidProfile';

import PayMethodScreen from './screens/payMethod';
import ProfileScreen from './screens/profile';

import Icon from 'react-native-vector-icons/Entypo';
Icon.loadFont();

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      headerMode="none"
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
      />
      <Stack.Screen
        name="PayMethod"
        component={PayMethodScreen}
      />
      <Stack.Screen
        name="AddMemberProfile"
        component={AddMemberProfile}
      />
      <Stack.Screen
        name="UploadMembership"
        component={UploadMembershipScreen}
      />
      <Stack.Screen
        name="PayMemberFee"
        component={PayMemberFeeScreen}
      />
    </Stack.Navigator>
  );
}

function TeacherMain() {
  return (
    <Stack.Navigator
      initialRouteName="Class"
      headerMode="none"
    >
      <Stack.Screen
        name="Class"
        component={ClassScreen}
      />
      <Stack.Screen
        name="Attendance"
        component={AttendanceScreen}
      />
      <Stack.Screen
        name="StudentProfile"
        component={StudentProfileScreen}
      />
    </Stack.Navigator>
  )
}

function PlayerMain() {
  return (
    <Stack.Navigator
      initialRouteName="ClassBookPlayer"
      headerMode="none"
    >
      <Stack.Screen
        name="ClassBookPlayer"
        component={ClassBookPlayerScreen}
      />
      
    </Stack.Navigator>
  )
}

function ParentMain() {
  return (
    <Stack.Navigator
      initialRouteName="KidList"
      headerMode="none"
    >
      <Stack.Screen
        name="KidList"
        component={KidListScreen}
      />
      <Stack.Screen
        name="KidProfile"
        component={KidProfileScreen}
      />
      <Stack.Screen
        name="ClassBookParent"
        component={ClassBookParentScreen}
      />
    </Stack.Navigator>
  )
}

function TabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={{ height: 50, flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}
          >
            {
              route.name === 'Main' ?
                <View style={{alignItems: 'center', marginTop: 10}}>
                  <Icon name="home" style={{ fontSize: RFPercentage(2.2), color: isFocused ? '#E85763' : '#333333' }}></Icon>
                  <Text style={{ color: isFocused ? '#E85763' : '#333333' }}>
                    {label}
                  </Text>
                </View>
                : 
                route.name === 'PayMethod' ? 
                <View style={{alignItems: 'center', marginTop: 10}}>
                  <Icon name="credit" style={{ fontSize: RFPercentage(2.2), color: isFocused ? '#E85763' : '#333333' }}></Icon>
                  <Text style={{ color: isFocused ? '#E85763' : '#333333' }}>
                    {label}
                  </Text>
                </View>
                : 
                route.name === 'Profile' ? 
                <View style={{alignItems: 'center', marginTop: 10}}>
                  <Icon name="user" style={{ fontSize: RFPercentage(2.2), color: isFocused ? '#E85763' : '#333333' }}></Icon>
                  <Text style={{ color: isFocused ? '#E85763' : '#333333' }}>
                    {label}
                  </Text>
                </View>
                : 
                null
            }
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();

function TeacherTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Main"
      tabBar={props => <TabBar {...props} />}
    >
      <Tab.Screen
        name="Main"
        component={TeacherMain}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  )
}

function PlayerTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Main"
      tabBar={props => <TabBar {...props} />}
    >
      <Tab.Screen
        name="Main"
        component={PlayerMain}
      />
      <Tab.Screen
        name="PayMethod"
        component={PayMethodScreen}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}

function ParentTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Main"
      tabBar={props => <TabBar {...props} />}
    >
      <Tab.Screen
        name="Main"
        component={ParentMain}
      />
      <Tab.Screen
        name="PayMethod"
        component={PayMethodScreen}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}


function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='none'>
        <Stack.Screen name='Auth' component={AuthStack} />
        <Stack.Screen name='TeacherTabs' component={TeacherTabs} />
        <Stack.Screen name='PlayerTabs' component={PlayerTabs} />
        <Stack.Screen name='ParentTabs' component={ParentTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigator;