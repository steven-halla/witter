import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: '98%',
    display: 'flex',
    flexDirection : 'row',
    justifyContent: 'space-between',
    marginTop: 5,

  },
  number: {
    color: 'grey',
    marginLeft: 5,
    textAlign: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignContent: 'center',
  }
});

export default styles;
