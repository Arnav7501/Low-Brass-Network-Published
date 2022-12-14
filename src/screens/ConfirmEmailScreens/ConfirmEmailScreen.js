import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, Alert} from 'react-native'
import CustomInput from '../../components/Keyboard/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/CustomButton/SocialSignInButtons/SocialSignInButtons';
import { useNavigation, useRoute} from '@react-navigation/native'
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';
const ConfirmEmailScreen = () => {
   const route = useRoute();
   const navigation = useNavigation()
   const [debug, setDebug] = useState("normal")
   const {control, handleSubmit, watch} = useForm({
    defaultValues: {username: route?.params?.username},
})
const username = watch('username')

    useEffect(() => {
    // This effect will run whenever the count state changes
    Alert.alert("Code was sent to your email", "If you don't see it, check your spam")
  }, []);
    const onConfirmPressed = async(data) => {
        try {
            const response = await Auth.confirmSignUp(data.username, data.code)
            setDebug(response)
            navigation.navigate('SignIn')
        } catch (e) {
            setDebug(response)
            console.warn(data)
        }
        
        
    }

    const onSignInPressed = () => {
        navigation.navigate('SignUp')
    }

    const onResendPressed = async() => {
        try {
            await Auth.resendSignUp(username)
            Alert.alert("Success, the code was resent to your email")
        } catch (e) {
            Alert.alert(e.message)
        }
    }

    return (
       
    <ScrollView showsVerticalScrollIndicator = {false}>
    <View style = {styles.root}>
    <Text style = {styles.title}> Confirm your email </Text>

    
    {/*<CustomInput 
    name = "username"
    control = {control}
    placeholder = "Enter your username" 
    secureTextEntry = {false}
    rules = {{
        required: 'Username is Required'
    }}
/>*/}

    <CustomInput 
    name = "code"
    control = {control}
    placeholder = "Enter your Confirmation Code" 
    secureTextEntry = {false}
    rules = {{
        required: 'Confirmation code is Required'
    }}
    />
    
   
    
     
    <CustomButton 
    text= "Confirm"
    onPress={handleSubmit(onConfirmPressed)}
    />

   
<CustomButton 
    text= "Resend Code"
    onPress={onResendPressed}
    type = "SECONDARY"
    />

 <CustomButton 
    text= "Back to Create Account"
    onPress={onSignInPressed}
    type = "TERTIARY"
    />

    </View>
    </ScrollView>
    );
}

export default ConfirmEmailScreen;

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