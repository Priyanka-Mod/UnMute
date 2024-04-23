import React from "react";
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { BottomMusicCard, Header, Input } from "../../components";
import { Colors } from "../../utils";
import { CategoryData } from "../../mockData";
import { useMusic } from "../../service/MusicContextService";
import { NavigationPropType } from "../../types";

const { width } = Dimensions.get('screen')
const SearchScreen = ({ navigation }: NavigationPropType) => {
    const { music, currentIndex } = useMusic()

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