import React, {useState} from 'react';
import {Alert, TextInput, View, Text, Image, StyleSheet, useWindowDimensions, ScrollView} from 'react-native'
import Logo from '../../../assets1/images1/LBNlogo.png'
import CustomInput from '../../components/Keyboard/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/CustomButton/SocialSignInButtons/SocialSignInButtons';
import { useNavigation} from '@react-navigation/native'
import {useForm, Controller} from 'react-hook-form'
import { Auth } from 'aws-amplify';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = () => {
    const [counter, setCounter] = useState("")
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation();
    const {height} = useWindowDimensions(); 
    const {control, handleSubmit,} = useForm();

    const onSignInPressed = async (data) => {
        if (loading) {
            return
        }

        setLoading(true)
        try {
        const response = await Auth.signIn(data.username, data.password)
        await AsyncStorage.setItem('isauthenticated', "true")
        await AsyncStorage.setItem('@login', data.username)
        await AsyncStorage.setItem('@password', data.password)
        //navigation.navigate('Home')
      
        } catch (e) {
 

            Alert.alert('There was a problem', e.message)
        }
        setLoading(false)

    }

    const onForgotPasswordPressed = () => {
        navigation.navigate('ForgotPassword')
    }

    const onSignUpPressed = () => {
        navigation.navigate('SignUp')
    }
  
    return (
        <ScrollView showsVerticalScrollIndicator = {false}>

    <Text>{counter} </Text>  
    <View style = {styles.root}>
        <Image source ={Logo}
        style = {[styles.logo, {height: height * 0.15}]}
        resizeMode = "contain" >
        </Image>
        <Text style = {styles.signintext}> Low Brass Network</Text>

    <CustomInput 
    name="username"
    placeholder = "Username" 
    control={control}
    rules = {{required: 'Username is required'}}
    secureTextEntry = {false}
    /> 

    <CustomInput 
    name="password"
    placeholder="Password"
    secureTextEntry
    control={control}
    rules = {{required: 'Password is required', 
        minLength: {
        value: 4, 
        message: 'Password should be atleast 4 characters long'},
    }}
    /> 
      


    <CustomButton 
    text= {loading ? "Loading....." : "Sign in"}
    onPress={handleSubmit(onSignInPressed)}
    />

    <CustomButton 
    text = "Forgot Password?"
    onPress={onForgotPasswordPressed}
    type = "TERTIARY"
    />
    
 <CustomButton 
    text= "Don't have an account? Create one"
    onPress={onSignUpPressed}
    type = "TERTIARY"
    />

    </View>
    </ScrollView>
    );
}

export default SignInScreen

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
logo:{
    marginBottom: 20,
    width: '70%',
    maxWidth: 300,
    maxHeight: 200
}
})