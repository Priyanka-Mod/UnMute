import TrackPlayer, { AppKilledPlaybackBehavior, Capability, Event, RepeatMode } from 'react-native-track-player'
import { MusicData } from '../mockData';
import { reset } from 'react-native-track-player/lib/src/trackPlayer';
import { albumList } from '../types';

export async function setupPlayer() {
    let isSetup = false;
    try {
        await TrackPlayer.getActiveTrackIndex();
        isSetup = true;
    }
    catch {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.add(MusicData)
        await TrackPlayer.updateOptions({
            android: {
                appKilledPlaybackBehavior:
                    AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
            },
            capabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
                Capability.SeekTo,
            ],
            compactCapabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
            ],
            progressUpdateEventInterval: 2,
        });

        isSetup = true;
    }
    finally {
        return isSetup;
    }

}

export async function addTrack(musicData: albumList[]) {
    try {
        await reset()
        await TrackPlayer.add(musicData)
    } catch (error) {
        console.log("Error-> ", error);
    }

    // await TrackPlayer.setRepeatMode(RepeatMode.Queue)
}

export async function playTrack() {
    await TrackPlayer.play()
}

export async function pauseTrack() {
    await TrackPlayer.pause()
}
export async function skipTrackTo(index: number) {
    await TrackPlayer.skip(index)
}
export async function seekTo(position: number) {
    await TrackPlayer.seekTo(position)
}
export async function skipToNext() {
    await TrackPlayer.skipToNext()
}
export async function skipToPrevious() {
    await TrackPlayer.skipToPrevious()
}
export async function playbackService() {
    TrackPlayer.addEventListener(Event.RemotePause, () => {
        TrackPlayer.pause()
    })
    TrackPlayer.addEventListener(Event.RemotePlay, () => {
        TrackPlayer.play()
    })
    TrackPlayer.addEventListener(Event.RemoteNext, () => {
        TrackPlayer.skipToNext()
    })
    TrackPlayer.addEventListener(Event.RemotePrevious, () => {
        TrackPlayer.skipToPrevious()
    })
}
