import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const GuardianDashboard = ({ navigation }) => {
  return (
    <View>
      <View style={styles.textView}>
        <Text style={styles.text}>HOME PAGE</Text>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Icon name="doctor" size={85} color="#21a9ad" />
          
         <Text style={styles.cardText}>Reports</Text>
          
        </View>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Icon name="food-off" size={85} color="#21a9ad" />
          
          
            <Text style={styles.cardText}>Exercise & Diet plane</Text>
         
        </View>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Icon name="wechat" size={85} color="#21a9ad" />
          <Text style={styles.cardText}>Online Consultation</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    paddingHorizontal: 20,
  },
  card: {
    width: "100%",
    height: 180,
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
    fontSize: 37,
    marginTop: 90,
    marginBottom: 15,
    marginLeft: 90,
    fontWeight: "bold",
  },
  textView: {
    backgroundColor: "#21a9ad",
  },
  cardText: {
    fontSize: 25,
    marginTop: 10,
    fontWeight: "bold",
  },
});

export default GuardianDashboard;
