import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Animated,
  Easing,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Welcome = (props) => {
  const colors = ["#0c2461", "#1e3799", "#0c2461"];
  const start = { x: 0, y: 0 };
  const end = { x: 0, y: 1 };
  const locations = [0.1, 0.66, 1];
  const opacityAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.timing(opacityAnimation, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={colors}
        start={start}
        end={end}
        locations={locations}
        style={styles.gradient}
      >
        <View style={styles.logoContainer}>
          <Animated.View style={[styles.logoCircle, { opacity: opacityAnimation }]}>
            <Image
              source={require("../assets/Logo/Diamate.png")}
              style={styles.logo}
            />
          </Animated.View>
          <View style={styles.DiaMate}>
          <Animated.Text
            style={[
              styles.text1,
              { opacity: opacityAnimation },
            ]}
          >
            DiaMate
          </Animated.Text>
          </View >
          <View  style= {styles.ManageYD}>
          <Animated.Text
            style={[
              styles.text2,
              { opacity: opacityAnimation },
            ]}
          >
            Manage your Diabetes
          </Animated.Text>
          </View>
          <View style= {styles.Welcome}>
          <Animated.Text
            style={[
              styles.text3,
              { opacity: opacityAnimation },
            ]}
          >
            Welcome
          </Animated.Text>
          </View>
          <View style = {styles.buttonNext}>
          <TouchableOpacity
            style={[styles.button, { opacity: opacityAnimation }]}
            onPress={() => props.navigation.navigate("Login")}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 150,
  },
  logoCircle: {
    width: 160,
    height: 160,
    borderRadius: 80, // half of width and height
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "70%",
    height: "70%",
    resizeMode: "contain",
  },
  DiaMate : {
    width: 269,
    margin: 20,

  },
   
  text1: {
    height: 50,
    textAlign: "center",
    fontSize: 45,
    fontWeight: "bold",
    color: "#rgb(100, 170, 250)",
    fontFamily:""
  },
  ManageYD : {
    // marginTop : 10,

  },
  Welcome : {
    marginTop : 150,
  },
  text2: {
    textAlign: "center",
    width: 269,
    height: 33,
    fontSize: 18,
    // fontWeight: "bold",
    color: "#dfe4ea",
    // margin:30,
  },
  text3: {
    textAlign: "center",
    width: 269,
    height: 33,
    fontSize: 20,
    // fontWeight: "bold",
    color: "#ffffff",
    // margin:30,
  },
  button: {
    backgroundColor: "#4a69bd",
    padding: 10,
    width: 258,
    height: 49,
    borderRadius: 32,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFFFFF",
  },
  buttonNext : {
        marginTop:20,
  },
});

export default Welcome;
