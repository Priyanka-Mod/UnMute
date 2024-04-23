import React, { useState } from "react";
import { ActivityIndicator, Dimensions, Image, Platform, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../utils";
import { Header } from "../../components";
import Slider from "@react-native-community/slider";
import { useMusic } from "../../service/MusicContextService";
import PagerView from "react-native-pager-view";
import { pauseTrack, playTrack, seekTo, skipToNext, skipToPrevious, skipTrackTo } from "../../service/PlayerService";
import { usePlayer } from "../../hooks/usePlayer";
import { NavigationPropType, PageViewEvent, albumList } from "../../types";

const { width, height } = Dimensions.get('screen')

const MusicPlayingScreen = ({ navigation }: NavigationPropType) => {
    const ref = React.useRef<PagerView>(null);
    const [isOnDragging, setOnDragging] = useState<boolean>(false)
    const { track, currentIndex } = useMusic()

    const { togglePlayback, playBackState, State, position, duration } = usePlayer(ref)

    const onPageSelected = async (event: PageViewEvent) => {
        if (isOnDragging) {
            const { position } = event.nativeEvent;
            if (position !== undefined)
                await skipTrackTo(position)
            setOnDragging(false)
        }
    }
    const onPageScrollStateChanged = async (event: PageViewEvent) => {
        if (event.nativeEvent.pageScrollState === 'dragging') {
            setOnDragging(true)
        }
    }


    return (
        <View style={{ flex: 1, backgroundColor: Colors.backgroundGray, }}>
            <Header title="Now PLaying" iconLeft={require("./../../assets/img/backArrow.png")} onBackPress={() => navigation.goBack()} rightIcon={require('./../../assets/img/more.png')} />
            {track !== null && currentIndex !== undefined ?
                <View style={{ height: Platform.OS === 'android' ? height - 200 : height - 300 }}>
                    <PagerView
                        ref={ref}
                        initialPage={currentIndex}
                        orientation={"horizontal"}
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                        onPageSelected={onPageSelected}
                        onPageScrollStateChanged={onPageScrollStateChanged}
                    >
                        {track?.map((item: albumList, index: number) => {
                            return (
                                <View key={index.toString()} style={{ width: width, justifyContent: 'center' }}>
                                    <Image style={{ alignSelf: 'center', borderRadius: 10 }} source={{
                                        uri: item.artWork,
                                        width: 360,
                                        height: 360
                                    }} />
                                    <View style={{ marginTop: 20, paddingHorizontal: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <View style={{ gap: 10 }}>
                                            <Text style={{ color: 'white', fontSize: 20, fontWeight: '800' }}>{item.title}</Text>
                                            <Text style={{ color: 'white' }}>{item.artist}</Text>
                                        </View>
                                        <TouchableOpacity>
                                            <Image style={{ height: 25, width: 25, tintColor: 'white' }} source={require('./../../assets/img/heart.png')} />
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            )
                        })}
                    </PagerView>

                    <Slider style={{
                        width: '80%', height: 40, alignSelf: 'center',
                    }}
                        minimumTrackTintColor="#6F21DC"
                        maximumTrackTintColor="#a2a2a2"
                        thumbTintColor='#6F21DC'
                        minimumValue={0}
                        maximumValue={duration}
                        value={position}
                        onSlidingComplete={value => {
                            pauseTrack();
                            seekTo(value)
                            playTrack();

                        }}

                    />
                    <View style={{ paddingHorizontal: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'white' }}>{new Date(position * 1000).toISOString().substring(15, 19)}</Text>
                        <Text style={{ color: 'white' }}>{new Date((duration - position) * 1000).toISOString().substring(15, 19)}</Text>
                    </View>

                    <View style={{ marginTop: 30, paddingHorizontal: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <TouchableOpacity>
                            <Image style={{ height: 25, width: 25, tintColor: 'white' }} source={require('./../../assets/img/shuffle.png')} />
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 50 }}>
                            <TouchableOpacity disabled={Boolean(currentIndex <= 0)} onPress={async () => await skipToPrevious()}>
                                <Image style={{ height: 30, width: 30, tintColor: Boolean(currentIndex <= 0) ? 'gray' : 'white' }} source={require('./../../assets/img/previous.png')} />
                            </TouchableOpacity>
                            {playBackState.state === State.Loading || playBackState.state === State.Buffering ? <ActivityIndicator /> : <TouchableOpacity onPress={() => {
                                togglePlayback()
                            }}>
                                <Image style={{ height: 30, width: 30, tintColor: 'white' }} source={playBackState.state === State.Playing ? require('./../../assets/img/pause.png') : require('./../../assets/img/playButton.png')} />
                            </TouchableOpacity>}
                            <TouchableOpacity disabled={Boolean(track?.length - 1 === currentIndex)} onPress={async () => await skipToNext()}>
                                <Image style={{ height: 30, width: 30, tintColor: Boolean(track?.length - 1 === currentIndex) ? 'gray' : 'white' }} source={require('./../../assets/img/next.png')} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity>
                            <Image style={{ height: 25, width: 25, tintColor: 'white' }} source={require('./../../assets/img/repeat.png')} />
                        </TouchableOpacity>
                    </View>

                </View > :
                null
            }
        </View >
    )
}

export default MusicPlayingScreen