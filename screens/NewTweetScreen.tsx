import React, { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from "react-native";

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import ProfilePicture from "../components/ProfilePicture";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { createTweet } from "../graphql/mutations";
import { useNavigation } from "@react-navigation/native";



export default function NewTweetScreen() {


  const [tweet, setTweet] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const navigation = useNavigation();

  const onPostTweet = async () => {
    try {

      const currentUser = await Auth.currentAuthenticatedUser({bypassCache: true});

      const newTweet = {
        content: tweet,
        image: imageUrl,
        userId: currentUser.attributes.sub,
      }
      await API.graphql(graphqlOperation(createTweet,{input: newTweet }));
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <AntDesign name="close" size={30} color={Colors.light.tint} />
          <TouchableOpacity style={styles.button} onPress={onPostTweet}>
            <Text style={styles.buttonText}>Tweet</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.newTweetContainer}>
            <ProfilePicture image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuqI35mONQc0brx4iHoiHSW5J0ZTHnn0fOvw&usqp=CAU'}/>
            <View style={styles.inputsContainer}>
              <TextInput
                value={tweet}
                onChangeText={(value ) => setTweet(value)}
                multiline={true}
                numberOfLines={3}
                style={styles.tweetInput}
                placeholder={"What's happening?"}
              />
              <TextInput
                value={imageUrl}
                onChangeText={(value) => setImageUrl(value)}
                style={styles.imageInput}
                placeholder={"image url(optional)"}
              />
          </View>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: 'white',
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,

  },
  button: {
    backgroundColor: Colors.light.tint,
    borderRadius: 30,
  },
  buttonText: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  newTweetContainer: {
    flexDirection: 'row',
    padding: 15,

  },
  inputsContainer: {
    marginLeft: 10,

  },
  tweetInput: {
    height: 100,
    maxHeight: 300,
    fontSize: 18,
  },
  imageInput: {

  },
});
