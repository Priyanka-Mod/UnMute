import React, { useMemo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { BottomMusicCard, MusicListCard } from "../../components";
import { Colors } from "../../utils";
import { MusicData } from "../../mockData";
import { useMusic } from "../../service/MusicContextService";
import { useNavigation } from "@react-navigation/native";

const PlaylistScreen = ({ route }: any) => {
    const url = route.params.url
    const title = route.params.title
    const genreId = route.params.genreId
    const artistId = route.params.artistId
    const { updateTrack, currentIndex } = useMusic()
    const navigation = useNavigation<any>()

    let type = ''

    const listData = useMemo(() => {
        if (artistId) {
            type = "artist"
            return MusicData.filter((music) => music.artistId === artistId)
        }
        else if (genreId) {
            type = "category"
            return MusicData.filter((music) => music.genreId === genreId)
        }
        else
            return []
    }, [genreId, artistId])

    let Id
    if (artistId) {
        Id = artistId
    } else {
        Id = genreId
    }
    const trackId = type.concat('-', Id)

    const renderNewPlaylist = async () => {
        await updateTrack(listData, trackId, 0)
        navigation.navigate('Playing')
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.backgroundGray, }}>

            <View>
                <TouchableOpacity style={{ position: 'absolute', top: 30, left: 0, zIndex: 10, }}
                    onPress={() => {
                        navigation.goBack()
                    }}>
                    <Image style={{ width: 40, height: 40, zIndex: 2, tintColor: 'white' }}
                        source={require(
                            './../../assets/img/backArrow.png'
                        )} />
                </TouchableOpacity>
                <Image style={{
                    alignSelf: 'center',
                    height: 280,
                    width: "100%"
                }} resizeMode="cover"
                    source={{
                        uri: url,
                    }} />
                <Text style={{ color: 'white', fontSize: 50, fontWeight: '900', position: 'absolute', zIndex: 2, top: 190, left: 10 }}>{title}</Text>
            </View>
            <View style={{ marginVertical: 20, marginRight: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 20 }}>
                <TouchableOpacity>
                    <Image style={{ height: 40, width: 40, tintColor: 'white' }} source={require('./../../assets/img/heart.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: 15, backgroundColor: Colors.primaryPurple, borderRadius: 100 }} onPress={renderNewPlaylist}>
                    <Image style={{ tintColor: 'white', width: 20, height: 20 }} source={require('./../../assets/img/playButton.png')} />
                </TouchableOpacity>
            </View>

            <MusicListCard list={listData} trackId={trackId} />
            {currentIndex !== undefined ? <BottomMusicCard /> : null}

        </View>
    )
}

export default PlaylistScreen