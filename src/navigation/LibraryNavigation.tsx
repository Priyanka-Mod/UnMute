import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "../screens/app/HomeScreen"
import UserProfileScreen from "../screens/app/UserProfileScreen"
import PlaylistScreen from "../screens/app/PlaylistScreen"
import MusicPlayingScreen from "../screens/app/MusicPlayingScreen"
import SearchScreen from "../screens/app/SearchScreen"
import LibraryScreen from "../screens/app/LibraryScreen"

const Stack = createNativeStackNavigator()


const LibraryNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="Library" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Library" component={LibraryScreen} />

            <Stack.Screen name="Playlist" component={PlaylistScreen} />
        </Stack.Navigator>
    )
}
export default LibraryNavigation