import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, Alert} from 'react-native'
import CustomInput from '../../components/Keyboard/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/CustomButton/SocialSignInButtons/SocialSignInButtons';
import { useNavigation} from '@react-navigation/native'
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';
const ForgotPasswordScreen = () => {
    const {control, handleSubmit} = useForm()
    const navigation = useNavigation()



    const onSendPressed = async(data) => {
        try {
            await Auth.forgotPassword(data.username)
            Alert.alert("Success, the code was resent to your email")
            navigation.navigate('NewPassword')
        } catch (e) {
            Alert.alert(e.message)
        }
       
    }

    const onSignInPressed = () => {
        navigation.navigate('SignIn')
    }

    const onResendPressed = () => {
        console.warn("On Forgot Password Pressed")
    }


    return (
        <ScrollView showsVerticalScrollIndicator = {false}>
    <View style = {styles.root}>
    <Text style = {styles.title}> Reset your Password </Text>
    
    <CustomInput 
    name = "username"
    placeholder = "Username" 
    control = {control}
    secureTextEntry = {false}
    rules = {{
        required: 'Username is Required'
    }}
    />

   
    <CustomButton 
    text= "Send"
    onPress={handleSubmit(onSendPressed)}
    />

 <CustomButton 
    text= "Back to Sign In"
    onPress={onSignInPressed}
    type = "TERTIARY"
    />

    </View>
    </ScrollView>
    );
}

export default ForgotPasswordScreen

const styles =  StyleSheet.create ({
signintext: {
    fontSize: 30,
    marginBottom: 20,
    color: '#00008B',
}
,
root: {
    alignItems: 'center',  
    padding: 20,
    

},
text:{
    color: 'gray',
    marginVertical: 10,
},

link: {
    color: '#FDB075'
},

title : {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
   
}

})