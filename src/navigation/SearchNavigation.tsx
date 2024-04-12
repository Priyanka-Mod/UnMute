import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "../screens/app/HomeScreen"
import UserProfileScreen from "../screens/app/UserProfileScreen"
import PlaylistScreen from "../screens/app/PlaylistScreen"
import MusicPlayingScreen from "../screens/app/MusicPlayingScreen"
import SearchScreen from "../screens/app/SearchScreen"

const Stack = createNativeStackNavigator()


const SearchNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="Search" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Search" component={SearchScreen} />

            <Stack.Screen name="Playlist" component={PlaylistScreen} />
        </Stack.Navigator>
    )
}
export default SearchNavigation