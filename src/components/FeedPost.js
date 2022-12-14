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
import { User, Post } from "../models";
import AsyncStorage from "@react-native-async-storage/async-storage";
const dummy_img =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/user.png";
async function updatePost(id, num_likes) {
    const original = await DataStore.query(Post, id);
    await DataStore.save(
      Post.copyOf(original, updated => {
        updated.number_of_likes = num_likes
      })
    );
  }


 
 

/* Post component */
export default function FeedPost({ post, isprofilescreen }) {
  const [already_reported,  setAlready_reported] = useState();
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState(null);
  const navigation = useNavigation();
  
  async function delete_data(identifier,id, num_reports) {
    if (num_reports > 10) {  
      identifier = true}
    if (identifier) {
      console.log("Deleting")
      const todelete = await DataStore.query(Post, id);
      DataStore.delete(todelete);
    }
    else {
      if (already_reported !== "true") {
        var id1 = post.id
        id1 = id1.toString()
        storeData(id1, "true")
        var num1_reports = num_reports
        num1_reports = num1_reports +1
        const original = await DataStore.query(Post, id);
        await DataStore.save(
        Post.copyOf(original, updated => {
          updated.reports = num1_reports
        }))
        Alert.alert("Reported")
      }
      else {

        Alert.alert("you already reported this post")
      }
    
    }}

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
  
  const storeData = async (id, value) => {

    try {
      await AsyncStorage.setItem(id, value)
    } catch (e) {
      // saving error
    }
  }

  

  useEffect(() => {
    var newid = post.id
    newid = newid.toString()
    var newid2 = newid + "likes"
    getData(post.id)
    getData2(newid2)
    if (!post.postUserId) {
      return;
    }
    DataStore.query(User, post.postUserId).then(setUser);
  }, [post.postUserId]);

  return (
    <View style={styles.post}>

      {/* Post Header with details about the author */}
      <Pressable
        onPress={() => navigation.navigate("Profile", { id: post.User?.id })}
        style={styles.header}
      >
     
        {user?.image ? (
         
          <S3Image imgKey={user.image} style={styles.profileImage} />
          
        ) : (
          <Image source={{ uri: dummy_img }} style={styles.profileImage} />
        )}
        <View>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.subtitle}>{post.createdAt}</Text>
        </View>
        <Entypo
          name="dots-three-horizontal"
          size={18}
          color="gray"
          style={styles.icon}
        />
      </Pressable>

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
             {post.number_of_likes} likes
          </Text>
          {/*<Text style={styles.shares}>{post.number_of_shares} shares</Text>*/}
        </View>
        <View style={styles.buttonsRow}>
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
              Like
            </Text>
          </Pressable>
          <View style={styles.iconButton}>
            <FontAwesome5 name="comment-alt" size={16} color="gray" />
            <Text style={styles.iconButtonText}>Comment</Text>
          </View>
          <View style={styles.iconButton}>
            <MaterialCommunityIcons
              name="share-outline"
              size={18}
              color="gray"
            />
            <Text style={styles.iconButtonText}  onPress={() => 
              
              delete_data(isprofilescreen, post.id, post.reports).then(navigation.navigate("Feed"))} >{ isprofilescreen ? 'Delete Post' : 'Report Post'}</Text>
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
    fontWeight: "500",
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
    flexDirection: "row",
    justifyContent: "space-around",
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
});
