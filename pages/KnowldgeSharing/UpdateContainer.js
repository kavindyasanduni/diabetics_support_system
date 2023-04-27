import { View, StyleSheet, Text } from "react-native";
import SubmitButton from "./SubmitButton";
import AddDescription from "./AddDescription";
import ChoosePhoto from "./ChoosePhoto";

const UpdateContainer = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.modelHeader}>{props.modelHeader}</Text>
        </View>
      </View>
      <View style={styles.description}>
        <AddDescription />
      </View>
      <View style={styles.addPhotoCntainer}>
        <View>
          <Text style = {styles.addPhoto}>{props.text}</Text>
        </View>
        <View>
          <ChoosePhoto />
        </View>
      </View>
      <View style={styles.submitButtonCOntainer}>
        <View>
          <SubmitButton />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  aroundContainer: {
    marginTop: 30,
  },
  aroundContainerSecond: {
    marginTop: 50,
  },
  container: {
    justifyContent: "center",
    backgroundColor: "#FFF",
    width: 300,
    height: 260,
    left: 49,
    borderRadius: 32,
    ...Platform.select({
      ios: {
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  modelHeader: {
    color: "#1D11AD",
    fontWeight:"bold",
  },
  headerContainer: {
    alignItems: "center",
    padding: 10,
    marginTop:10,
  },
  description: {
    alignItems: "center",
    marginTop: 10,

    borderColor: "red",
  },
  addPhotoCntainer: {
    flexDirection: "row",
    marginTop: 20,
    padding: 10,

    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 15,
    marginRight: 15,
  },
  submitButtonCOntainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    left: 115,
    marginTop: 20,
    width: 200,
  },
  addPhoto:{
    color : "#1D11AD",
  }
});

export default UpdateContainer;
