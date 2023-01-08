import { NavigationContainer } from "@react-navigation/native";
import FeedScreen from "../screens/FeedScreen";
import FeedScreen2 from "../screens/FeedScreen2";
import CreatePostScreen from "../screens/CreatePostScreen";
import CreatePostScreen2 from "../screens/CreatePostScreen2";
import UpdateProfileScreen from "../screens/UpdateProfileScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";


import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator } from 'react-native';

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesome } from "@expo/vector-icons";



import SignInScreen from '../screens/SignInScreens/SignInScreen'
import SignUpScreen from '../screens/SignUpScreens/SignUpScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreens';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreens/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreens/NewPasswordScreen';
import HomeScreen from '../../HomeScreen';
import SightRead from '../../sightread';
import WordleScreen from '../../WordleScreen';
import { Auth, Hub} from 'aws-amplify';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Navigator = () => {
  const [user, setUser] = useState(undefined)

    const checkuser = async() => {
      try { 
      const authuser = await Auth.currentAuthenticatedUser({bypassCache :true})
      setUser(authuser)
    } catch (e) {
      console.log(e)
      setUser(null)
      }
     
    }
  useEffect(() => {
    checkuser();
  }, [])

  useEffect(() => {
    const listener = (data) => {
      if (data.payload.event === 'signIn' || data.payload.event === 'signOut') {
        checkuser()
      }
    }

    Hub.listen('auth', listener)
    return () => Hub.remove('auth', listener)
  }, [])



  if (user === undefined) {
    return (
      <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    )
  }

  function MyTabs() {
    return (
      <Stack.Navigator>
          <Stack.Screen options={{headerShown: false}}
          name = "Home" 
          component={HomeScreen} 
          />
            <Stack.Screen options={() => ({
             headerStyle: { height: 10 },
             headerShown: false
               })}
            name = "WordleScreen" 
            component={WordleScreen} 
            />
          <Stack.Screen options={{headerShown: false}} name = "SightRead" component={SightRead} />
          <Stack.Screen name="Find a Tutor/ Sign up" component={FeedScreen2} />
          <Stack.Screen name="Create Post"  component={CreatePostScreen} />
          <Stack.Screen name="Sign up to be a Tutor" options = {{ headerBackTitle:"Back"}} component={CreatePostScreen2} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name = "Update Profile" component={UpdateProfileScreen} />
          <Stack.Screen name="Feed" component={FeedScreen}
           options={({ navigation }) => ({
            headerRight: () => (
              <FontAwesome
                onPress={() => navigation.navigate("Profile")}
                name="user"
                size={24}
                color="gray"
              />
            ),
          })}
    
        />
    </Stack.Navigator>
    )
  }

  function TutorScreen() {
    return (
    <Stack.Navigator>
    <Stack.Screen name="Find a Tutor/ Sign up" component={FeedScreen2} options={{headerShown: false}}/>
    <Stack.Screen name="Sign up to be a Tutor" options = {{ headerBackTitle:"Back"}} component={CreatePostScreen2} />
    </Stack.Navigator>)
  }

  function SocialMedia() {
    return (
    <Stack.Navigator options = {{headerShown: false}}>
       <Stack.Screen name="Feed" component={FeedScreen}
           options={({ navigation }) => ({
            headerRight: () => (
              <FontAwesome
                onPress={() => navigation.navigate("Profile")}
                name="user"
                size={24}
                color="gray"
              />
            ), headerShown: false
          })}
        />
        <Stack.Screen name="Create Post"  component={CreatePostScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name = "Update Profile" component={UpdateProfileScreen} />
    </Stack.Navigator>
  )}


  return (
    <NavigationContainer> 
      {user ? (
          <Tab.Navigator>
          <>
          <Tab.Screen name="Find a Tutor / Volunteer" component={TutorScreen}   
          options={{ headerShown: false,
           tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="person"
                size={24}
                color={tabInfo.focused ? "#006600" : "#8e8e93"}
              />
            );
          },
          
          }}/>
          <Tab.Screen name="Wordle" component={WordleScreen}   
          options={{ headerShown: false,
           tabBarIcon: (tabInfo) => {
            return (
              <FontAwesome
                name="wordpress"
                size={24}
                color={tabInfo.focused ? "#006600" : "#8e8e93"}
              />
            );
          },
          
          }}/> 
          <Tab.Screen name="home" component={MyTabs} alignItems = "center"  
          options={{ headerShown: false, 
           tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="md-home"
                size={24}
                color={tabInfo.focused ? "#006600" : "#8e8e93"}
              />
            );
          },
          
          }}/> 
        <Tab.Screen name="Sight Read" component={SightRead}   
          options={{ headerShown: false,
           tabBarIcon: (tabInfo) => {
            return (
              <FontAwesome
                name="music"
                size={24}
                color={tabInfo.focused ? "#006600" : "#8e8e93"}
              />
            );
          },
          
          }}/>
           <Tab.Screen name="LBN Media" component={SocialMedia}   
          options={{ headerShown: false,
           tabBarIcon: (tabInfo) => {
            return (
              <Entypo
                name="news"
                size={24}
                color={tabInfo.focused ? "#006600" : "#8e8e93"}
              />
            );
          },         
          }}/>
        </>
         </Tab.Navigator>    
        ) : (
          <Stack.Navigator screenOptions={{headerShown: false}}>
          <>
          <Stack.Screen 
        name = "SignIn" 
        component={SignInScreen} 
        />
        <Stack.Screen 
        name = "SignUp" 
        component={SignUpScreen} 
        />
        <Stack.Screen 
        name = "ConfirmEmail" 
        component={ConfirmEmailScreen} 
        />
        <Stack.Screen 
        name = "ForgotPassword" 
        component={ForgotPasswordScreen} 
        />
        <Stack.Screen 
        name = "NewPassword" 
        component={NewPasswordScreen} 
        />
          
        </>
        </Stack.Navigator>
        )}
   
        
      
    </NavigationContainer>
  );
};

export default Navigator;
