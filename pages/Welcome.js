import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// import Svg, { Path } from "react-native-svg";
import { Svg, Path, Defs, Stop } from 'react-native-svg';

const Welcome = (props) => {
  /*
    const onPressButton = () => {
        Alert.alert('clicked button');
    };*/

  const colors = ["#8914af", "#05b9de", "#45a7a9"];
  const start = { x: 0, y: 0 };
  const end = { x: 0, y: 1 };
  const locations = [0.1, 0.66, 1];

  //colors for wave
  const gradientColors = [
    { offset: "0%", color: "#00F" },
    { offset: "100%", color: "#F00" },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={colors}
        start={start}
        end={end}
        locations={locations}
        style={styles.gradient}
      >
        {/* d="M0 0 C 83.33 100, 166.67 100, 250 0 S 416.67 -100, 500 0 L 500 300 L 0 300 Z" */}

        <View style={{ alignItems: "center"}}>
          {/* <Svg height="50%" width="100%">
            <Defs>
              <LinearGradient
                id="waveGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                {gradientColors.map((stop, index) => (
                  <Stop
                    key={index}
                    offset={stop.offset}
                    stopColor={stop.color}
                  />
                ))}
              </LinearGradient>
            </Defs>

            <Path
              //   d="M0 20 C 50 100, 100 60, 250 25 S 416.67 -100, 500 0 L 500 300 L 0 300 Z"
              d="M0 100 C -150 350, 50 100, 180 180 S 350 200, 400 200 S 500 300, 500 200 L 500 300 L 0 300 Z"
              fill="url(#waveGradient)"
            //   fill="#00F"
            />
          </Svg> */}
          <Text style={styles.text1}>Manage Your Diabetes</Text>
          <Text style={styles.text2}>Welcome</Text>
          <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate("PatientHomePage")}
        >
          <Text style={styles.buttonText}>Patient home page</Text>
        </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.navigation.navigate("Login")}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => props.navigation.navigate("Admin")}
          >
            <Text style={styles.buttonText}>Admin dashbord</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
    
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'#1E1E1E'
  },
  gradient: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  text1: {
    textAlign: "center",
    width: 269,
    height: 33,
    // left:80,
    fontSize: 18,
    fontWeight: "bold",
    top: 456,
    color: "#FFFFFF",
  },
  text2: {
    textAlign: "center",
    width: 269,
    height: 33,
    // left:80,
    top: 460,
    fontSize: 15,
    fontWeight: "bold",

    color: "#FFFFFF",
  },
  button: {
    backgroundColor: "#7a42f4",
    padding: 10,
    top: 500,
    width: 258,
    height: 49,
    // left:85,
    borderRadius: 32,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFFFFF",
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginTop: 50,
  },
});

export default Welcome;
