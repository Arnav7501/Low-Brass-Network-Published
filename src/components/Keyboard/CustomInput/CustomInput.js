import React from "react";
import {View, Text, TextInput, StyleSheet} from 'react-native'
import {Controller} from 'react-hook-form'


const CustomInput = ({control, name, placeholder, secureTextEntry, rules = {}}) => {
    return (
        
        <Controller
        control={control}
        name={name}
        rules= {rules}
        render={({field: {value, onChange, onBlur}, fieldState: {error}})=> (
        <>
        <View style={[styles.container, {borderColor: error ? 'red' :'#e8e8e8' }]}>
        <TextInput
        autoCapitalize='none' 
        placeholder={placeholder}
        value = {value}
        onChangeText={onChange}
        onBlur = {onBlur}
        style = {styles.input}
        secureTextEntry = {secureTextEntry}
        >
        </TextInput>
        </View>
        {error && ( 
        <Text style = {{color: 'red', alignSelf: 'stretch'}}>
            {error.message || 'Error'} </Text>
        )}
        </>
    )}
   />
   
    );
};
const styles = StyleSheet.create({  
    container: {
       backgroundColor: 'white',
       width: '100%',
       borderColor: '#e8e8e8',
       borderWidth: 1,
       paddingHorizontal:10,
       paddingVertical: 15,
       borderRadius: 10,
       marginVertical: 10,

    }, 
    input: {}
})
export default CustomInput;