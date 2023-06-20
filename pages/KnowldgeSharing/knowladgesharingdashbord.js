import { useState } from "react";
import { View, StyleSheet, Text,TouchableOpacity,Image } from "react-native";
import UpdateContainer from "./UpdateContainer";
import UpdateContainerCard from "./UpdateContainerCard";
import Icon from "react-native-vector-icons/AntDesign";
import { ScrollView } from "react-native-gesture-handler";

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
    // <View style = {{flex : 1 , backgroundColor: '#fff'}}>
    //   <View style={styles.aroundContainer}>
    //   <View style={styles.container}>
    //       <View style={styles.button_view}>
    //         <TouchableOpacity
    //           style={styles.button}
    //           onPress={() =>
    //             props.navigation.navigate("updateksc")
    //           }
    //         >
    //           {/* <ButtonD title ="Update Knowledge Sharing center"  navigation="knowladgesharingdashbord" /> */}
    //           <Text style={styles.buttonText}>
    //             Add content to web application
    //           </Text>
    //         </TouchableOpacity>
    //       </View>
    //     </View>

    //     <View style={styles.container}>
    //       <View style={styles.button_view}>
    //         <TouchableOpacity
    //           style={styles.button}
    //           onPress={() =>
    //             props.navigation.navigate("deletefromksc")
    //           }
    //         >
    //           {/* <ButtonD title ="Update Knowledge Sharing center"  navigation="knowladgesharingdashbord" /> */}
    //           <Text style={styles.buttonText}>
    //             Update or Delete data in web
    //           </Text>
    //         </TouchableOpacity>
    //       </View>
    //     </View>
    //     </View>
    // </View>


    <View style={{ flex: 1 }}>
      <View style={styles.textView}>
        <Image
          source={require("../../assets/VectorArt/kscimage2.png")}
          style={styles.Image}
        />
        <Text style={styles.text}>Knowledge Sharing center </Text>
      </View>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Icon name="export" size={50} color="#1D11AD" />
              <TouchableOpacity
              style={styles.button}
              onPress={() =>
                props.navigation.navigate("updateksc")
              }
            >       
              <Text style={styles.cardText}>
              Add new content
              </Text>
            </TouchableOpacity>
            </View>
          </View>
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Icon name="setting" size={50} color="#1D11AD" />

              <TouchableOpacity
              style={styles.button}
              onPress={() =>
                props.navigation.navigate("deletefromksc")
              }
            >       
              <Text style={styles.cardText}>
                Update or remove data
              </Text>
            </TouchableOpacity>
            </View>
          </View>
        
        </View>
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  // aroundContainer: {
  //   marginTop: 50,
  //   // justifyContent: 'center',
  //   // alignContent: 'center',
  //   alignItems:'center',
  // },
  // aroundContainerSecond: {
  //   marginTop: 50,
  // },
  // container: {
  //     // flexDirection: "row",
  //     justifyContent: "center",
  //     alignItems:'center',
  //     backgroundColor: "#FFF",
  //     width: 250,
  //     height: 70,
  //     marginTop: 50,
  //     // marginLeft:52,
  //     // left: 49,
  //     borderRadius: 20,
  //     ...Platform.select({
  //       ios: {
  //         shadowColor: '#000000',
  //         shadowOffset: {
  //           width: 0,
  //           height: 4,
  //         },
  //         shadowOpacity: 0.25,
  //         shadowRadius: 4,
  //       },
  //       android: {
  //         elevation: 5,
  //       },
  //     }),
  //   },
  // //   modelHeader: {
  // //     // flexDirection: "row",
  // //     color: "#1D11AD",

  // //     // justifyContent: 'center',
  // //     // paddingTop: 5,
  // //     // left:10,
  // //   },
  // //   headerContainer: {
  // //     // flexDirection: "row",
  // //     // justifyContent:'center',
  // //     alignItems:'center',
  // //     padding:10,

  // //     // flex: 1,
  // //   },
  // //   description: {
  // //     // marginTop: 70,
  // //     // flexDirection: "row",
  // //     // justifyContent:'center',
  // //     // flex:2,
  // //     alignItems:'center',
  // //     marginTop:10,
  // //     // margingLeft: 50,
  // //     borderColor:'red',
  // //   },
  // //   addPhotoCntainer:{
  // //     flexDirection:'row',
  // //     marginTop:20,
  // //     padding:10,
  // //     // flexDirection:'row',
  // //     justifyContent:'space-between',
  // //     alignItems:'center',
  // //     marginLeft:15,
  // //     marginRight:15,

  // //   },
  // // submitButtonCOntainer:{
  // //   flexDirection:'row',
  // //   flex:1,
  // //   justifyContent:'center',
  // //   alignContent:'center',
  // //   left:115,
  // //   marginTop:20,
  // //   width:200,

  // // }
  

  container: {
    alignItems: "center",
    flex: 1,
    paddingBottom: 20, // Add some padding to the bottom to prevent the last card from being cut off
  },
  cardContainer: {
    // paddingHorizontal: 20,
    marginTop: 20,
    // marginBottom: 110,
    marginTop: 10,
    width: "90%",
  },
  card: {
    height: 150,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginLeft: 1,
  },
  text: {
    fontSize: 20,
    marginBottom: 15,
    // marginLeft: 40,
    fontWeight: "bold",
    marginTop: 0,
    color: "#fff",
    //marginLeft: 10,
    // paddingLeft: 130,
  },
  textView: {
    backgroundColor: "#1D11AD",
    // marginBottom: 180,
    width: "100%",
    height: 280,
    paddingTop: 25,
    alignItems: "center",
  },
  cardText: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: "bold",
    color : "#2c3e50",
    // fontColor: "gray",
  },
  Image: {
    height: 220,
    width: "50%",

    alignSelf: "center",
  },
});
export default Knowladgesharingdashbord;
