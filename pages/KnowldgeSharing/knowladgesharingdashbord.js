import { useState } from "react";
import { View, StyleSheet, Text,TouchableOpacity } from "react-native";
import UpdateContainer from "./UpdateContainer";
import UpdateContainerCard from "./UpdateContainerCard";

const Knowladgesharingdashbord = (props) => {

    const [description, setDescription] = useState("");
    console.log(description);
  
    const sendData = () => {
      axios
        // .post("http://yourserver.com/api/saveData", { description })
        // .then((response) => console.log(response.data))
        // .catch((error) => console.error(error));
        console.log(description);
    };
  return (
    <View style = {{flex : 1 , backgroundColor: '#fff'}}>
      <View style={styles.aroundContainer}>
      <View style={styles.container}>
          <View style={styles.button_view}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                props.navigation.navigate("updateksc")
              }
            >
              {/* <ButtonD title ="Update Knowledge Sharing center"  navigation="knowladgesharingdashbord" /> */}
              <Text style={styles.buttonText}>
                Add content to web application
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.button_view}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                props.navigation.navigate("deletefromksc")
              }
            >
              {/* <ButtonD title ="Update Knowledge Sharing center"  navigation="knowladgesharingdashbord" /> */}
              <Text style={styles.buttonText}>
                Update or Delete data in web
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        </View>
    </View>
  );
};


const styles = StyleSheet.create({
  aroundContainer: {
    marginTop: 50,
    // justifyContent: 'center',
    // alignContent: 'center',
    alignItems:'center',
  },
  aroundContainerSecond: {
    marginTop: 50,
  },
  container: {
      // flexDirection: "row",
      justifyContent: "center",
      alignItems:'center',
      backgroundColor: "#FFF",
      width: 250,
      height: 70,
      marginTop: 50,
      // marginLeft:52,
      // left: 49,
      borderRadius: 20,
      ...Platform.select({
        ios: {
          shadowColor: '#000000',
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
  //   modelHeader: {
  //     // flexDirection: "row",
  //     color: "#1D11AD",

  //     // justifyContent: 'center',
  //     // paddingTop: 5,
  //     // left:10,
  //   },
  //   headerContainer: {
  //     // flexDirection: "row",
  //     // justifyContent:'center',
  //     alignItems:'center',
  //     padding:10,

  //     // flex: 1,
  //   },
  //   description: {
  //     // marginTop: 70,
  //     // flexDirection: "row",
  //     // justifyContent:'center',
  //     // flex:2,
  //     alignItems:'center',
  //     marginTop:10,
  //     // margingLeft: 50,
  //     borderColor:'red',
  //   },
  //   addPhotoCntainer:{
  //     flexDirection:'row',
  //     marginTop:20,
  //     padding:10,
  //     // flexDirection:'row',
  //     justifyContent:'space-between',
  //     alignItems:'center',
  //     marginLeft:15,
  //     marginRight:15,

  //   },
  // submitButtonCOntainer:{
  //   flexDirection:'row',
  //   flex:1,
  //   justifyContent:'center',
  //   alignContent:'center',
  //   left:115,
  //   marginTop:20,
  //   width:200,

  // }
});
export default Knowladgesharingdashbord;
