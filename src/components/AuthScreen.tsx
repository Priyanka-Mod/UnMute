import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import React, { useCallback, useEffect } from "react";
import { Image, View } from "react-native";
import { Colors } from "../utils";
import SplashScreen from "react-native-splash-screen";


const AuthScreen = ({ navigation }: any) => {
    const init = useCallback(async () => {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'AuthStack' }],
                }),
            );
            SplashScreen.hide()
        } else {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'AppStack' }],
                }),
            );
            SplashScreen.hide()
        }
    }, []);

    useEffect(() => {
        init();
    }, [init]);
    return (
        <View style={{ backgroundColor: Colors.backgroundGray, flex: 1 }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image style={{ height: 500, width: 500 }}
                    resizeMode="contain"
                    source={require('../assets/img/UnmuteLogo.png')} />

            </View>
        </View>
    )
}

export default AuthScreen