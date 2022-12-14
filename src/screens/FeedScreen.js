import { FlatList, StyleSheet, Image, Text, Pressable } from "react-native";
import FeedPost from "../components/FeedPost";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { useEffect, useState } from "react";
import { DataStore, SortDirection, Predicates } from "aws-amplify";
import { Post, User } from "../models";
import { Auth } from "aws-amplify";


const img =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/user.png";

const FeedScreen = () => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const [blocked_ids, setBlockedIds] = useState([]);
  
  

  useEffect(() => {
    const subscription = DataStore.observeQuery(Post, Predicates.ALL, {
      sort: (s) => s.createdAt(SortDirection.DESCENDING),
    }).subscribe(({ items }) => setPosts(items));
   

    const fetchUser = async () => {
      const userData = await Auth.currentAuthenticatedUser();
      const dbUser = await DataStore.query(User, userData.attributes.sub);
      var blocked_ids = []
      if (dbUser) {
        for (let i = 0; i < dbUser.blocks.length; i++) {
          blocked_ids[i] = dbUser.blocks[i]

        }
        blocked_ids = [...new Set(blocked_ids)];
        setBlockedIds(blocked_ids)
        const dbPosts = await DataStore.query(Post, (p) =>
        p.postUserId("eq", blocked_ids[0])
      );
    
      } 
    };
  
    fetchUser();
    return () => subscription.unsubscribe();
  }, []);

  var newpost = posts
        for (let i = 0; i < posts.length; i++) {
          for (let v = 0; v < blocked_ids.length; v++) {
              if (posts[i].postUserId == blocked_ids[v]) {
                newpost.splice(i, 1) 
              }
          };
  
      };
  const createPost = () => {
    navigation.navigate("Create Post");
  };

  
  return (
    <FlatList
      data={newpost}
      renderItem={({ item }) => <FeedPost post={item} />}
      showsVerticalScrollIndicator={false}
      initialNumToRender={5} 
      ListHeaderComponent={() => (
        <Pressable onPress={createPost} style={styles.header}>
          <Image source={{ uri: img }} style={styles.profileImage} />
          <Text style={styles.name}>What's on your mind?</Text>
          <Entypo
            name="images"
            size={24}
            color="limegreen"
            style={styles.icon}
          />
        </Pressable>
      )}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 10,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    color: "gray",
  },
  icon: {
    marginLeft: "auto",
  },
});

export default FeedScreen;
