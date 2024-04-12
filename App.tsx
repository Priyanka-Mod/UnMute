import React, { Fragment, useEffect } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, StatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RegisterScreen from "./src/screens/auth/RegisterScreen";
import LogInScreen from "./src/screens/auth/LogInScreen";
import { NavigationContainer } from "@react-navigation/native";
import AuthScreen from "./src/components/AuthScreen";
import HomeScreen from "./src/screens/app/HomeScreen";
import AppNavigation from "./src/navigation/AppNavigation";
import AuthNavigation from "./src/navigation/AuthNavigation";
import { Colors } from "./src/utils";
import { MusicProvider } from "./src/service/MusicContextService";
import TrackPlayer, { AppKilledPlaybackBehavior, Capability } from "react-native-track-player";
const Stack = createNativeStackNavigator();
const App = () => {

  return (
    <MusicProvider>
      <NavigationContainer>
        <Fragment><View style={{ flex: 1, }}>
          <StatusBar backgroundColor='white'
            barStyle='light-content' />
          <Stack.Navigator initialRouteName="LogIn" screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name="Auth" component={AuthScreen} />
            <Stack.Screen name="AuthStack" component={AuthNavigation} />
            <Stack.Screen name="AppStack" component={AppNavigation} />

          </Stack.Navigator>
        </View>
          <View style={{ position: 'absolute', bottom: 0, backgroundColor: 'black', width: '100%' }} />

        </Fragment>
      </NavigationContainer>
    </MusicProvider>
  )

}

export default App