import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "../screens/app/HomeScreen"
import UserProfileScreen from "../screens/app/UserProfileScreen"
import PlaylistScreen from "../screens/app/PlaylistScreen"
import MusicPlayingScreen from "../screens/app/MusicPlayingScreen"


type NavType = {
    Home: undefined,
    UserProfile: undefined,
    Playlist: {
        url?: string
        title?: string
        genreId?: string
        artistId?: string
    },
    Playing: undefined
}
const Stack = createNativeStackNavigator<NavType>()


const HomeNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="UserProfile" component={UserProfileScreen} />
            <Stack.Screen name="Playlist" component={PlaylistScreen} />
            <Stack.Screen name="Playing" component={MusicPlayingScreen} />

        </Stack.Navigator>
    )
}
export default HomeNavigation