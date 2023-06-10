import { padding } from "@mui/system";
import React from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import SearchBar from "./Component/Searchbar.js";
import { ScrollView } from "react-native-gesture-handler";


  const NutritionistCard = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <SearchBar style={styles.ser} />
        <View style={styles.button1}>
          <TouchableOpacity style={styles.buttonC}>
            <Image
              source={require("../assets/images/d1.jpg")}
              style={{ width: 70, height: 70 }}
            />
            <Text style={styles.t1}>Dr</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonC}>
            <Image
              source={require("../assets/images/d2.jpg")}
              style={{ width: 70, height: 70 }}
            />
            <Text style={styles.t2}>Dr </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonC}>
            <Image
              source={require("../assets/images/d3.jpg")}
              style={{ width: 70, height: 70 }}
            />
            <Text style={styles.t3}>Dr.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonC}>
            <Image
              source={require("../assets/images/d4.jpg")}
              style={{ width: 70, height: 70 }}
            />
            <Text style={styles.t4}>Dr</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonC}>
            <Image
              source={require("../assets/images/d5.jpg")}
              style={{ width: 70, height: 70 }}
            />
            <Text style={styles.t5}>Dr.Silva</Text>
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
  },
  button1: {
    color: "red",
    paddingVertical: 10,
    marginVertical: 5,
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

export default NutritionistCard;
