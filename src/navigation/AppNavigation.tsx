
import React, { Fragment, useEffect, useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import { createDrawerNavigator } from '@react-navigation/drawer';
import { Image, StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import HomeScreen from "../screens/app/HomeScreen";
import { Colors } from "../utils";
import UserProfileScreen from "../screens/app/UserProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigation from "./HomeNavigation";
import LibraryNavigation from "./LibraryNavigation";
import SearchNavigation from "./SearchNavigation";

const Tab = createBottomTabNavigator();
// const Drawer = createDrawerNavigator();
const AppNavigation = () => {
    //   const { colorScheme, toggleColorScheme } = useColorScheme();

    const insets = useSafeAreaInsets();

    return (
        <Fragment>
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backgroundGray }}>
                <StatusBar
                    barStyle='light-content' backgroundColor={Colors.backgroundGray} />
                <Tab.Navigator initialRouteName="HomeStack" screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: { backgroundColor: Colors.backgroundGray, paddingBottom: 0 }
                }} >
                    <Tab.Screen name="HomeStack" component={HomeNavigation} options={{
                        tabBarIcon: (tabInfo) => {
                            return (
                                <Image
                                    style={{ tintColor: tabInfo.focused ? Colors.primaryPurple : "white", height: 30, width: 30 }}
                                    source={require("./../assets/img/home.png")}
                                />
                            );
                        }
                    }} />
                    <Tab.Screen name="Search" component={SearchNavigation} options={{
                        tabBarIcon: (tabInfo) => {
                            return (
                                <Image
                                    style={{ tintColor: tabInfo.focused ? Colors.primaryPurple : "white", height: 30, width: 30 }}
                                    source={require("./../assets/img/search.png")}
                                />
                            );
                        }
                    }} />
                    <Tab.Screen name="Library" component={LibraryNavigation} options={{
                        tabBarIcon: (tabInfo) => {
                            return (
                                <Image
                                    style={{ tintColor: tabInfo.focused ? Colors.primaryPurple : "white", height: 30, width: 30 }}
                                    source={require("./../assets/img/library.png")}
                                />
                            );
                        }
                    }} />

                </Tab.Navigator>
            </SafeAreaView>

            <View style={{ position: 'absolute', bottom: 0, backgroundColor: 'black', height: insets.bottom, width: '100%' }} />
        </Fragment>
    )
}


export default AppNavigation