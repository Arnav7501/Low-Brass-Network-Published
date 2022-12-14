import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Dimensions,
  FlatList,
  Pressable,
  Alert,
} from "react-native";

import { User, Post } from "../models";
import { S3Image } from "aws-amplify-react-native/dist/Storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { API, graphqlOperation, Auth, DataStore, Storage, mutations } from "aws-amplify";
import FeedPost from "../components/FeedPost";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
 
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
const dummy_img =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/user.png";
const bg = "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/1.jpg";

const profilePictureWidth = Dimensions.get("window").width * 0.4;

const storeData = async (id, value) => {

  try {
    await AsyncStorage.setItem(id, value)
  } catch (e) {
    // saving error
  }
}
async function delete_user(id) {
  const dbPosts = await DataStore.query(Post, (p) =>
  p.postUserId("eq", id)
  );
  console.log(dbPosts)
  for (var i = 0; i < dbPosts.length; i++) {
  DataStore.delete(dbPosts[i])
}
  //const todelete = await DataStore.query(User, id);
  //DataStore.delete(todelete);
  await Auth.deleteUser();
  navigation.navigate('SigninScreen')
}


async function delete_data(id, num_reports) {
  if (num_reports > 100) {
    console.log("Deleting")

    const dbPosts = await DataStore.query(Post, (p) =>
      p.postUserId("eq", id)
    );
    
    for (var i = 0; i < dbPosts.length(); i++) {
      DataStore.delete(dbPosts[i])
  }
    const todelete = await DataStore.query(User, id);
    DataStore.delete(todelete);
  }
  else {
      var id1 = id
      id1 = id1.toString()
      const already_reported = await AsyncStorage.getItem(id1)
    if (already_reported !== "true") {
      storeData(id1, "true")
      var num1_reports = num_reports + 1
      const original = await DataStore.query(User, id);
      await DataStore.save(
      User.copyOf(original, updated => {
        updated.reports = num1_reports
      }))
      Alert.alert("Reported")
    }
    else {
      Alert.alert("you already reported this post")
    }
  
  }}

const ProfileScreenHeader = ({ user, isMe = false }) => {
  const navigation = useNavigation();

  const signOut = async () => {
    await DataStore.clear();
    navigation.navigate("SignIn")
  };

  if (!user) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: bg }} style={styles.bg} />
      {user?.image ? (
        <S3Image imgKey={user.image} style={styles.image} />
      ) : (
        <Image source={{ uri: dummy_img }} style={styles.image} />
      )}

      <Text style={styles.name}>{user.name}</Text>

      {isMe ? (
        <View style={styles.buttonsContainer}>
          <Pressable style={[styles.button, { backgroundColor: "royalblue" }]}>
            <AntDesign name="pluscircle" size={16} color="white" />
            <Text style={[styles.buttonText, { color: "white" }]}
             onPress={() => delete_user(user.id)}
            >
              Delete User
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Update Profile")}
            style={styles.button}
          >
            <MaterialCommunityIcons name="pencil" size={16} color="black" />
            <Text style={styles.buttonText}>Edit Profile</Text>
          </Pressable>
          <Pressable
            onPress={signOut}
            style={[styles.button, { flex: 0, width: 50 }]}
          >
            <MaterialIcons name="logout" size={16} color="black" />
          </Pressable>
        </View>
      ) :
      <View style={styles.buttonsContainer}>
      <Pressable style={[styles.button, { backgroundColor: "royalblue" }]}    onPress={() => delete_data(user.id, user.reports)}>
        <AntDesign name="pluscircle" size={16} color="white" />
        <Text 
        style={[styles.buttonText, { color: "white" }]}
        >
          Report User
        </Text>
      </Pressable>
      <Pressable
            onPress={() => updateBlocks(user.id)}
            style={styles.button}
          >
            <MaterialCommunityIcons name="filter" size={16} color="black" />
            <Text style={styles.buttonText}>Block User</Text>
          </Pressable>
    </View>
      }
      {/*
      <View style={styles.textLine}>
        <Entypo
          name="graduation-cap"
          size={18}
          color="gray"
          style={{ width: 25 }}
        />
        <Text>Graduated university</Text>
      </View>

      <View style={styles.textLine}>
        <Ionicons name="time" size={18} color="gray" style={{ width: 25 }} />
        <Text>Joined on October 2013</Text>
      </View>

      <View style={styles.textLine}>
        <Entypo
          name="location-pin"
          size={18}
          color="gray"
          style={{ width: 25 }}
        />
        <Text>From Tenerife</Text>
      </View> */}
    </View>
  );
};
async function updateBlocks(block_id, id) {
  const userData = await Auth.currentAuthenticatedUser();
  id = userData?.attributes?.sub
  const user1 = await DataStore.query(User, id)
  console.log(user1.name)
  var tempblockarray = []
for (var i = 0; i < user1.blocks.length; i++) {
  tempblockarray[i] = user1.blocks[i];
}
 

  tempblockarray.push(block_id)

  await DataStore.save(
    Post.copyOf(user1, updated => {
      updated.blocks = tempblockarray
    })
  );

  
}
const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [isMe, setIsMe] = useState(false);
  const [posts, setPosts] = useState([]);
  const route = useRoute();
  const navigation = useNavigation();
 
  useEffect(() => {
    const fetchData = async () => {
      // get the authenticated user
      const userData = await Auth.currentAuthenticatedUser();
      // take the user id from the route or from the authenticated user
      const userId = route?.params?.id || userData?.attributes?.sub;
      if (!userId) {
        return;
      }

      // keep track if we are querying the data about the authenticated user
      const storeData = async (value) => {
        try {
          await AsyncStorage.setItem('deleting', value)
        } catch (e) {
          // saving error
        }
      }

      const isMe = userId === userData?.attributes?.sub;
      setIsMe(isMe);
      var storing = isMe.toString()
      storeData(storing)

      // query the database user
      const dbUser = await DataStore.query(User, userId);

      if (!dbUser) {
        // if we couldn't find the user in the database
        if (isMe) {
          // and it is my profile, then redirect to Update Profile page
          navigation.navigate("Update Profile");
        } else {
          // otherwise, Alert the user
          Alert.alert("User not found!");
        }
        return;
      }
      // save the user in the state
      setUser(dbUser);

      // query his posts
      const dbPosts = await DataStore.query(Post, (p) =>
        p.postUserId("eq", userId)
      );
      setPosts(dbPosts);

    };

    fetchData();
  }, []);

  

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <FeedPost post={item} isprofilescreen={isMe} />}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => (
        <>
          <ProfileScreenHeader user={user} isMe={isMe} />
          <Text style={styles.sectionTitle}>Posts</Text>
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    padding: 10,
  },
  bg: {
    width: "100%",
    height: 200,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginBottom: -profilePictureWidth / 2,
  },
  image: {
    width: profilePictureWidth,
    aspectRatio: 1,
    borderRadius: 500,
    borderWidth: 5,
    borderColor: "white",
  },
  name: {
    fontWeight: "500",
    fontSize: 16,
    marginVertical: 5,
  },
  buttonsContainer: {
    paddingVertical: 5,
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "lightgray",
  },
  button: {
    alignSelf: "stretch",
    flexDirection: "row",
    backgroundColor: "gainsboro",
    margin: 5,
    padding: 7,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  buttonText: {
    marginHorizontal: 5,
    fontWeight: "500",
  },
  textLine: {
    alignSelf: "stretch",
    alignItems: "center",
    marginVertical: 5,
    flexDirection: "row",
  },
  sectionTitle: {
    marginLeft: 10,
    marginVertical: 5,
    fontWeight: "500",
    fontSize: 18,
  },
});

export default ProfileScreen;
