import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Header, MusicAlbumCard, PrimaryButton } from "../../components";
import { Colors } from "../../utils";

const UserProfileScreen = ({ navigation }: any) => {

    return (
        <View style={{ flex: 1, backgroundColor: Colors.backgroundGray }}>
            <Header title="Profile" iconLeft={require('../../assets/img/backArrow.png')} onBackPress={() => navigation.goBack()} />
            <View style={{ marginVertical: 20, marginHorizontal: 10 }}>
                <Image style={{ resizeMode: 'cover', borderRadius: 100, alignSelf: 'center' }} source={{
                    uri: "https://cdn2.f-cdn.com/contestentries/1440473/30778261/5bdd02db9ff4c_thumb900.jpg",
                    width: 100,
                    height: 100,
                }} />
                <Text style={{ textAlign: 'center', color: 'white', fontSize: 25, fontWeight: '800', marginTop: 15 }}>User</Text>

                <View style={{ marginVertical: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
                    <TouchableOpacity style={{ flex: 1, borderRadius: 10, borderColor: '#AD7BF8', borderWidth: 2, paddingVertical: 10, }}>
                        <Text style={{ color: '#AD7BF8', textAlign: 'center', fontSize: 24, fontWeight: '700' }}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, borderRadius: 10, borderColor: 'white', borderWidth: 2, paddingVertical: 10, }}>
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 24, fontWeight: '700' }}>Share</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center', gap: 20 }}>
                    <View style={{ gap: 10, }}>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: '800', textAlign: 'center' }}>258</Text>
                        <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>My Music</Text>
                    </View>
                    <View style={{ gap: 10, paddingHorizontal: 30, marginHorizontal: 20, borderColor: "#a2a2a2", borderLeftWidth: 1, borderRightWidth: 1 }}>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: '800', textAlign: 'center' }}>13.9K</Text>
                        <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>Followers</Text>
                    </View>
                    <View style={{ gap: 10, }}>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: '800', textAlign: 'center' }}>4.7K</Text>
                        <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>Following</Text>
                    </View>
                </View>

            </View>
            <View style={{ position: 'absolute', bottom: 20, width: '90%', alignSelf: 'center' }}>
                <PrimaryButton title="Log Out" onPressButton={() => navigation.navigate("AuthStack")} />
            </View>
        </View>
    )
}

export default UserProfileScreen