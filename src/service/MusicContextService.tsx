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
    music: albumList | null;
    setMusic: Dispatch<SetStateAction<albumList | null>>;
    track: albumList[] | null;
    setTrack: Dispatch<SetStateAction<albumList[] | null>>;
    updateMusic: (obj: albumList, index: number) => Promise<void>
    currentIndex?: number
    updateTrack: (trackData: albumList[], trackId: string, index: number) => Promise<void>
    isAdded: boolean
    setIsAdded: Dispatch<SetStateAction<boolean>>;
    currentTrackId?: string
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
    const [music, setMusic] = useState<albumList | null>(null);
    const [track, setTrack] = useState<albumList[] | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number | undefined>();
    const [isAdded, setIsAdded] = useState<boolean>(false);
    const [currentTrackId, setCurrentTrackId] = useState<string | undefined>(undefined);

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
        setIsAdded(false)
        const previousTrack = currentTrackId;
        setTrack(trackData)
        if (previousTrack === trackId) {
            setCurrentIndex(index)
            await skipTrackTo(index)
        } else {
            setCurrentTrackId(trackId)
            await AsyncStorage.setItem('currentTrack', trackId);
            await addTrack(trackData)
            await skipTrackTo(index)
            setCurrentIndex(index)
        }
        setIsAdded(true)
    }

    return <MusicContext.Provider {...props} value={{ music, setMusic, track, setTrack, updateMusic, currentIndex, updateTrack, isAdded, setIsAdded, currentTrackId }} />;
};

export { MusicProvider, useMusic };