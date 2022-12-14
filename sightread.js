import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Image, ScrollView, Dimensions,Button } from 'react-native';
import Constants from 'expo-constants';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from 'react-hook-form';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const getDayOfTheYear = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);
  return day;
};


const dayOfTheYear = getDayOfTheYear();
const trombone_array = [
    require('./Trombone/1.png'),
    require('./Trombone/3.png'),
    require('./Trombone/4.png'),
    require('./Trombone/5.png'),
    require('./Trombone/6.png'),
    require('./Trombone/7.png'),
    require('./Trombone/8.png'),
    require('./Trombone/9.png'),
    require('./Trombone/10.png'),
    require('./Trombone/11.png'),
    require('./Trombone/12.png'),
    require('./Trombone/13.png'),
    require('./Trombone/14.png'),
    require('./Trombone/15.png'),
    require('./Trombone/16.png'),
    require('./Trombone/17.png'),
    require('./Trombone/18.png'),
    require('./Trombone/19.png'),
    require('./Trombone/20.png'),
    require('./Trombone/21.png'),
    require('./Trombone/22.png'),
    require('./Trombone/23.png'),
    require('./Trombone/24.png'),
    require('./Trombone/25.png'),
    require('./Trombone/1.png'),
    require('./Trombone/3.png'),
    require('./Trombone/4.png'),
    require('./Trombone/5.png'),
    require('./Trombone/6.png'),
    require('./Trombone/7.png'),
    require('./Trombone/8.png'),
    require('./Trombone/9.png'),
    require('./Trombone/10.png'),
    require('./Trombone/11.png'),
    require('./Trombone/12.png'),
    require('./Trombone/13.png'),
    require('./Trombone/14.png'),
    require('./Trombone/15.png'),
    require('./Trombone/16.png'),
    require('./Trombone/17.png'),
    require('./Trombone/18.png'),
    require('./Trombone/19.png'),
    require('./Trombone/20.png'),
    require('./Trombone/21.png'),
    require('./Trombone/22.png'),
    require('./Trombone/23.png'),
    require('./Trombone/24.png'),
    require('./Trombone/25.png'),
    require('./Trombone/1.png'),
    require('./Trombone/3.png'),
    require('./Trombone/4.png'),
    require('./Trombone/5.png'),
    require('./Trombone/6.png'),
    require('./Trombone/7.png'),
    require('./Trombone/8.png'),
    require('./Trombone/9.png'),
    require('./Trombone/10.png'),
    require('./Trombone/11.png'),
    require('./Trombone/12.png'),
    require('./Trombone/13.png'),
    require('./Trombone/14.png'),
    require('./Trombone/15.png'),
    require('./Trombone/16.png'),
    require('./Trombone/17.png'),
    require('./Trombone/18.png'),
    require('./Trombone/19.png'),
    require('./Trombone/20.png'),
    require('./Trombone/21.png'),
    require('./Trombone/22.png'),
    require('./Trombone/23.png'),
    require('./Trombone/24.png'),
    require('./Trombone/25.png'),
    require('./Trombone/1.png'),
    require('./Trombone/3.png'),
    require('./Trombone/4.png'),
    require('./Trombone/5.png'),
    require('./Trombone/6.png'),
    require('./Trombone/7.png'),
    require('./Trombone/8.png'),
    require('./Trombone/9.png'),
    require('./Trombone/10.png'),
    require('./Trombone/11.png'),
    require('./Trombone/12.png'),
    require('./Trombone/13.png'),
    require('./Trombone/14.png'),
    require('./Trombone/15.png'),
    require('./Trombone/16.png'),
    require('./Trombone/17.png'),
    require('./Trombone/18.png'),
    require('./Trombone/19.png'),
    require('./Trombone/20.png'),
    require('./Trombone/21.png'),
    require('./Trombone/22.png'),
    require('./Trombone/23.png'),
    require('./Trombone/24.png'),
    require('./Trombone/25.png'),
    require('./Trombone/1.png'),
    require('./Trombone/3.png'),
    require('./Trombone/4.png'),
    require('./Trombone/5.png'),
    require('./Trombone/6.png'),
    require('./Trombone/7.png'),
    require('./Trombone/8.png'),
    require('./Trombone/9.png'),
    require('./Trombone/10.png'),
    require('./Trombone/11.png'),
    require('./Trombone/12.png'),
    require('./Trombone/13.png'),
    require('./Trombone/14.png'),
    require('./Trombone/15.png'),
    require('./Trombone/16.png'),
    require('./Trombone/17.png'),
    require('./Trombone/18.png'),
    require('./Trombone/19.png'),
    require('./Trombone/20.png'),
    require('./Trombone/21.png'),
    require('./Trombone/22.png'),
    require('./Trombone/23.png'),
    require('./Trombone/24.png'),
    require('./Trombone/25.png'),
    require('./Trombone/1.png'),
    require('./Trombone/3.png'),
    require('./Trombone/4.png'),
    require('./Trombone/5.png'),
    require('./Trombone/6.png'),
    require('./Trombone/7.png'),
    require('./Trombone/8.png'),
    require('./Trombone/9.png'),
    require('./Trombone/10.png'),
    require('./Trombone/11.png'),
    require('./Trombone/12.png'),
    require('./Trombone/13.png'),
    require('./Trombone/14.png'),
    require('./Trombone/15.png'),
    require('./Trombone/16.png'),
    require('./Trombone/17.png'),
    require('./Trombone/18.png'),
    require('./Trombone/19.png'),
    require('./Trombone/20.png'),
    require('./Trombone/21.png'),
    require('./Trombone/22.png'),
    require('./Trombone/23.png'),
    require('./Trombone/24.png'),
    require('./Trombone/25.png'),
    require('./Trombone/1.png'),
    require('./Trombone/3.png'),
    require('./Trombone/4.png'),
    require('./Trombone/5.png'),
    require('./Trombone/6.png'),
    require('./Trombone/7.png'),
    require('./Trombone/8.png'),
    require('./Trombone/9.png'),
    require('./Trombone/10.png'),
    require('./Trombone/11.png'),
    require('./Trombone/12.png'),
    require('./Trombone/13.png'),
    require('./Trombone/14.png'),
    require('./Trombone/15.png'),
    require('./Trombone/16.png'),
    require('./Trombone/17.png'),
    require('./Trombone/18.png'),
    require('./Trombone/19.png'),
    require('./Trombone/20.png'),
    require('./Trombone/21.png'),
    require('./Trombone/22.png'),
    require('./Trombone/23.png'),
    require('./Trombone/24.png'),
    require('./Trombone/25.png'),
    require('./Trombone/1.png'),
    require('./Trombone/3.png'),
    require('./Trombone/4.png'),
    require('./Trombone/5.png'),
    require('./Trombone/6.png'),
    require('./Trombone/7.png'),
    require('./Trombone/8.png'),
    require('./Trombone/9.png'),
    require('./Trombone/10.png'),
    require('./Trombone/11.png'),
    require('./Trombone/12.png'),
    require('./Trombone/13.png'),
    require('./Trombone/14.png'),
    require('./Trombone/15.png'),
    require('./Trombone/16.png'),
    require('./Trombone/17.png'),
    require('./Trombone/18.png'),
    require('./Trombone/19.png'),
    require('./Trombone/20.png'),
    require('./Trombone/21.png'),
    require('./Trombone/22.png'),
    require('./Trombone/23.png'),
    require('./Trombone/24.png'),
    require('./Trombone/25.png'),
    require('./Trombone/1.png'),
    require('./Trombone/3.png'),
    require('./Trombone/4.png'),
    require('./Trombone/5.png'),
    require('./Trombone/6.png'),
    require('./Trombone/7.png'),
    require('./Trombone/8.png'),
    require('./Trombone/9.png'),
    require('./Trombone/10.png'),
    require('./Trombone/11.png'),
    require('./Trombone/12.png'),
    require('./Trombone/13.png'),
    require('./Trombone/14.png'),
    require('./Trombone/15.png'),
    require('./Trombone/16.png'),
    require('./Trombone/17.png'),
    require('./Trombone/18.png'),
    require('./Trombone/19.png'),
    require('./Trombone/20.png'),
    require('./Trombone/21.png'),
    require('./Trombone/22.png'),
    require('./Trombone/23.png'),
    require('./Trombone/24.png'),
    require('./Trombone/25.png'),
    require('./Trombone/1.png'),
    require('./Trombone/3.png'),
    require('./Trombone/4.png'),
    require('./Trombone/5.png'),
    require('./Trombone/6.png'),
    require('./Trombone/7.png'),
    require('./Trombone/8.png'),
    require('./Trombone/9.png'),
    require('./Trombone/10.png'),
    require('./Trombone/11.png'),
    require('./Trombone/12.png'),
    require('./Trombone/13.png'),
    require('./Trombone/14.png'),
    require('./Trombone/15.png'),
    require('./Trombone/16.png'),
    require('./Trombone/17.png'),
    require('./Trombone/18.png'),
    require('./Trombone/19.png'),
    require('./Trombone/20.png'),
    require('./Trombone/21.png'),
    require('./Trombone/22.png'),
    require('./Trombone/23.png'),
    require('./Trombone/24.png'),
    require('./Trombone/25.png'),
    require('./Trombone/1.png'),
    require('./Trombone/3.png'),
    require('./Trombone/4.png'),
    require('./Trombone/5.png'),
    require('./Trombone/6.png'),
    require('./Trombone/7.png'),
    require('./Trombone/8.png'),
    require('./Trombone/9.png'),
    require('./Trombone/10.png'),
    require('./Trombone/11.png'),
    require('./Trombone/12.png'),
    require('./Trombone/13.png'),
    require('./Trombone/14.png'),
    require('./Trombone/15.png'),
    require('./Trombone/16.png'),
    require('./Trombone/17.png'),
    require('./Trombone/18.png'),
    require('./Trombone/19.png'),
    require('./Trombone/20.png'),
    require('./Trombone/21.png'),
    require('./Trombone/22.png'),
    require('./Trombone/23.png'),
    require('./Trombone/24.png'),
    require('./Trombone/25.png'),
    require('./Trombone/1.png'),
    require('./Trombone/3.png'),
    require('./Trombone/4.png'),
    require('./Trombone/5.png'),
    require('./Trombone/6.png'),
    require('./Trombone/7.png'),
    require('./Trombone/8.png'),
    require('./Trombone/9.png'),
    require('./Trombone/10.png'),
    require('./Trombone/11.png'),
    require('./Trombone/12.png'),
    require('./Trombone/13.png'),
    require('./Trombone/14.png'),
    require('./Trombone/15.png'),
    require('./Trombone/16.png'),
    require('./Trombone/17.png'),
    require('./Trombone/18.png'),
    require('./Trombone/19.png'),
    require('./Trombone/20.png'),
    require('./Trombone/21.png'),
    require('./Trombone/22.png'),
    require('./Trombone/23.png'),
    require('./Trombone/24.png'),
    require('./Trombone/25.png'),
    require('./Trombone/1.png'),
    require('./Trombone/3.png'),
    require('./Trombone/4.png'),
    require('./Trombone/5.png'),
    require('./Trombone/6.png'),
    require('./Trombone/7.png'),
    require('./Trombone/8.png'),
    require('./Trombone/9.png'),
    require('./Trombone/10.png'),
    require('./Trombone/11.png'),
    require('./Trombone/12.png'),
    require('./Trombone/13.png'),
    require('./Trombone/14.png'),
    require('./Trombone/15.png'),
    require('./Trombone/16.png'),
    require('./Trombone/17.png'),
    require('./Trombone/18.png'),
    require('./Trombone/19.png'),
    require('./Trombone/20.png'),
    require('./Trombone/21.png'),
    require('./Trombone/22.png'),
    require('./Trombone/23.png'),
    require('./Trombone/24.png'),
    require('./Trombone/25.png'),
    require('./Trombone/1.png'),
    require('./Trombone/3.png'),
    require('./Trombone/4.png'),
    require('./Trombone/5.png'),
    require('./Trombone/6.png'),
    require('./Trombone/7.png'),
    require('./Trombone/8.png'),
    require('./Trombone/9.png'),
    require('./Trombone/10.png'),
    require('./Trombone/11.png'),
    require('./Trombone/12.png'),
    require('./Trombone/13.png'),
    require('./Trombone/14.png'),
    require('./Trombone/15.png'),
    require('./Trombone/16.png'),
    require('./Trombone/17.png'),
    require('./Trombone/18.png'),
    require('./Trombone/19.png'),
    require('./Trombone/20.png'),
    require('./Trombone/21.png'),
    require('./Trombone/22.png'),
    require('./Trombone/23.png'),
    require('./Trombone/24.png'),
    require('./Trombone/25.png'),
    require('./Trombone/1.png'),
    require('./Trombone/3.png'),
    require('./Trombone/4.png'),
    require('./Trombone/5.png'),
    require('./Trombone/6.png'),
    require('./Trombone/7.png'),
    require('./Trombone/8.png'),
    require('./Trombone/9.png'),
    require('./Trombone/10.png'),
    require('./Trombone/11.png'),
    require('./Trombone/12.png'),
    require('./Trombone/13.png'),
    require('./Trombone/14.png'),
    require('./Trombone/15.png'),
    require('./Trombone/16.png'),
    require('./Trombone/17.png'),
    require('./Trombone/18.png'),
    require('./Trombone/19.png'),
    require('./Trombone/20.png'),
    require('./Trombone/21.png'),
    require('./Trombone/22.png'),
    require('./Trombone/23.png'),
    require('./Trombone/24.png'),
    require('./Trombone/25.png'),
]




const SightRead = ({navigation}) => {

  const [old_date, setOldDate] = useState(0)
  const [counter, setCounter] = useState(0);

  var var1 = getDayOfTheYear()
  /*useEffect(() => {
   console.log("NEW DEBUGS \n")
   var date = new Date().getDate()
   date = date.toString()

   AsyncStorage.getItem("date2").then(value => {
   
    if(value == null){
        console.log("null")
        storeData(date, "date2")
    }
    else{
        console.log("value,",value)
        var new_date = value
        var old_date_string = new_date.toString()
        if (date == old_date_string) {
          console.log("works")
        }

        else {
          AsyncStorage.getItem("counter2").then(value => {
            if (value == null) {
              storeData("0", "counter2")
            }
            else {
              var value2 = parseInt(value, 10)
              value2 += 1
              setCounter(value2)
              value2 = value2.toString()
              console.log(value2)
              storeData(value2, "counter2")
              storeData(date, "date2")
            }
          })
        }
    }
  })
    .catch(err => {
      console.log(err)
        // Add some error handling
});

   
  }, []);*/


    
    return (
    
      <ScrollView horizontal = {true}>
      <ScrollView>
      
    <View style>
      <Image 
         style = {styles.tinyLogo}
        source = {trombone_array[dayOfTheYear]}
      />
    </View>
    </ScrollView>
    </ScrollView>

  
   
    );
    



}

const styles = StyleSheet.create({
    tinyLogo: {
        width: windowWidth,
        height: windowHeight,
        aspectRatio: 1,
        transform: [{rotate: "270deg"}]
      
    },

    container: {
    
          
      }
    
  });

  export default SightRead;