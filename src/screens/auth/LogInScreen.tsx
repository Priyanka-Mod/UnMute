import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Input, PrimaryButton } from "../../components";
import { Colors } from "../../utils";
import { NavigationPropType } from "../../types";

const LogInScreen = ({ navigation }: any) => {
    return (
        <View style={{ backgroundColor: Colors.backgroundGray, flex: 1 }}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image style={{ height: 200, width: 200 }}
                    resizeMode="contain"
                    source={require("../../assets/img/UnmuteLogo.png")} />
                <Text style={{ fontSize: 30, fontWeight: '900', color: 'white' }}>Silence Cancelled,</Text>
                <Text style={{ fontSize: 30, fontWeight: '900', color: 'white', marginBottom: 60 }}>Sound On</Text>
                <Input placeholder="Enter Email" icon={require('../../assets/img/mail.png')} iconSize={25} />
                <Input placeholder="Enter Password" icon={require('../../assets/img/password.png')} secureTextEntry iconSize={25} />
                <View style={{ width: '90%', marginTop: 20 }}>
                    <PrimaryButton title="Log In" onPressButton={() => navigation.navigate('AppStack')} />
                    <TouchableOpacity style={{ marginTop: 20 }} onPress={() => navigation.navigate('Register')}>
                        <Text style={{ color: Colors.primaryPurple, textAlign: 'center', fontSize: 20, fontWeight: '700' }}>Create Account?</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

export default LogInScreen