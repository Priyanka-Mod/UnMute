import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { BottomMusicCard, Header, Input } from "../../components";
import { Colors } from "../../utils";
import MusicData from './../../constants/music.json'
import { CategoryData } from "../../mockData";
import { useMusic } from "../../service/MusicContextService";
import { NavigationPropType } from "../../types";

const { width } = Dimensions.get('screen')
const SearchScreen = ({ navigation }: any) => {
    const { music, track, currentIndex } = useMusic()

    // const Genre = [
    //     {
    //         albumImage: 'https://wallpapers.com/images/hd/foam-party-background-x5vdn38j7v8zhfu1.jpg',
    //         albumName: 'Party'
    //     },
    //     {
    //         albumImage: 'https://static.vecteezy.com/system/resources/thumbnails/023/137/505/small_2x/robot-disc-jockey-at-the-dj-mixer-and-turntable-plays-nightclub-during-party-edm-entertainment-party-concept-neural-network-generated-art-photo.jpg',
    //         albumName: 'Electronic'
    //     },
    //     {
    //         albumImage: 'https://i.iheart.com/v3/catalog/album/125219095?ops=fit(480%2C480)',
    //         albumName: 'Chill Vibes'
    //     },
    //     {
    //         albumImage: 'https://i.ytimg.com/vi/fYjN-S3eRgs/maxresdefault.jpg',
    //         albumName: 'Pop'
    //     },
    //     {
    //         albumImage: 'https://media.istockphoto.com/id/184978684/photo/love-song.jpg?s=612x612&w=0&k=20&c=4M_ZvioFfQphcgCOdqN0AC0Ffv24U9JQ6ouJlbuah2M=',
    //         albumName: 'Love'
    //     },
    //     {
    //         albumImage: 'https://w0.peakpx.com/wallpaper/895/763/HD-wallpaper-rapper-hood-dark-style-gang-goon-hiphop-music-night-rap-street.jpg',
    //         albumName: 'Hip Hop'
    //     },
    //     {
    //         albumImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ0OU4OidJ9k4MtMzBLxcmC5j_uarEERn-OSl-SnOx15qZ5peIymuzDkH2C90hNxTwVXw&usqp=CAU',
    //         albumName: 'Devotional'
    //     },
    //     {
    //         albumImage: 'https://i.pinimg.com/originals/c3/bc/cb/c3bccbf3500ba890e1c2c10dab9f5893.jpg',
    //         albumName: 'Classical'
    //     },
    //     {
    //         albumImage: 'https://wallpapers.com/images/hd/foam-party-background-x5vdn38j7v8zhfu1.jpg',
    //         albumName: 'Party'
    //     },
    //     {
    //         albumImage: 'https://static.vecteezy.com/system/resources/thumbnails/023/137/505/small_2x/robot-disc-jockey-at-the-dj-mixer-and-turntable-plays-nightclub-during-party-edm-entertainment-party-concept-neural-network-generated-art-photo.jpg',
    //         albumName: 'Electronic'
    //     },
    //     {
    //         albumImage: 'https://i.iheart.com/v3/catalog/album/125219095?ops=fit(480%2C480)',
    //         albumName: 'Chill Vibes'
    //     },
    //     {
    //         albumImage: 'https://i.ytimg.com/vi/fYjN-S3eRgs/maxresdefault.jpg',
    //         albumName: 'Pop'
    //     },
    //     {
    //         albumImage: 'https://media.istockphoto.com/id/184978684/photo/love-song.jpg?s=612x612&w=0&k=20&c=4M_ZvioFfQphcgCOdqN0AC0Ffv24U9JQ6ouJlbuah2M=',
    //         albumName: 'Love'
    //     },
    //     {
    //         albumImage: 'https://w0.peakpx.com/wallpaper/895/763/HD-wallpaper-rapper-hood-dark-style-gang-goon-hiphop-music-night-rap-street.jpg',
    //         albumName: 'Hip Hop'
    //     },
    //     {
    //         albumImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ0OU4OidJ9k4MtMzBLxcmC5j_uarEERn-OSl-SnOx15qZ5peIymuzDkH2C90hNxTwVXw&usqp=CAU',
    //         albumName: 'Devotional'
    //     },
    //     {
    //         albumImage: 'https://i.pinimg.com/originals/c3/bc/cb/c3bccbf3500ba890e1c2c10dab9f5893.jpg',
    //         albumName: 'Classical'
    //     }
    // ]

    const getRandomColor = () => {
        let n = (Math.random() * 0xfffff * 1000000).toString(16);
        return '#' + n.slice(0, 6);
    };
    return (
        <View style={{ flex: 1, backgroundColor: Colors.backgroundGray, width: width }}>
            <Header title="Search" />
            <View>
                <Input
                    placeholder="Artists , songs , playlist"
                    placeholderTextColor={'gray'}
                    icon={require('./../../assets/img/search.png')}
                    iconSize={25}
                />

                <View>
                    <FlatList
                        contentContainerStyle={{ paddingBottom: music ? 250 : 0, marginHorizontal: 20, justifyContent: 'space-between' }}
                        scrollEnabled
                        numColumns={2}
                        data={CategoryData}
                        renderItem={({ item }) => {
                            return (
                                <View style={{ alignContent: 'center', justifyContent: 'space-between', }}>
                                    <TouchableOpacity
                                        onPress={() => { navigation.navigate('Playlist', { url: item.albumImage, title: item.name, genreId: item.id }) }}
                                        style={{ marginRight: 10, marginBottom: 15, backgroundColor: getRandomColor(), }}>
                                        <View style={{
                                            height: 100, width: (Dimensions.get('window').width / 2) - 20, overflow: 'hidden',
                                        }}>
                                            < Image
                                                style={{
                                                    position: 'absolute', bottom: 0, right: 0, top: 30, left: 120,
                                                    resizeMode: 'cover', transform: [{ rotate: '-35deg' }]
                                                }}
                                                source={{
                                                    uri: item.albumImage,
                                                    height: 100,
                                                    width: 100,
                                                }}
                                            />
                                        </View>
                                        <Text style={{ color: 'white', marginTop: 15, fontSize: 20, fontWeight: '800', position: 'absolute', left: 10, top: 10 }}>{item.id}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                    />
                </View>
            </View >
            {currentIndex !== undefined ? <BottomMusicCard /> : null}

        </View >
    )
}
export default SearchScreen