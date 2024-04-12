import React from "react";
import { StyleProp, Text, TouchableOpacity, ViewProps } from "react-native";
import { Colors } from "../utils";

type ButtonPropType = {
    title: string
    onPressButton: () => void
    style?: StyleProp<ViewProps>
}
export const PrimaryButton = ({ title, onPressButton, style }: ButtonPropType) => {
    return (
        <TouchableOpacity style={[{ justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.primaryPurple, borderRadius: 100, height: 46 }, style]} onPress={onPressButton}>
            <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 20 }}>{title}</Text>
        </TouchableOpacity>
    )
}