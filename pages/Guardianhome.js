import react from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet ,SafeAreaView,Image} from 'react-native'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";

const  Guardianhome = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.textView}>
        <Image
          source={require("../assets/VectorArt/gu1.png")}
          style={styles.Image}
        />
        <Text style={styles.text}>HOME </Text>
      </View>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Icon name="file-plus-outline" size={85} color="#1D11AD" />

              <Text style={styles.cardText}>Report</Text>
            </View>
          </View>
          {/* <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Icon name="food-off-outline" size={80} color="#1D11AD" />

              <Text style={styles.cardText}>Exercise & Diet plane</Text>
            </View>
          </View> */}
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Icon name="wechat" size={85} color="#1D11AD" />
              <Text style={styles.cardText}>Online Consultation</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginLeft: 47,
    fontWeight: "bold",
    marginTop: 0,
    color: "#fff",
    //marginLeft: 10,
    paddingLeft: 130,
  },
  textView: {
    backgroundColor: "#1D11AD",
    // marginBottom: 180,
    width: "100%",
    height: 280,
    paddingTop: 25,
  },
  cardText: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  Image: {
    height: 220,
    width: 200,
    alignSelf: "center",
  },
});




export default Guardianhome;