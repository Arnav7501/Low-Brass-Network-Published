import React, { Component, useState, useEffect } from 'react';
import {ImageBackground, StatusBar, StyleSheet, Linking, Text, View, SafeAreaView, Image,ScrollView, Button, TouchableOpacity,useWindowDimensions} from 'react-native';
import {colors} from "./src/constants";

import { useNavigation} from '@react-navigation/native'
import { Auth } from 'aws-amplify';
import Logo from './assets1/images1/lbnhomepagelogo.webp'
import Logo2 from './assets1/images1/lbnimage.webp'
import Logo3 from './assets1/images1/lbnimage1.webp'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";



const HomeScreen = ({}) => {
  const {height} = useWindowDimensions(); 
  const {width} = useWindowDimensions(); 
  const navigation = useNavigation()
  const signOut = async() => {
    await AsyncStorage.setItem('isauthenticated', "false")
    Auth.signOut()

  }
  useEffect(() => {
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('isauthenticated', "true")
    } catch (e) {
      // saving error
    }
  }

  storeData()
}, []);
  //        <ImageBackground source={require('./Trombone/trombone.webp')} resizeMode="cover" style={styles.bgimage}>
    return (
       <SafeAreaView>
    <ScrollView contentContainerStyle={{ paddingBottom: height * 1.2 }}

>
      <View style = {{height: height/7,flex: 0,backgroundColor: '#d4a44c'}}>
        <Text style = {{ top:'20%', fontSize: RFPercentage(5), alignSelf: 'center', textAlign: 'center', color: '#000000', fontWeight: 'bold'}}>
          Low Brass Network </Text>
          </View>
          <Image source ={Logo}
        style = {[styles.logo, {height: height * 0.25}]}
        resizeMode = "contain" >
        </Image>
          

        <Text style = {{textAlign: 'center', fontSize: 20, margin: '5%'}}>Many aspiring low brass musicians are forced to buy expensive instruments, cannot afford lessons, and face few opportunities to master their instruments.
 </Text>
 <Text style = {{textAlign: 'center', fontSize: 20,  fontWeight: 'bold'}}>
We're here to change that {'\n'}
Our Goal:

 </Text>
 <Text style = {{textAlign: 'center', fontSize: 20, margin: '5%'}}>Build a community of low brass players to provide free music lessons to push students to their full potential, run low brass ensembles where low brass students interact and perform, provide affordable instruments, and promote the playing of low brass instruments around the world.
 
 </Text>
 <Image source ={Logo2}
        style = {styles.logo2}
        resizeMode = "contain" >
        </Image>
        <Image source ={Logo3}
        style = {styles.logo2}
        resizeMode = "contain" >
        </Image>
        <Text style = {{textAlign: 'center', fontSize: 20, margin: '5%'}}> To volunteer 
        or sign up for lessons, head over to our "Find a Tutor" page. Alternatively, enjoy other music-related 
        features brought to you by LBN
         </Text>
        <Text
        onPress={signOut}
          style = {{
            width: '100%',
            textAlign: 'center',
            color: 'red',
            marginVertical: 20,
            fontSize: 20
          }}>
            Sign Out
        
        </Text>
       
          

        </ScrollView>
        </SafeAreaView>
       );
}

const styles = StyleSheet.create({
  buttonStyle: {
    top:'5%',
    alignSelf: 'stretch',
    backgroundColor: '#A6E4FF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5,
    marginTop: '10%'
},

  bgimage: {
    flex:1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
    container: {
      flex: 1,
      backgroundColor:'#FFFFFF' ,
      alignItems: 'center',
    },
  
    logo:{
      top: '0%',
      alignSelf: 'center',
      marginBottom: '0%',
      width: '150%',
      maxHeight: 200,
      alignItems:'center'
  },
  logo2:{
    alignSelf: 'center',
    width: '100%',
    height: '35%',
    alignItems:'center',
    backgroundColor: '#d4a44c'
},
    title: {
  
      color:colors.black,
      fontSize: 32,
      fontWeight: "bold",
      letterSpacing: 3,
      
    },
  
    image: {
      width:50,
      height:50,
      right:-160,
      top:5
    },
  
    map: {
      alignSelf: 'stretch',
      height:100,
      marginVertical: 20
  
      
    },
  
    row: {
      alignSelf: "stretch",
      flexDirection: "row",
      justifyContent: "center"
    },
  
    
  
    celltext: {
      color:colors.black,
      fontWeight: "bold",
      fontSize: 28
  
    },
  
    homelogo: {
      height:50,
      width: 50,
      top:50,
      alignContent: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
  
    },
  

    socialmediabutton: {
      top:-25,
      left:100,
      borderWidth:1,
         width:150,
         height:50,
         backgroundColor:'#fff',
         alignSelf: 'center',
         borderRadius: 50
    },
    socialmediabutton2: {
      top:0,
      left:-100,
      borderWidth:1,
         width:150,
         height:50,
         backgroundColor:'#fff',
         alignSelf: 'center',
         borderRadius: 50
    }
  });
 

export default HomeScreen;