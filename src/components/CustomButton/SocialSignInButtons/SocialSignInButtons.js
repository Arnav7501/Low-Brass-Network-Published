import React from "react";
import {View, Text} from 'react-native'
import CustomButton from "../CustomButton";



const SocialSignInButtons = () => {

    const onSignIngoogle = () => {
        console.warn("On Forgot Password Pressed")
    }
    const onSignInFacebook = () => {
        console.warn("On Forgot Password Pressed")
    }
    const onSignInApple = () => {
        console.warn("On Forgot Password Pressed")
    }
    return (
        <>
        <CustomButton 
        text= "Sign in with Facebook"
        onPress={onSignInFacebook}
        bgColor = "#E7EAF4"
        fgColor= "#4765A9"
        />

        <CustomButton 
        text= "Sign in with Google"
        onPress={onSignIngoogle}
        bgColor = "#FAE9EA"
        fgColor= "#DD4D44"
        />

        <CustomButton 
        text= "Sign in with Apple"
        onPress={onSignInApple}
        bgColor = "#e3e3e3"
        fgColor= "#363636"
        />
        </>
    )
}

export default SocialSignInButtons