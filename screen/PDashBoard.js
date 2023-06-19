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
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.m1}> Patient DashBoard</Text>
          <TouchableOpacity style={styles.buttonC}>
            <Text
              style={styles.t1}
              onPress={() => props.navigation.navigate("DoctorAppointment" , {type : "doctor"})}
            >
              Book Appoinment Doctor
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonC}>
            <Text
              style={styles.t2}
              onPress={() => props.navigation.navigate("NutritionistAppointment")
              }
            >
              Book Appoinment Nutritionist{" "}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonC}>
            <Text style={styles.t3} 
            onPress={() => props.navigation.navigate("MakeReservation")}

             >Make Reservation</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonC}>
            <Text style={styles.t4}>Online Consultation</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonC}>
            <Text style={styles.t5}>Upload Report</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonC}>
            <Text style={styles.t5}>Medicine</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonC}>
            <Text style={styles.t5}>Exercise & Diet plan </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    backgroundColor: "#fff",
  },
  item: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  buttonC: {
    backgroundColor: "#F9F5F6",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    paddingVertical: 19,
    flexDirection: "row",
    borderRadius: 25,
    marginBottom: 7,
    marginTop: 2,
  },
  t1: { color: "#000000", padding: 5, fontSize: 20 },
  t2: { color: "#000000", padding: 5, fontSize: 20 },
  t3: { color: "#000000", padding: 5, fontSize: 20 },

  t4: { color: "#000000", padding: 5, fontSize: 20 },

  t5: { color: "#000000", padding: 5, fontSize: 20 },

  button1: {
    color: "red",
    paddingVertical: 10,
    marginVertical: 5,
  },
  m1: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 28,
    marginBottom: 20,
  },

  button2: {
    color: "blue",
    paddingVertical: 30,
  },
  button3: {
    color: "yellow",
  },
  ser: {
    position: "absolute",
    paddingTop: 20,
  },
});

export default PDash;
