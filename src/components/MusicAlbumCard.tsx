import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useMusic } from "../service/MusicContextService";
import { MusicData } from "../mockData";
import { playTrack } from "../service/PlayerService";

type AlbumCardType = {
    albumData: { id: string; name?: string; url?: string; albumImage?: string; title?: string; artist?: string; artistId?: string; artWork?: string; genre?: string; genreId?: string; }[]
    title: string,
    type: 'genre' | 'artist' | 'song'
}

export const MusicAlbumCard = ({ albumData, title, type }: AlbumCardType) => {
    const { updateTrack } = useMusic()
    const navigation = useNavigation<any>()
    const navigateAlbum = (index: number, item: { id: string, name?: string, albumImage?: string }) => {
        const trackData = MusicData.slice(0, 10)

        const renderTrack = async () => {
            await updateTrack(trackData, "newTrack", index).then(async () => {
                // console.log("🚀 ~ renderTrack ~ playBackState.state === State.Ready:", playBackState.state, State.Ready)
                await playTrack()
                setTimeout(() => {
                    navigation.navigate('Playing')
                }, 3000);

            })
        }

        switch (type) {
            case 'song':
                renderTrack()
                break;

            case 'genre':
                navigation.navigate("Playlist", { url: item.albumImage, title: item.name, genreId: item.id })
                break;

            case 'artist':
                navigation.navigate("Playlist", { url: item.albumImage, title: item.name, artistId: item.id })
                break;
        }
        return

    }

    return (
        <View>
            <Text style={{ color: 'white', marginVertical: 20, fontWeight: '800', fontSize: 20 }}>{title}</Text>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={albumData}
                contentContainerStyle={{ gap: 15 }}
                renderItem={({ item, index }) => {
                    return (
                        <View>
                            <TouchableOpacity
                                onPress={() => { navigateAlbum(index, item) }}
                                style={{ alignItems: 'center' }}>
                                <View style={{ borderRadius: 20, height: 140, width: 140, }}>
                                    <Image
                                        style={{
                                            resizeMode: 'cover', borderRadius: 20
                                        }}
                                        source={{
                                            uri: type === "song" ? item.artWork : item.albumImage,
                                            height: 140,
                                            width: 140,
                                        }}
                                    />
                                </View>
                                <Text style={{ color: 'white', marginTop: 15, fontSize: 16 }}>{type === "song" ? item.title : item.id}</Text>
                            </TouchableOpacity>
                        </View>
                    );
                }}
            />
        </View>
    )
}
