import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginHorizontal: 10,
    width: "80%"
  },
  tweetHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  tweetHeaderNames: {
    flexDirection: "row"
  },
  name: {
    marginRight: 5,
    fontWeight: "bold"
  },
  username: {
    marginHorizontal: 5,
    color: "grey"
  },
  createdAt: {
    marginHorizontal: 5,
    color: "grey"
  },
  moreIcon: {},
  contentContainer: {
    display: "flex",
    flexDirection: "column",
  },

  content: {
    marginTop: 5,
    lineHeight: 18,
  },
  image: {
    marginVertical: 10,
    height: 200,
    resizeMode: "cover",
    borderRadius: 15,
    overflow: "hidden"
  },

});

export default styles;
