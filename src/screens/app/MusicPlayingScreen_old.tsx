import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Dimensions, Image, Platform, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../utils";
import { Header } from "../../components";
import Slider from "@react-native-community/slider";
import TrackPlayer, { Event, State, usePlaybackState, useProgress, useTrackPlayerEvents } from "react-native-track-player";
import { reset } from "react-native-track-player/lib/src/trackPlayer";
import { useMusic } from "../../service/MusicContextService";
import PagerView from "react-native-pager-view";
import { addTrack } from "../../service/PlayerService";
const { width, height } = Dimensions.get('screen')

const MusicPlayingScreen = ({ navigation, route }: any) => {
    const { position, duration } = useProgress()
    const { updateMusic, track, setTrack } = useMusic()

    const ref = React.useRef<any>(PagerView);
    const playBackState = usePlaybackState()
    const index = route.params.index
    let data: any
    data = track
    let positionPresent = route.params.position
    const [songIndex, setSongIndex] = useState(index)

    async function resetTrack() {
        reset()
        await addTrack(data)
    }
    async function isPositionPresent() {
        await TrackPlayer.seekTo(positionPresent)

    }

    useEffect(() => {
        setTrack(data)


        if (index < data.length && index >= 0) {
            // Alert.alert('upadatingMusic called!!!!')
            updateMusic(data[index])
        }
        if (positionPresent) {
            isPositionPresent()

            // async () => {
            // TrackPlayer.seekTo(positionPresent)


            // }
            //console.log("Position got!!", positionPresent);
            Alert.alert("Position found called!!!")
            // TrackPlayer.seekTo(positionPresent)
        } else {
            // console.log("indexReceived:", index)
            Alert.alert("Skip to song called!!!")
            TrackPlayer.skip(songIndex)
            TrackPlayer.play()
        }
        // }
    }, [data])

    useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async (event) => {
        // if (event.index === undefined) {
        //     setSongIndex(0)
        //     return
        // }
        if (
            event.type === Event.PlaybackActiveTrackChanged &&
            event.index != null
        ) {
            const activeTrackIndex = await TrackPlayer.getActiveTrackIndex()

            // console.log("activeTrack playing screen ---------", activeTrackIndex)
            if (!activeTrackIndex) {
                return
            }

            setSongIndex(activeTrackIndex)
            ref.current.setPage(activeTrackIndex)
            // if (positionPresent && ) {
            //     isPositionPresent()

            // }
            TrackPlayer.play()
        }
    })

    // To pause song on song complete
    // useEffect(() => {
    //     const listener = TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, async (data) => {
    //         if (data.track !== music) {
    //             await TrackPlayer.pause();
    //         }
    //     });
    //     return () => {
    //         listener.remove();
    //     }
    // }, []);

    const skipToNext = async (song: any) => {
        updateMusic(song)
        console.log("Data : ", data);

        console.log("song:", song, songIndex);

        // AsyncStorage.setItem('lastMusic', JSON.stringify(song))
        ref.current.setPage(songIndex + 1);
        // setSongIndex(songIndex + 1)
        await TrackPlayer.skipToNext()

    }

    const skipToPrevious = async (song: any) => {
        updateMusic(song)
        // AsyncStorage.setItem('lastMusic', JSON.stringify(song))
        ref.current.setPage(songIndex - 1);
        await TrackPlayer.skipToPrevious()
    }

    const togglePlayback = async (song: any) => {

        if (playBackState?.state) {
            console.log("currentTrack:", playBackState)
            switch (playBackState.state) {
                case State.Paused:
                case State.Buffering:
                case State.Ready:
                case State.None:
                    await TrackPlayer.play();
                    break;

                case State.Playing:
                    await TrackPlayer.pause();
                    break;

                default:
                    break;
            }
        }
    }

    const onPageScroll = async (event: any) => {
        // console.log("event", event);

        const { position } = event.nativeEvent;
        if (position !== songIndex) {
            setSongIndex(position);
        }
        updateMusic(data[position])
        // AsyncStorage.setItem('lastMusic', JSON.stringify(data[position]))
        await TrackPlayer.skip(position)
    }
    return (
        <View style={{ flex: 1, backgroundColor: Colors.backgroundGray, }}>
            <Header title="Now PLaying" iconLeft={require("./../../assets/img/backArrow.png")} onBackPress={() => navigation.navigate('Home')} rightIcon={require('./../../assets/img/more.png')} />
            <View style={{ height: Platform.OS === 'android' ? height - 200 : height - 300 }}>
                <PagerView
                    ref={ref}
                    initialPage={songIndex ?? 0}
                    orientation={"horizontal"}
                    style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                    onPageScroll={onPageScroll}
                >
                    {data.map((item: any, index: number) => {
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
                        TrackPlayer.pause();
                        TrackPlayer.seekTo(value)
                        TrackPlayer.play();

                    }}
                    onValueChange={value => {

                        if (value === duration) {
                            TrackPlayer.stop()
                        }
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
                        {songIndex === 0 ? <Image style={{ height: 30, width: 30, tintColor: 'gray' }} source={require('./../../assets/img/previous.png')} /> : <TouchableOpacity disabled={data.length < songIndex} onPress={() => {
                            skipToPrevious(data[songIndex - 1])
                        }}>
                            <Image style={{ height: 30, width: 30, tintColor: 'white' }} source={require('./../../assets/img/previous.png')} />
                        </TouchableOpacity>}
                        {playBackState.state === State.Loading || playBackState.state === State.Buffering ? <ActivityIndicator /> : <TouchableOpacity onPress={() => togglePlayback(data[songIndex])}>
                            <Image style={{ height: 30, width: 30, tintColor: 'white' }} source={playBackState.state === State.Playing ? require('./../../assets/img/pause.png') : require('./../../assets/img/playButton.png')} />
                        </TouchableOpacity>}
                        {data.length - 1 === songIndex ? <Image style={{ height: 30, width: 30, tintColor: 'gray' }} source={require('./../../assets/img/next.png')} /> : <TouchableOpacity
                            onPress={() => {
                                skipToNext(data[songIndex + 1])
                            }}>
                            <Image style={{ height: 30, width: 30, tintColor: 'white' }} source={require('./../../assets/img/next.png')} />
                        </TouchableOpacity>}
                    </View>
                    <TouchableOpacity>
                        <Image style={{ height: 25, width: 25, tintColor: 'white' }} source={require('./../../assets/img/repeat.png')} />
                    </TouchableOpacity>
                </View>

            </View >
        </View >
    )
}

export default MusicPlayingScreen