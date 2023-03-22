
import {  View,StyleSheet,Text } from 'react-native';

import AddDescription from "./AddDescription";
import ChoosePhoto from "./ChoosePhoto";

const Knowladgesharingdashbord = () => {
  return (
    <View>
      <View style={styles.aroundContainer}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View>
              <Text style={styles.modelHeader}>Update Exercise</Text>
            </View>
          </View>
          <View style={styles.description}>
            <AddDescription />
          </View>
          <View style={styles.addPhotoCntainer}>
            <View>
            <Text>Add Photo</Text>
            </View>
            <View>
            <ChoosePhoto/>
            </View>
          </View>
        </View>
      </View>


      <View style={styles.aroundContainerSecond}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View>
              <Text style={styles.modelHeader}>Update Diet Plans</Text>
            </View>
          </View>
          <View style={styles.description}>
            <AddDescription />
          </View>
          <View style={styles.addPhotoCntainer}>
            <View>
            <Text>Add Photo</Text>
            </View>
            <View>
            <ChoosePhoto/>
            </View>
          </View>
        </View>
      </View>


    </View>
  );
};

export default Knowladgesharingdashbord;
const styles = StyleSheet.create({
  aroundContainer: {
    // alignItems: "ceneter",
    // flex:1,
    marginTop: 30,
   
    
  },
  aroundContainerSecond: {
    // alignItems: "ceneter",
    // flex:1,
    marginTop: 50,
  },
  container: {
    // flexDirection: "row",
    justifyContent: "center",
    // alignItems:'center',
    backgroundColor: "#FFF",
    width: 300,
    height: 250,
    // marginLeft:52,
    left: 49,
    borderRadius: 32,
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
  modelHeader: {
    // flexDirection: "row",
    color: "#7a42f4",
    
    // justifyContent: 'center',
    // paddingTop: 5,
    // left:10,
  },
  headerContainer: {
    // flexDirection: "row",
    // justifyContent:'center',
    alignItems:'center',
    padding:10,

    // flex: 1,
  },
  description: {
    // marginTop: 70,
    // flexDirection: "row",
    // justifyContent:'center',
    // flex:2,
    alignItems:'center',
    marginTop:10,   
    // margingLeft: 50,
    borderColor:'red',
  },
  addPhotoCntainer:{
    flexDirection:'row',
    marginTop:20,
    padding:10,
    // flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginLeft:15,
    marginRight:15,
    

    
  }
});
