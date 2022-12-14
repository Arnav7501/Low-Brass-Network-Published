import { StyleSheet, Text, Image, View, Pressable, Alert } from "react-native";
import {
  Entypo,
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import LikeImage from "../../assets/images/like.png";
import { useEffect, useState } from "react";
import { S3Image } from "aws-amplify-react-native";
import { useNavigation } from "@react-navigation/native";
import { DataStore } from "aws-amplify";
import { Post2 } from "../models";
import AsyncStorage from "@react-native-async-storage/async-storage";
const dummy_img =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/user.png";
  
 
 
/* Post component */
export default function FeedPost({ post }) {
 

  const [already_reported, setAlready_reported] = useState();
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    var newid = post.id
    newid = newid.toString()
    var newid2 = newid + "likes"
    getData2(newid2)
    getData(post.id)
  }, []);
  const storeData = async (id, value) => {
    try {
      await AsyncStorage.setItem(id, value)
    } catch (e) {
      // saving error
    }
  }



async function updatePost(id, num_likes) {
    const original = await DataStore.query(Post2, id);
    await DataStore.save(
      Post2.copyOf(original, updated => {
        updated.number_of_likes = num_likes
      })
    );
  }
 
  async function delete_data(id, num_reports) {
    id = id.toString()

  
    if (already_reported !== "true") { 
      console.log("not reported yet", already_reported)
      storeData(id, "true")
 
    if (num_reports > 10) {
      console.log("Deleting")
      const todelete = await DataStore.query(Post2, id);
      DataStore.delete(todelete);
    }

    else {
      Alert.alert("reported")
      var num1_reports = num_reports
      num1_reports = num1_reports +1
      const original = await DataStore.query(Post2, id);
      await DataStore.save(
        Post2.copyOf(original, updated => {
          updated.reports = num1_reports
        }))
      }}

      else {
        Alert.alert("You already reported this post")
      }
      }
 

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key)

      setAlready_reported(value)
      if(value == null) {
       //return "false"
      }
  
      //return "true"
    } catch(e) {
      console.log(e)
      // error reading value
    }
  }
  

  const getData2 = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key)
      var isTrueSet = (value === "false");
      setIsLiked(isTrueSet)

  
      if(value == null) {
       //return "false"
      }
  
      //return "true"
    } catch(e) {
      console.log(e)
      // error reading value
    }
  }
  
  return (
    <View style={styles.post}>
       <Text style={styles.name}>{post.name}</Text>
      {/* Post body with description and image */}
      <Text style={styles.description}>{post.description}</Text>

      {post.image && (
        <S3Image imgKey={post.image} style={styles.image} resizeMode="cover" />
      )}

      {/* Post footer with likes and button */}
      <View style={styles.footer}>
        <View style={styles.statsRow}>
          <Image source={LikeImage} style={styles.likeIcon} />
          <Text style={styles.likedBy}>
             {post.number_of_likes} Reccomendations
          </Text>
          {/*<Text style={styles.shares}>{post.number_of_shares} shares</Text>*/}
        </View>
        <View style={styles.buttonsRow}>
        <View style={styles.iconButton}>
          <Pressable
            onPress={() => 
              {
                console.log(isLiked)
                if (isLiked == false) {
                setIsLiked(!isLiked)
                console.log("is false", isLiked)
                var post2 = post.id + "likes"
                post2 = post2.toString()
                var isliked2 = isLiked.toString()
                storeData(post2, isliked2)
                var itsover = post.number_of_likes+1
                updatePost(post.id, itsover)}}
            }
            style={styles.iconButton}
          >
            <AntDesign
              name="like2"
              size={18}
              color={isLiked ? "royalblue" : "gray"}
            />
            <Text
              style={[
                styles.iconButtonText,
                { color: isLiked ? "royalblue" : "gray" },
              ]}
            >
              Reccomend
            </Text>
          </Pressable>
          <Text style={styles.iconButtonText2}  onPress={() => 
            delete_data(post.id, post.reports)} >{'Report Post/Off Topic'}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    backgroundColor: "#fff",
    marginVertical: 5,
  },
  header: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontWeight: "bold"


  },
  subtitle: {
    color: "gray",
  },
  icon: {
    marginLeft: "auto",
  },
  description: {
    lineHeight: 20,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  footer: {
    paddingHorizontal: 10,
  },
  statsRow: {
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 10,
    borderColor: "lightgray",
  },
  likeIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  likedBy: {
    color: "gray",
  },
  shares: {
    color: "gray",
    marginLeft: "auto",
  },
  buttonsRow: {
    
    marginVertical: 10,
  
  },
  iconButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButtonText: {
    color: "gray",
    marginLeft: 5,
    fontWeight: "500",
  },
  iconButtonText2: {
    color: "gray",
    marginLeft: 20,
    fontWeight: "500",
  }
});
