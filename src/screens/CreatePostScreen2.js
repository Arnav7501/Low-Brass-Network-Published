import { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Button,
  KeyboardAvoidingView,
  Linking
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DataStore, Auth, Storage } from "aws-amplify";
import { Post2, User } from "../models";
import { useNavigation } from "@react-navigation/native";
import { v4 as uuidv4 } from "uuid";
import { S3Image } from "aws-amplify-react-native";



const CreatePostScreen2 = () => {
  const dummy_img =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/user.png";
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [numlikes, setnumlikes] = useState("");
  const [image, setImage] = useState(null);
  const insets = useSafeAreaInsets();
  const [user, setUser] = useState();
  const navigation = useNavigation();

  
  const onPost = async () => {
    const newPost = {
      name: name,
      description: description,
      number_of_likes: 0,
      number_of_shares: 1020,
      _version: 1,
    };
    if (image) {
      newPost.image = await uploadFile(image);
    }
    await DataStore.save(new Post2(newPost));

    setDescription("");
    setnumlikes(0)
    setImage("");
    navigation.navigate('Find a Tutor/ Sign up');
  };

  const uploadFile = async (fileUri) => {
    try {
      const response = await fetch(fileUri);
      const blob = await response.blob();
      const key = `${uuidv4()}.png`;
      await Storage.put(key, blob, {
        contentType: "image/png", // contentType is optional
      });
      return key;
    } catch (err) {
      console.log("Error uploading file:", err);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { marginBottom: insets.bottom }]}
      contentContainerStyle={{ flex: 1 }}
      keyboardVerticalOffset={150}
    >
      <View style={styles.header}>
  
      

        <Entypo
          onPress={pickImage}
          name="images"
          size={24}
          color="limegreen"
          style={styles.icon}
        />
      </View>
      <TextInput
        placeholderTextColor="purple"
        placeholder="Enter your name here"
        value={name}
        onChangeText={setName}
        style = {{top: '-5%'}}
    
      />

      <Text>{'In the below input, enter \n\n Low Brass Instruments you teach: \n\n Experience (if any): \n\n Availibilty: \n\n Contact Information:'}</Text>
      <TextInput
        placeholder= {'Enter information here'}
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        multiline 
      />

    
      {image && <Image source={{ uri: image }} style={styles.image} />}

      <View style={styles.buttonContainer}>
        <Button onPress={onPost} title="Post" disabled={!description} />
      </View>

      <Text style={{color: 'blue', top: '-20%', textAlign: 'center'}}
      onPress={() => Linking.openURL('https://docs.google.com/forms/d/e/1FAIpQLScR5hlQCem7kHKZ1VPTWMqfkJSNFtIurDAfivOeSg5t30e-Qg/viewform')}>
       Fill out this form to receive your service hours
    </Text>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
    padding: 10,
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
  input: {top: '5%'},
  buttonContainer: {
    marginTop: "auto",
    marginVertical: 10,
  },
  icon: {
    marginLeft: "auto",
  },
  image: {
    width: "100%",
    aspectRatio: 4 / 3,
  },
});

export default CreatePostScreen2;
