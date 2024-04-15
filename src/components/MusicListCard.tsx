import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useMusic } from "../service/MusicContextService";
import { NavigationPropType, albumList } from "../types";

type listType = {
    list: albumList[]
    trackId: string
}

export const MusicListCard = ({ list, trackId }: listType) => {

    const { music, updateTrack } = useMusic()
    const navigation = useNavigation<any>()

    const renderNewPlaylist = async (index: number) => {
        await updateTrack(list, trackId, index)
        navigation.navigate('Playing')
    }

    return (
        <FlatList
            data={list}
            scrollEnabled
            contentContainerStyle={{ paddingBottom: music ? 60 : 0 }}
            renderItem={({ item, index }) => {
                return (
                    <View style={{ marginVertical: 10, flexDirection: 'row', marginHorizontal: 10, alignItems: 'center', justifyContent: 'space-between' }}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 30, flex: 1 }} onPress={
                            () => renderNewPlaylist(index)
                        }>
                            <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>{index + 1}</Text>

                            <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center', }}>
                                <Image source={{
                                    uri: item.artWork,
                                    width: 60,
                                    height: 60
                                }} />
                                <View style={{ gap: 3 }}>
                                    <Text style={{ color: 'white', fontSize: 16, fontWeight: '800' }}>{item.title}</Text>
                                    <Text style={{ color: 'white', fontSize: 14, fontWeight: "400" }}>{item.artist}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image style={{ tintColor: 'white', height: 30, width: 30 }} source={require('./../assets/img/more.png')} />
                        </TouchableOpacity>
                    </View>
                )
            }} />

    )
}