import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button } from "react-native";
import Game from "./src/components/Game";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,

} from "react-native";
import { colors,  } from "./src/constants";




export default function WordleScreen() {
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Music Wordle</Text>
      <StatusBar hidden />
         
         <Game />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: "center",
  },
  title: {
    color: colors.lightgrey,
    fontSize: 40,
    fontWeight: "bold",
    letterSpacing: 7,
  },

  
});