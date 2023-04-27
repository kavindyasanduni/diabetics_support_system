import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import UpdateContainer from "./UpdateContainer";
import UpdateContainerCard from "./UpdateContainerCard";

const Knowladgesharingdashbord = () => {

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
    <View>
      <View style={styles.aroundContainer}>
        {/* <UpdateContainer
         modelHeader="Update Exercise" 
         text="Add Photo" 
        //  onChange={(text) => setDescription(text)}
        // onSave={sendData} 
        /> */}

        <UpdateContainerCard
        modelHeader="Add new content" 
        text="Add Photo"
        />
      </View>

      <View style={styles.aroundContainerSecond}>
        {/* <UpdateContainer 
        modelHeader="Update Diet Plans" 
        text="Add Photo" 
        // 
        /> */}
{/* 
        <UpdateContainerCard
        modelHeader="Add Diet Plans" 
        text="Add Photo"
        /> */}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  aroundContainer: {
    marginTop: 50,
  },
  aroundContainerSecond: {
    marginTop: 50,
  },
  //   container: {
  //     // flexDirection: "row",
  //     justifyContent: "center",
  //     // alignItems:'center',
  //     backgroundColor: "#FFF",
  //     width: 300,
  //     height: 250,
  //     // marginLeft:52,
  //     left: 49,
  //     borderRadius: 32,
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
