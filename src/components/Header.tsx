import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Platform, Alert, Image, ImageSourcePropType } from 'react-native';
import { Colors } from '../utils';

type HeaderProps = {
    backgrndTransparent?: boolean
    iconLeft?: ImageSourcePropType;
    onBackPress?: () => void
    onPressRightIcon?: () => void
    title?: string;
    rightIcon?: ImageSourcePropType
};

export const Header = (props: HeaderProps) => {

    return (
        <>
            <View style={{ flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center', height: 46, backgroundColor: props.backgrndTransparent ? 'transparent' : Colors.backgroundGray, justifyContent: 'center' }}>
                <TouchableOpacity disabled={!Boolean(props.iconLeft)} onPress={props.onBackPress}
                    style={{ alignItems: 'center', }}>
                    <Image style={{ tintColor: 'white', width: 25, height: 25 }} source={props.iconLeft} />
                </TouchableOpacity>
                <Text style={{ flex: 1, textAlign: 'center', color: 'white', fontSize: 20, fontWeight: '800' }}>{props.title}</Text>

                <TouchableOpacity disabled={!Boolean(props.rightIcon)} onPress={props.onPressRightIcon}
                    style={{ alignItems: 'center' }}>
                    <Image style={{ tintColor: 'white', width: 25, height: 25 }} source={props.rightIcon} />

                </TouchableOpacity>
            </View>
        </>
    )
};