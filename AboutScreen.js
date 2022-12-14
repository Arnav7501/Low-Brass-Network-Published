
import React, { Component, useState, useEffect } from 'react';
import {StatusBar, StyleSheet, Text, View, SafeAreaView, Image,ScrollView,
     Button, Alert} from 'react-native';
import {colors} from "./src/constants";
import Keyboard from "./src/components/Keyboard";


import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; // importing components



const Funcwordlescreen = () => {
      
    const NUMBER_OF_TRIES = 6;
      
    const copyArray = (array) => {
        return [...array.map((rows) => [...rows])]
      }

    const GetDayOfTheYear = () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = now - start;
        const oneDay = 1000 * 60 * 60 * 24;
        const day = Math.floor(diff / oneDay);
        return day
    }
    const DayOfTheYear = GetDayOfTheYear()
    const word_array = ["QUICK", "PIPES", "BELLS", "DRUMS", "FLATS", 
        "BRASS", "TUBAS", 
        "FLUTE", "VIOLA", "STOPS", "BONES", "BARIS", "ALTOS", "SAXES", 
        "SIGHT", "READS", 
        "BEATS", "AGOGE", "ALAAP", "ALAPA", 
        "ASSAI", "BASSO", "BATON", "BRACE", 
        "BREVE", "BUFFO", "BURLA", "CANON", "CAROL", "CATCH", 
        "CHANT", "CHOIR", "MUSIC", 
        "CHORD", "CROON", "DANCE", "DIRGE", "DOLCE", 
        "DRONE", "ETUDE", "FORTE", "FUGUE", 
        "FUOCO", "GAMUT", "GRAVE", "GUSTO", 
        "LARGE", "LARGO", "LENTO", "LYRIC", 
        "MAJOR", "MARCH", "BANDS", 
        "METRE", "MEZZO", "TUNER", "TUNES", "MINIM", "MINOR", 
        "MOLTO", "MOSSO", "MOTET", 
        "MOTIF", "NEUME", "NONET", "DUETS", "OCTET", "OPERA",
        "OSSIA","PAUSE","PEDAL","PITCH","PLENO","PLICA","PRESA",
        "PRIMO","QUINT","RONDO",
        "ROUND","SCALE","SCORE","SEGNO","SEGUE","SGAKE",
        " SHARP","SIXTH","SLIDE","SOLFA"," STAFF","STAVE","STRUM",
        "SUITE",
        "SWELL","TABLE","TACET","TEMPO","TENOR","THEME","THIRD",
        "TONIC","TOUCH"," TRIAD"," TRILL","  TROPE"," TUTTI",
        " UPBOW"," VALSE","VALVE","VOICE","VOLTA",
        "YODEL", "CLEFS", 
        "HYMNS", "MODES", "MOODS", 
        "MUTES", "REEDS", "ROLLS", "RESTS", "ROOTS", "SLURS", 
        "SOLOS", "SOLIS", "SONGS", "TRIOS", "TUNES", 
        "TURNS", "TONES", "TIMES", "CELLO", 
        "SNARE", "XYLOS", "OBOES", "HARPS", "HORNS", 
        "BANJO", "LYRES", "STAND", "ORGAN", 
        "SITAR", "VEENA", "SYNTH", "HALLS", 
        "WINDS", "STRING", "SMASH", "TABLA", "HIHAT", 
        "HANGS", "CONGA", "CHIME", 
        "AULOS", "CLAVE", "CROWD", "COBZA", "BUGLE", "BONGO", 
        "DAIKO", "CRWTH", "DOBRO", 
        "GAITA", "GUSLA", "GUSLE", "QUENA","REBEC", "ZANZE", 
        "TABOR", "SAROD", "GONGS", 
        "MOUTH", "PIECE", "SCREW", "SINGS", "GRAND", "CAPOS", 
        "SECCO", "SENZO", "SUPER", "ELEGY", "GIGUE", "ONDES", "BLUES", 
        " WALTZ", "BOOKS", 
        " ARIAS",
        "QUICK", "PIPES", "BELLS", "DRUMS", "FLATS", 
        "BRASS", "TUBAS", 
        "FLUTE", "VIOLA", "STOPS", "BONES", "BARIS", "ALTOS", "SAXES", 
        "SIGHT", "READS", 
        "BEATS", "AGOGE", "ALAAP", "ALAPA", 
        "ASSAI", "BASSO", "BATON", "BRACE", 
        "BREVE", "BUFFO", "BURLA", "CANON", "CAROL", "CATCH", 
        "CHANT", "CHOIR", "MUSIC", 
        "CHORD", "CROON", "DANCE", "DIRGE", "DOLCE", 
        "DRONE", "ETUDE", "FORTE", "FUGUE", 
        "FUOCO",  "GAMUT", "GRAVE", "GUSTO", 
        "LARGE", "LARGO", "LENTO", "LYRIC", 
        "MAJOR", "MARCH", "BANDS", 
        "METRE", "MEZZO", "TUNER", "TUNES", "MINIM", "MINOR", 
        "MOLTO", "MOSSO", "MOTET", 
        "MOTIF", "NEUME", "NONET", "DUETS", "OCTET", "OPERA",
        "OSSIA","PAUSE","PEDAL","PITCH","PLENO","PLICA","PRESA",
        "PRIMO","QUINT","RONDO",
        "ROUND","SCALE","SCORE","SEGNO","SEGUE","SGAKE",
        " SHARP","SIXTH","SLIDE","SOLFA"," STAFF","STAVE","STRUM",
        "SUITE",
        "SWELL","TABLE","TACET","TEMPO","TENOR","THEME","THIRD",
        "TONIC","TOUCH"," TRIAD"," TRILL","  TROPE"," TUTTI",
        " UPBOW"," VALSE","VALVE","VOICE","VOLTA",
        "YODEL", "CLEFS", 
        "HYMNS", "MODES", "MOODS", 
        "MUTES", "REEDS", "ROLLS", "RESTS", "ROOTS", "SLURS", 
        "SOLOS", "SOLIS", "SONGS", "TRIOS", "TUNES", 
        "TURNS", "TONES", "TIMES", "CELLO", 
        "SNARE", "XYLOS", "OBOES", "HARPS", "HORNS", 
        "BANJO", "LYRES", "STAND", "ORGAN", 
        "SITAR", "VEENA", "SYNTH", "HALLS", 
        "WINDS", "STRING", "SMASH", "TABLA", "HIHAT", 
        "HANGS", "CONGA", "CHIME", 
        "AULOS", "CLAVE", "CROWD", "COBZA", "BUGLE", "BONGO", 
        "DAIKO", "CRWTH", "DOBRO", 
        "GAITA", "GUSLA", "GUSLE", "QUENA","REBEC", "ZANZE", 
        "TABOR", "SAROD", "GONGS", 
        "MOUTH", "PIECE", "SCREW", "SINGS", "GRAND", "CAPOS", 
        "SECCO", "SENZO", "SUPER", "ELEGY", "GIGUE", "ONDES", "BLUES", 
        "WALTZ", "BOOKS", 
        "ARIAS", "QUICK", "PIPES", "BELLS", "DRUMS", "FLATS", 
        "BRASS", "TUBAS", 
        "FLUTE", "VIOLA", "STOPS", "BONES", "BARIS", "ALTOS", "SAXES", 
        "SIGHT", "READS", 
        "BEATS", "AGOGE", "ALAAP", "ALAPA", 
        "ASSAI", "BASSO", "BATON", "BRACE", 
        "BREVE", "BUFFO", "BURLA", "CANON", "CAROL", "CATCH", 
        "CHANT", "CHOIR", "MUSIC", 
        "CHORD", "CROON", "DANCE", "DIRGE", "DOLCE", 
        "DRONE", "ETUDE", "FORTE", "FUGUE", 
        "FUOCO", "GAMUT", "GRAVE", "GUSTO", 
        "LARGE", "LARGO", "LENTO", "LYRIC", 
        "MAJOR", "MARCH", "BANDS", 
        "METRE", "MEZZO", "TUNER", "TUNES", "MINIM", "MINOR", 
        "MOLTO", "MOSSO", "MOTET", 
        "MOTIF", "NEUME", "NONET", "DUETS", "OCTET", "OPERA",
        "OSSIA","PAUSE","PEDAL","PITCH","PLENO","PLICA","PRESA",
        "PRIMO","QUINT","RONDO",
        "ROUND","SCALE","SCORE","SEGNO","SEGUE","SGAKE",
        " SHARP","SIXTH","SLIDE","SOLFA"," STAFF","STAVE","STRUM",
        "SUITE",
        "SWELL","TABLE","TACET","TEMPO","TENOR","THEME","THIRD",
        "TONIC","TOUCH"," TRIAD"," TRILL","  TROPE"," TUTTI",
        " UPBOW"," VALSE","VALVE","VOICE","VOLTA",
        "YODEL", "CLEFS", 
        "HYMNS", "MODES", "MOODS", 
        "MUTES", "REEDS", "ROLLS", "RESTS", "ROOTS", "SLURS", 
        "SOLOS", "SOLIS", "SONGS", "TRIOS", "TUNES", 
        "TURNS", "TONES", "TIMES", "CELLO", 
        "SNARE", "XYLOS", "OBOES", "HARPS", "HORNS", 
        "BANJO", "LYRES", "STAND", "ORGAN", 
        "SITAR", "VEENA", "SYNTH", "HALLS", 
        "WINDS", "STRING", "SMASH", "TABLA", "HIHAT", 
        "HANGS", "CONGA", "CHIME", 
        "AULOS", "CLAVE", "CROWD", "COBZA", "BUGLE", "BONGO", 
        "DAIKO", "CRWTH", "DOBRO", 
        "GAITA", "GUSLA", "GUSLE", "QUENA","REBEC", "ZANZE", 
        "TABOR", "SAROD", "GONGS", 
        "MOUTH", "PIECE", "SCREW", "SINGS", "GRAND", "CAPOS", 
        "SECCO", "SENZO", "SUPER", "ELEGY", "GIGUE", "ONDES", "BLUES", 
        " WALTZ", "BOOKS", 
        " ARIAS"
    ]
    var word = word_array[DayOfTheYear]
   
    word = word.toLowerCase() 
    const letters = word.split(""); 

    const [rows, setRows] = useState(
        new Array(NUMBER_OF_TRIES).fill(new Array(letters.length).fill(""))
        );
      
    const [curRow,setcurRow] = useState(0);
    const [curCol, setcurCol] = useState(0);
    const[gameState, setGameState] = useState('playing');
    const [num_wins, setNumWins] = useState(0);
    
    
   
    useEffect(() => {
    if (curRow > 0) {
        checkGameState();
      }
    }, [curRow])

    const checkGameState = () => {
        if (checkIfWon()) {
            setNumWins(num_wins +1)
            Alert.alert("You won! \n You now have " + num_wins + " wins")
            setGameState("Won")

        }

        else if (checkIfLost()) {
            Alert.alert("You lost! The word was " + word)
            setGameState("Lost")
        }

    }

    const checkIfWon = () => {
        const row = rows[curRow-1]

        return row.every((letter, i) => letter === letters[i])

    }

    const checkIfLost = () => {
        return curRow === rows.length;

    }

    
    const onKeyPressed = (key) => {
        if (gameState !== "playing") {
            return
        }
      const updated_array = copyArray(rows)
      if (key === "CLEAR") {
        if ((curCol-1 > -1)) {
      
        updated_array[curRow][curCol-1] = "";
        setRows(updated_array)
        setcurCol(curCol-1)
        }
        return;
      }
    
      if (key === "ENTER") {
        if (curCol === rows[0].length) {
        setcurRow(curRow+1)
        setcurCol(0)
        }
        return;
      }
    
      if (curCol < rows[0].length) {
        updated_array[curRow][curCol] = key;
        setRows(updated_array);
        setcurCol(curCol + 1);
    }
    }
    
    const isCellActive = (row, col) => {
      return row === curRow && col === curCol;
    }
    
    const greenArray = []
    const yellowArray = []
    const greyArray = []
    const getBackgroundColor =  (letter, row, column) => {
    
      if (row >= curRow) {
        return '#C0C0C0'
      }
      if (letter === letters[column]) {
        if (greenArray.includes(letter) === false) {
          greenArray.push(letter)
        }
        return colors.primary
      }
    
      if (letters.includes(letter)) {
        if (yellowArray.includes(letter) === false) {
          yellowArray.push(letter)
        }
        return colors.secondary
      }
      if (greyArray.includes(letter) === false) {
        greyArray.push(letter)
      }
    
      return '#ffffff'
    
    }
     return (
    
      <SafeAreaView style={styles.container}>
    
        <StatusBar style="light"/>  
        {/*<Image source={require('./LBNlogo.png')} style={styles.image} /> */} 
        <Text style  = {styles.title}>Music Wordle</Text>
        
        <ScrollView style = {styles.map}>
          {rows.map((row, i)=> (
            <View key = {`row-${i}`}
            style = {styles.row}> 
              {row.map((letter, j) => (
                <View 
                key = {`cell-${i}-${j}`}
                style = {[styles.cell, 
                  {borderColor: isCellActive (i,j) 
                    ? colors.lightgrey 
                    : colors.darkgrey,
                    backgroundColor: getBackgroundColor(letter,i,j),
                  },
                  
                ]}> 
                  <Text style = {styles.celltext}>{letter.toString().toUpperCase()}</Text>
                </View>
                
          ))}
          </View>
          ))}
          </ScrollView>
    
        <Keyboard 
        onKeyPressed={onKeyPressed}
        greenCaps = {greenArray} 
        yellowCaps = {yellowArray}
        greyCaps = {greyArray}
        />
      </SafeAreaView>
     )

}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#C0C0C0' ,
      alignItems: 'center',
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
  
    cell: {
      borderWidth: 2  ,
      borderColor: colors.grey,
      width: 20,
      flex: 1,
      maxWidth: 60,
      height: 20,
      aspectRatio: 1,
      margin: 2,
      justifyContent: "center",
      alignItems: "center"
  
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
  
    wordlebutton: {
      top:150,
      borderWidth:1,
         borderColor:'rgba(0,0,0,0.2)',
         alignItems:'center',
         justifyContent:'center',
         width:100,
         height:50,
         backgroundColor:'#fff',
         alignSelf: 'center'
         
  
    }
  });
 

export default Funcwordlescreen;