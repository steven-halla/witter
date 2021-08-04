import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import Amplify, { Auth, API, graphqlOperation } from "aws-amplify";
import config from "./src/aws-exports";
import { withAuthenticator } from 'aws-amplify-react-native';
import { getUser } from'./src/graphql/queries';

Amplify.configure(config);

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const getRandomImage = () => {
    return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2mRAUvb0gPZ1pP5oijzYDIGLhJl-SZ0LoDw&usqp=CAU'
  }

  const saveUserToDB = async (user) => {

  }

  useEffect(() => {
    const updateUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser({bypassCache: true});
      console.log(userInfo);

      if(userInfo) {
        const userData = await API.graphql(graphqlOperation(getUser, { id: userInfo.attributes.sub}));
        console.log(userData)
        if(userData.data.getUser) {
          const user = {
            id: userInfo.attributes.sub,
            username: userInfo.attributes.username,
            name: userInfo.attributes.username,
            email: userInfo.attributes.email,
            image: getRandomImage(),
          }
         await saveUserToDB(user);

        } else {
          console.log('User already exist');
        }
      }
    }
    updateUser();
  }, [])

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);
