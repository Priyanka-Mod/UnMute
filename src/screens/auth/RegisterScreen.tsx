import React from "react";
import { Image, Text, View } from "react-native";
import { Input, PrimaryButton } from "../../components";
import { Colors } from "../../utils";

const RegisterScreen = ({ navigation }: any) => {
    return (
        <View style={{ backgroundColor: Colors.backgroundGray, flex: 1 }}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image style={{ height: 200, width: 200 }}
                    resizeMode="contain"
                    source={require("../../assets/img/UnmuteLogo.png")} />
                <Text style={{ fontSize: 30, fontWeight: '900', color: 'white' }}>Silence Cancelled,</Text>
                <Text style={{ fontSize: 30, fontWeight: '900', color: 'white', marginBottom: 60 }}>Sound On</Text>
                <Input placeholder="Enter UserName" icon={require('../../assets/img/user.png')} iconSize={25} />
                <Input placeholder="Enter Email" icon={require('../../assets/img/mail.png')} iconSize={25} />
                <Input placeholder="Enter Password" icon={require('../../assets/img/password.png')} secureTextEntry iconSize={25} />
                <View style={{ width: '90%', marginTop: 20 }}>
                    <PrimaryButton title="Create Account" onPressButton={() => navigation.navigate('AppStack')} />
                </View>
            </View>
        </View>
    )
}

export default RegisterScreen