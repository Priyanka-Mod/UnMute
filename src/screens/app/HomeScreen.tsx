import React, { useCallback, useState } from "react"
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { Colors } from "../../utils"
import { BottomMusicCard, MusicAlbumCard } from "../../components"
import { useMusic } from "../../service/MusicContextService"
import { ArtistData, CategoryData, MusicData } from "../../mockData"
import { NavigationPropType } from "../../types"
import AsyncStorage from "@react-native-async-storage/async-storage"

const HomeScreen = ({ navigation }: any) => {
    const newRelease = MusicData.slice(0, 10)
    const { music } = useMusic()
    const { currentIndex } = useMusic()

    return (
        <View style={{ flex: 1, backgroundColor: Colors.backgroundGray }}>
            <View style={{ padding: 20 }}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: music ? 60 : 0 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: '800' }}>Welcome User</Text>
                        <TouchableOpacity style={{ width: 60, height: 60, borderRadius: 100 }} onPress={() => navigation.navigate("UserProfile")}>
                            <Image style={{ resizeMode: 'cover', borderRadius: 100 }} source={{
                                uri: "https://cdn2.f-cdn.com/contestentries/1440473/30778261/5bdd02db9ff4c_thumb900.jpg",
                                width: 60,
                                height: 60,
                            }} />
                        </TouchableOpacity>
                    </View>
                    <MusicAlbumCard albumData={CategoryData} title="Recommended for you" type="genre" />
                    <MusicAlbumCard albumData={newRelease} title="New Release" type="song" />
                    <MusicAlbumCard albumData={ArtistData} title="Artists" type="artist" />
                </ScrollView>
            </View>
            {currentIndex !== undefined ? <BottomMusicCard /> : null}
        </View>
    )
}

export default HomeScreen