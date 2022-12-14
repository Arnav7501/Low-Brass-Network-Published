import React from "react";
import { Text, TouchableOpacity,   } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Button2 = ({onPress, children}) => {
    const styles = {
        buttonStyle: {
            flex: 1,
            alignSelf: 'stretch',
            backgroundColor: '#fff',
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#007aff',
            marginLeft: 5,
            marginRight: 5
        },

        textStyle: {
            alignSelf: 'center'
        }
    }
    const {buttonStyle, textStyle} = styles
    return (
     <TouchableOpacity onPress={onPress} style = {buttonStyle}  >
        <Text style = {textStyle}>
            {children}
        </Text>
     </TouchableOpacity>
    )

}

export default Button2