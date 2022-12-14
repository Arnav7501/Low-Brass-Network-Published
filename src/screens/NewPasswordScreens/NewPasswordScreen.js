import React, {useState} from 'react';
import {Alert, View, Text, Image, StyleSheet, useWindowDimensions, ScrollView} from 'react-native'
import CustomInput from '../../components/Keyboard/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/CustomButton/SocialSignInButtons/SocialSignInButtons';
import { useNavigation} from '@react-navigation/native'
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';
const NewPasswordScreen = () => {
    const navigation = useNavigation()
    const {control, handleSubmit} = useForm()


    const onSubmitPressed = async(data) => {
        try {
            await Auth.forgotPasswordSubmit(data.username, data.code, data.password)
            Alert.alert("Success, the code was resent to your email")
            navigation.navigate('SignIn')
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
    placeholder = "username" 
    control = {control}
    rules = {{
        required: ' Username is Required'
    }}
    secureTextEntry = {false}
    />
    <CustomInput 
    name = "code"
    placeholder = "code" 
    control = {control}
    rules = {{
        required: ' Code is Required'
    }}
    secureTextEntry = {false}
    />

     <CustomInput 
    name = "password"
    placeholder = "Enter your new password" 
    control = {control}
    rules={{required: 'Username is required',
    minLength : {
        value: 4,
        message: 'Username should be atleast 4 characters long'
    },

    maxLength : {
        value: 20,
        message: 'Username should be maximum 20 characters long'
    },
}}
    secureTextEntry = {false}
    />

   
    <CustomButton 
    text= "Submit"
    onPress={handleSubmit(onSubmitPressed)}
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

export default NewPasswordScreen

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