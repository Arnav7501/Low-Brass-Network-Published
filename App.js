import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import Navigator from "./src/navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Amplify, Auth, DataStore } from "aws-amplify";
import awsmobile from "./src/aws-exports";
import { withAuthenticator } from "aws-amplify-react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();
// import UserContextProvider from "./src/contexts/UserContext";

Amplify.configure({ ...awsmobile, Analytics: { disabled: true }, ssr: true });
// DataStore.clear();

function App() {
  const [authUser, setAuthUser] = useState(null);
  
  const automatic_signup = async() => {
    const boolean = await AsyncStorage.getItem('isauthenticated')
    console.log("test,",boolean)
    if (boolean == "true") {
       var username1 =  await AsyncStorage.getItem('@login')
       var password1 =  await AsyncStorage.getItem('@password')
       const response = await Auth.signIn(username1, password1)
       console.log(response)
    }
  }
 
  useEffect(() => {
    automatic_signup()


  }, []);

  

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar style="auto" />

      {/* <UserContextProvider> */}
      <Navigator />
      {/* </UserContextProvider> */}
    </SafeAreaProvider>
  );

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c9c9c9",
  },
});

export default App;
