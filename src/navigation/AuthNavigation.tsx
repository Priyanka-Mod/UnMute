
import React, { Fragment, useEffect, useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import HomeScreen from "../screens/app/HomeScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import LogInScreen from "../screens/auth/LogInScreen";
import { Colors } from "../utils";

const Stack = createNativeStackNavigator()
// const Drawer = createDrawerNavigator();
const AuthNavigation = () => {
    //   const { colorScheme, toggleColorScheme } = useColorScheme();
    const insets = useSafeAreaInsets();

    return (
        <Fragment>
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backgroundGray }}>
                <StatusBar
                    barStyle='light-content' backgroundColor={Colors.backgroundGray} />
                <Stack.Navigator initialRouteName="LogIn" screenOptions={{
                    headerShown: false

                }}>
                    <Stack.Screen name="LogIn" component={LogInScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                </Stack.Navigator>
            </SafeAreaView>
            <View style={{ position: 'absolute', bottom: 0, backgroundColor: 'black', height: insets.bottom, width: '100%' }} />
        </Fragment>
    )
}


export default AuthNavigation