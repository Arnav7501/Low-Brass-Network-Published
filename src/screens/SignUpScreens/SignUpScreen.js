import React, {useState} from 'react';
import {Button, View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, Alert} from 'react-native'
import CustomInput from '../../components/Keyboard/CustomInput';
import CustomButton from '../../components/CustomButton';

import SocialSignInButtons from '../../components/CustomButton/SocialSignInButtons/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';
import ConfirmEmailScreen from '../ConfirmEmailScreens/ConfirmEmailScreen';
import {useForm, Controller} from 'react-hook-form'
import { Auth } from 'aws-amplify';



const EMAIl_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
const SignUpScreen = () => {
    const navigation = useNavigation();
    const [debug, setdebug] = useState("")
    const {control, handleSubmit, watch,} = useForm();
    const pwd = watch('password')

    const onRegisterPressed = async data => {
        const {username, password, email, name} = data;
        try {
            await Auth.signUp({
                username,
                password,
                attributes: {email, name, preferred_username: username}, 
            });
        navigation.navigate('ConfirmEmail', {username});
        } catch(e) {
            setdebug(e.message)
            Alert.alert('Oops ',  e.message);
        }
        console.log("pressed")
        
    }
    const onSignUpPressed = () => {
        navigation.navigate('SignIn')
    }

    const onTermsOfUsePressed = () => {
        console.warn("On Forgot Password Pressed")
    }

    const onPrivacyPolicyPressed = () => {
        console.warn("On Forgot Password Pressed")
    }

    return (
        <ScrollView showsVerticalScrollIndicator = {false}>
    <View style = {styles.root}>
    <Text style = {styles.title}> Create an Account</Text>
    <Text>{debug}</Text>
    
  
    <CustomInput 
    name = "username"
    placeholder = "Username" 
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

    <CustomInput 
    placeholder="Email"
    rules={{
        required: 'Email is required',
        pattern: {value: EMAIl_REGEX, message: 'Email is invalid'}
    }}
    name = "email"
    control = {control}
    secureTextEntry = {false}
    />

    <CustomInput 
    name = "password"
    control = {control}
    placeholder="Password"
    secureTextEntry = {true}
    rules={{required: 'Username is required',
    minLength : {
        value: 5,
        message: 'Password should be atleast 5 characters long'
    },

}}
    />

<CustomInput 
    name = "password-repeat"
    control = {control}
    placeholder="Repeat Password"
    secureTextEntry = {true}
    rules = {{
        validate: value => 
        value === pwd ? true : 'Passwords do not match',
    }}
    />
    
   
    <CustomButton 
    text= "Register"
    onPress={handleSubmit(onRegisterPressed)}
    />

     
    <Text style = {styles.text}>By registering, you confirm that 
    you accept our 
    <Text style = {styles.link} onPress = {onTermsOfUsePressed}> Terms of Use </Text> and 
    <Text style = {styles.link} onPress = {onPrivacyPolicyPressed}> Privacy Policy </Text> </Text>
    
    {/*<SocialSignInButtons/>*/}

    <CustomButton 
    text= "Have an Account? Sign in"
    onPress={onSignUpPressed}
    type = "TERTIARY"
    />

    </View>
    </ScrollView>
    );
}

export default SignUpScreen

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