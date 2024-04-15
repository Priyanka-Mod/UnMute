import { useNavigation } from "@react-navigation/native"
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native"
import { useMusic } from "../service/MusicContextService"
import { usePlayer } from "../hooks/usePlayer"
import { NavigationPropType } from "../types"

export const BottomMusicCard = () => {
    const { music, isAdded } = useMusic()
    const navigation = useNavigation<any>()
    const { togglePlayback, State, playBackState } = usePlayer();

    return (
        <View style={{ paddingHorizontal: 10, backgroundColor: '#313131', position: 'absolute', zIndex: 2, height: 60, width: '90%', bottom: 0, alignSelf: 'center' }}>
            {
                isAdded ? <TouchableOpacity onPress={() => {
                    navigation.navigate('Playing')
                }} style={{ paddingHorizontal: 10, backgroundColor: '#313131', position: 'absolute', zIndex: 10, height: 60, width: '100%', alignSelf: 'center', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', bottom: 0, borderRadius: 8 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={{ borderRadius: 10 }} source={{ uri: music?.artWork, height: 45, width: 45 }} />
                        <View style={{ gap: 2, marginLeft: 15 }}>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>{music?.title}</Text>
                            <Text style={{ color: '#FFFFFF', fontWeight: '600' }}>{music?.artist}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 20, paddingRight: 10 }}>
                        <TouchableOpacity>
                            <Image
                                style={{ width: 25, height: 25, tintColor: 'white' }}
                                source={require('./../assets/img/heart.png')}
                            />
                        </TouchableOpacity>
                        {playBackState.state === State.Loading || playBackState.state === State.Buffering ? <ActivityIndicator /> : <TouchableOpacity onPress={() => togglePlayback()}>
                            <Image
                                style={{ width: 25, height: 25, tintColor: 'white' }}
                                source={playBackState.state === State.Playing ? require('./../assets/img/pause.png') : require('./../assets/img/playButton.png')}
                            />
                        </TouchableOpacity>}
                    </View>
                </TouchableOpacity> :
                    <View style={{ paddingHorizontal: 10, backgroundColor: '#313131', position: 'absolute', zIndex: 2, height: 60, width: '90%', alignSelf: 'center', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', bottom: 0, borderRadius: 8 }}>
                        <ActivityIndicator />
                    </View>
            }
        </View>



    )
}