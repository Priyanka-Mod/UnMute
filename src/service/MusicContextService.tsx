import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
    createContext,
    Dispatch,
    ReactElement,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useState
} from "react";
import { addTrack, setupPlayer, skipTrackTo } from "./PlayerService";
import { MusicData } from "../mockData";
import { albumList } from "../types";
import TrackPlayer from "react-native-track-player";
import { reset } from "react-native-track-player/lib/src/trackPlayer";

type MusicContextType = {
    music: { [key: string]: any } | null;
    setMusic: Dispatch<SetStateAction<{ [key: string]: any } | null>>;
    track: { [key: string]: any } | null;
    setTrack: Dispatch<SetStateAction<{ [key: string]: any } | null>>;
    updateMusic: (obj: albumList, index: number) => Promise<void>
    currentIndex?: number
    updateTrack: (trackData: albumList[], trackId: string, index: number) => Promise<void>
    isAdded: boolean
    setIsAdded: Dispatch<SetStateAction<boolean>>;
};

const MusicContext = createContext<MusicContextType | undefined>(undefined);

function useMusic(): MusicContextType {
    const context = useContext(MusicContext);
    if (!context) {
        throw new Error("useMusic must be used within an MusicProvider");
    }
    return context;
}

const MusicProvider = (props: { children: ReactNode }): ReactElement => {
    const [music, setMusic] = useState<{ [key: string]: any } | null>(null);
    const [track, setTrack] = useState<{ [key: string]: any } | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number | undefined>();
    const [isAdded, setIsAdded] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            let isSetUp = await setupPlayer()
            if (isSetUp) {
                const index = await AsyncStorage.getItem('currentIndex')
                if (index && index !== null) {
                    const track = await getTrackData();
                    await updateTrack(track.trackData, track.trackId, parseInt(index))
                    setCurrentIndex(parseInt(index))
                }

                const obj = await AsyncStorage.getItem('lastMusic')
                if (obj) {
                    setMusic(JSON.parse(obj))
                }

            }
        })()
    }, [])

    const getTrackData = async () => {
        const currentTrack = await AsyncStorage.getItem('currentTrack')
        if (!currentTrack || currentTrack === null || currentTrack === 'All') {
            return { trackData: MusicData, trackId: 'All' }
        } else if (currentTrack === 'newTrack') {
            return { trackData: MusicData.slice(0, 10), trackId: "newTrack" }
        }
        else {
            const [typeOfMusic, id] = currentTrack.split('-')
            let trackDetails
            if (typeOfMusic === "category") {
                trackDetails = MusicData.filter((music) => music.genreId === id)
            } else {
                trackDetails = MusicData.filter((music) => music.artistId === id)
            }

            return { trackData: trackDetails, trackId: currentTrack }
        }
    }

    const updateMusic = async (obj: albumList, index: number) => {
        await AsyncStorage.setItem("lastMusic", JSON.stringify(obj))
        setMusic(obj)
        setCurrentIndex(index)
        await AsyncStorage.setItem("currentIndex", JSON.stringify(index))
    }

    const updateTrack = async (trackData: albumList[], trackId: string, index: number) => {
        const previousTrack = await AsyncStorage.getItem('currentTrack')
        if (previousTrack === trackId) {
            setTrack(trackData)
            // alert(index)
            setIsAdded(true)
            await skipTrackTo(index)
            setCurrentIndex(index)
        } else {
            setTrack(trackData)
            await AsyncStorage.setItem('currentTrack', trackId);

            setIsAdded(false)
            await addTrack(trackData)
            await skipTrackTo(index)
            setCurrentIndex(index)
            setTimeout(() => {
                setIsAdded(true)
            }, 3000);

            // setIsAdded(false)
            // reset()
            // await TrackPlayer.add(trackData).then(async () => {
            //     await skipTrackTo(index).then(() => {
            //         setCurrentIndex(index)
            //         setTimeout(() => {
            //             setIsAdded(true)
            //         }, 3000);
            //     })
            // })
        }
    }

    return <MusicContext.Provider {...props} value={{ music, setMusic, track, setTrack, updateMusic, currentIndex, updateTrack, isAdded, setIsAdded }} />;
};

export { MusicProvider, useMusic };