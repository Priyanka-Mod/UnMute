import { Event, State, usePlaybackState, useProgress, useTrackPlayerEvents } from "react-native-track-player";
import { pauseTrack, playTrack } from "../service/PlayerService";
import { useEffect } from "react";
import { useMusic } from "../service/MusicContextService";

export const usePlayer = (ref?: any) => {
    const { updateMusic, track, isAdded } = useMusic()
    const playBackState = usePlaybackState()
    const { position, duration } = useProgress()

    useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async (event) => {
        if (
            event.type === Event.PlaybackActiveTrackChanged &&
            typeof event.index === 'number' && track
        ) {
            updateMusic(track[event.index], event.index)
            if (ref) {
                ref && ref.current.setPage(event.index)
                await playTrack()
            }
        }
    })

    const togglePlayback = async () => {
        if (playBackState?.state) {
            switch (playBackState.state) {
                case State.Paused:
                case State.Buffering:
                case State.Ready:
                case State.None:
                    await playTrack();
                    break;

                case State.Playing:
                    await pauseTrack();
                    break;

                default:
                    break;
            }
        }
    }


    useEffect(() => {

    }, []);

    return { togglePlayback, playBackState, position, duration, State }
};
