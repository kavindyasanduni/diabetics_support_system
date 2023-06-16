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
              style={{ width: 50, height: 50 }}
            />
            <Text style={styles.t1}>Dr.Tharindu</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonC}>
            <Image
              source={require("../assets/images/d2.jpg")}
              style={{ width: 50, height: 50 }}
            />
            <Text style={styles.t2}>Dr.Alen </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonC}>
            <Image
              source={require("../assets/images/d6.jpg")}
              style={{ width: 50, height: 50 }}
            />
            <Text style={styles.t3}>Dr.harry</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonC}>
            <Image
              source={require("../assets/images/d4.jpg")}
              style={{ width: 50, height: 50 }}
            />
            <Text style={styles.t4}>Dr.Perera</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonC}>
            <Image
              source={require("../assets/images/d5.jpg")}
              style={{ width: 50, height: 50 }}
            />
            <Text style={styles.t5}>Dr.Silva</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonC: {
    backgroundColor: "#21a9ad",
    padding: 20,
    marginVertical: 15,
    marginHorizontal: 16,
    paddingVertical: 20,
    flexDirection: "row",
    borderRadius: 10,

    // Box Shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  t1: { color: "#fff", padding: 10, fontSize: 20 },
  t2: { color: "#fff", padding: 10, fontSize: 20 },
  t3: { color: "#fff", padding: 10, fontSize: 20 },
  t4: { color: "#fff", padding: 10, fontSize: 20 },
  t5: { color: "#fff", padding: 10, fontSize: 20 },
});

export default NutritionistCard;
