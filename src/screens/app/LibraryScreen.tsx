import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { BottomMusicCard, Header } from "../../components";
import { Colors } from "../../utils";
import { ArtistData, CategoryData } from "../../mockData";
import { useMusic } from "../../service/MusicContextService";
import { NavigationPropType } from "../../types";

const LibraryScreen = ({ navigation }: any) => {
    const { music } = useMusic()
    // Add type property to each object in CategoryData
    const categorizedData = CategoryData.map(category => ({ ...category, type: "category" }));
    const artistData = ArtistData.map(artist => ({ ...artist, type: "artist" }))
    // Concatenate both arrays
    const LibraryData = categorizedData.concat(artistData);



    return (
        <View style={{ flex: 1, backgroundColor: Colors.backgroundGray, }}>
            <Header title="Library" />
            <View style={{ marginHorizontal: 20 }}>
                <FlatList
                    data={LibraryData}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: music ? 110 : 60 }}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ marginVertical: 10, backgroundColor: 'rgba(128,128,128,0.3)', borderRadius: 10, }}>
                                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }} onPress={() => {
                                    // to conditionally pass params
                                    const params = item.type === "artist" ? { artistId: item.id } : { genreId: item.id };
                                    navigation.navigate('Playlist', { url: item.albumImage, title: item.name, ...params })
                                }}>
                                    <Image style={{ borderRadius: 10 }} source={{
                                        uri: item.albumImage,
                                        height: 120,
                                        width: 120
                                    }} />
                                    <Text style={{ color: 'white', fontSize: 24, fontWeight: '700' }}>{item.name}</Text>

                                </TouchableOpacity>
                            </View>
                        )
                    }} />
            </View>
            {music ? <BottomMusicCard /> : null}

        </View>
    )
}

export default LibraryScreen