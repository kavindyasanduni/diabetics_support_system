import { padding } from "@mui/system";
import React from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  
} from "react-native";

import { ScrollView } from "react-native-gesture-handler";

const PDash = (props) => {
  return (
    // <SafeAreaView>
    //   <ScrollView>
    //     <View style={styles.container}>
    //       <Text style={styles.m1}> Patient DashBoard</Text>
    //       <TouchableOpacity style={styles.buttonC}>
    //         <Text
    //           style={styles.t1}
    //           onPress={() => props.navigation.navigate("DoctorAppointment" , {type : "doctor"})}
    //         >
    //           Book Appoinment Doctor
    //         </Text>
    //       </TouchableOpacity>

    //       <TouchableOpacity style={styles.buttonC}>
    //         <Text
    //           style={styles.t2}
    //           onPress={() => props.navigation.navigate("NutritionistAppointment")
    //           }
    //         >
    //           Book Appoinment Nutritionist{" "}
    //         </Text>
    //       </TouchableOpacity>

    //       <TouchableOpacity style={styles.buttonC}>
    //         <Text style={styles.t3} 
    //         onPress={() => props.navigation.navigate("MakeReservation")}

    //          >Make Reservation</Text>
    //       </TouchableOpacity>

    //       <TouchableOpacity style={styles.buttonC}>
    //         <Text style={styles.t4}>Online Consultation</Text>
    //       </TouchableOpacity>

    //       <TouchableOpacity style={styles.buttonC}>
    //         <Text style={styles.t5}>Upload Report</Text>
    //       </TouchableOpacity>

    //       <TouchableOpacity style={styles.buttonC}>
    //         <Text style={styles.t5}>Medicine</Text>
    //       </TouchableOpacity>
    //       <TouchableOpacity style={styles.buttonC}>
    //         <Text style={styles.t5}>Exercise & Diet plan </Text>
    //       </TouchableOpacity>
    //     </View>
    //   </ScrollView>
    // </SafeAreaView>

    <View style={{ flex: 1 }}>
    <View style={styles.textView}>
      <Image
        source={require("../assets/VectorArt/dd.png")}
        style={styles.Image}
      />
      <Text style={styles.text}>HOME</Text>
    </View>
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Icon name="book-clock" size={85} color="#1D11AD" />

            <TouchableOpacity
            style={styles.button}
            onPress={() =>
             props.navigation.navigate("DoctorAppointment" , {type : "doctor"})
            }
          >       
            <Text style={styles.cardText}>
            Book Doctor
            </Text>
          </TouchableOpacity>
          </View>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Icon name="book-clock" size={85} color="#1D11AD" />

            <TouchableOpacity
            style={styles.button}
            onPress={() =>
              props.navigation.navigate("NutritionistAppointment")
            }
          >       
            <Text style={styles.cardText}>
            Book Nutritionist
            </Text>
          </TouchableOpacity>
          </View>
        </View>
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
    marginLeft: 20,
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

export default PDash;
