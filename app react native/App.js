/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';

//import navigation
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

//import screens
import HomeScreen from './screens/HomeScreen';
import AdminScreen from './screens/AdminScreen';
import OwnerScreen from './screens/OwnerScreen';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import HouseDetailScreen from './screens/HouseDetailScreen';
import RoomDetailScreen from './screens/RoomDetailScreen';
import MenuScreen from './screens/MenuScreen';
import EditHouseScreen from './screens/EditHouseScreen';
import EditRoomScreen from './screens/EditRoomScreen';

const StackNavigatorScreens = createStackNavigator(
  {
    Home: HomeScreen,
    Admin: AdminScreen,
    Owner: OwnerScreen,
    Login: LoginScreen,
    Registration: RegistrationScreen,
    HouseDetail: HouseDetailScreen,
    RoomDetail: RoomDetailScreen,
    EditHouse: EditHouseScreen,
    EditRoom: EditRoomScreen
  },
  {
    initialRouteName: 'Home',
  }
);

const DrawerNavigatorScreens = createDrawerNavigator(
  {
    Home: StackNavigatorScreens
  }, {
  contentComponent: props => <MenuScreen {...props} />
}
);

export default createAppContainer(DrawerNavigatorScreens);