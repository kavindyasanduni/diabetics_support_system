import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
} from "react-native";
import ButtonD from "./ButtonD";
import SubmitButton from "../KnowldgeSharing/SubmitButton";
import Triangle from "./Triangle ";
import Icon from "react-native-vector-icons/MaterialIcons";
import KnowledgeSharingAnalytic from "./Analytic Data/KnowladgeSharingAnalytic";
import AllUsers from "./Analytic Data/AllUsers";
import PaymentSummary from "./Analytic Data/PaymentSummary";

const Dashbord = (props) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <View style={{ flex: 1 , backgroundColor:"#fff" }}>
      

      <View style = { {flex : 1 , paddingBottom: 5}}>
        <ScrollView>
        <View style={styles.textView}>
        <Image
          source={require("../../assets/VectorArt/admin_d.png")}
          style={styles.Image}
        />
        <Text style={styles.text}>Admin Dashboard</Text>
      </View>
          <View>
            <KnowledgeSharingAnalytic />
          </View>

          <View>
            <AllUsers />
          </View>
          <View>
            <PaymentSummary />
          </View>
        </ScrollView>
      </View>
     
    </View>
  );

 
};
const styles = StyleSheet.create({
 
  ////////////////////////////////////////////////////////////////

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
    width: "90%",

    alignSelf: "center",
  },
});
export default Dashbord;
