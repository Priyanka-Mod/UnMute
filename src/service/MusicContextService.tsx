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

type MusicContextType = {
    music: { [key: string]: any } | null;
    setMusic: Dispatch<SetStateAction<{ [key: string]: any } | null>>;
    track: { [key: string]: any } | null;
    setTrack: Dispatch<SetStateAction<{ [key: string]: any } | null>>;
    updateMusic: any
    currentIndex?: number
    updateTrack: any
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

    useEffect(() => {
        (async () => {
            let isSetUp = await setupPlayer()
            if (isSetUp) {
                const index = await AsyncStorage.getItem('currentIndex')
                if (index && index !== null) {
                    console.log("currentIndex:======>", index);
                    setCurrentIndex(parseInt(index))
                    const track = await getTrackData();
                    await updateTrack(track.trackData, track.trackId, parseInt(index))
                    await skipTrackTo(parseInt(index))

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
            const [type, id] = currentTrack.split('-')
            let trackDetails
            if (type === "category") {
                trackDetails = MusicData.filter((music) => music.genreId === id)
            } else {
                trackDetails = MusicData.filter((music) => music.artistId === id)
            }

            return { trackData: trackDetails, trackId: currentTrack }
        }
    }

    const updateMusic = async (obj: any, index: number) => {
        await AsyncStorage.setItem("lastMusic", JSON.stringify(obj))
        setMusic(obj)
        setCurrentIndex(index)
        await AsyncStorage.setItem("currentIndex", JSON.stringify(index))
    }

    const updateTrack = async (trackData: albumList[], trackId: string, index: number) => {
        await AsyncStorage.setItem('currentTrack', trackId);
        await addTrack(trackData)
        setTrack(trackData)
        await skipTrackTo(index)
        setCurrentIndex(index)
    }

    return <MusicContext.Provider {...props} value={{ music, setMusic, track, setTrack, updateMusic, currentIndex, updateTrack }} />;
};

export { MusicProvider, useMusic };