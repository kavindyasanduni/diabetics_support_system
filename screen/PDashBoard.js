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

const PDash = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
        <Text style={styles.m1}> Patient DashBoard</Text>
          <TouchableOpacity style={styles.buttonC}>
            <Text style={styles.t1}>Book Appoinment  Doctor</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonC}>
            <Text style={styles.t2}>Book Appoinment  Nutritionist </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonC}>
            <Text style={styles.t3}>My Reservation</Text>
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
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  buttonC: {
    backgroundColor: "#0E1879",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    paddingVertical: 19,
    flexDirection: "row",
    borderRadius: 25,
    marginBottom: 7,
    marginTop: 2,
  },
  t1: { color: "#fff", padding: 5, fontSize: 20 },
  t2: { color: "#fff", padding: 5, fontSize: 20 },
  t3: { color: "#fff", padding: 5, fontSize: 20 },

  t4: { color: "#fff", padding: 5, fontSize: 20 },

  t5: { color: "#fff", padding: 5, fontSize: 20 },

  button1: {
    color: "red",
    paddingVertical: 10,
    marginVertical: 5,
  },
  m1: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft:28,
    marginBottom:20,
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
