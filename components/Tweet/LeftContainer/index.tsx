import React from 'react';
import { View } from "react-native";
import { UserType } from "../../../types";
import styles from "./styles";
import ProfilePicture from "../../ProfilePicture";

export type LeftContainerProps = {
  user: UserType,

}

const LeftContainer = ({ user }: LeftContainerProps) => (
  <View style={styles.container}>
     <ProfilePicture image={ user.image} size={75} />
  </View>
)

export default LeftContainer;
