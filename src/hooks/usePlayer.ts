import { Event, State, usePlaybackState, useProgress, useTrackPlayerEvents } from "react-native-track-player";
import { pauseTrack, playTrack } from "../service/PlayerService";
import { useEffect } from "react";
import { useMusic } from "../service/MusicContextService";
import PagerView from "react-native-pager-view";

export const usePlayer = (ref?: any) => {
    const { updateMusic, track } = useMusic()
    const playBackState = usePlaybackState()
    const { position, duration } = useProgress()

    useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async (event) => {
        console.log("event change called!", event.index, event)
        if (
            event.type === Event.PlaybackActiveTrackChanged &&
            event.index != null && track
        ) {
            updateMusic(track[event.index], event.index)
            console.log("index event : ", event.index)
            ref && ref.current.setPage(event.index);
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
