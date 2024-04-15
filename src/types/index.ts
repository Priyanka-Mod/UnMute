import { NavigationAction } from "@react-navigation/native";

export interface albumList {
    artWork: string,
    artist: string,
    artistId: string,
    genre: string,
    genreId: string,
    id: string,
    title: string,
    url: string
}

export interface NavigationPropType {
    navigation: {
        navigate: (route: string, params?: object) => void;
        goBack: () => void;
        dispatch: (action: NavigationAction) => void;

    };
    route: {
        params?: string;
    };
}