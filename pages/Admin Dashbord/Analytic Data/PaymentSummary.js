import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Text, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";

const PaymentSummary = () => {
  return (
    <View>
      <View style={styles.subTitlesContainer}>
        <Text style={styles.subTitles}>Payments analysis</Text>
      </View>
      <View style={styles.editDescription}>
        <View>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#2c3e50" }}>
            Monthly payments
          </Text>
        </View>
        <View style={styles.aroundCountShowing}>
          {/* {count.map((value, index) => (
                <View key={index} style={{ flexDirection: "row" }}>
                    <View style={{ flex: 3 }}>
                    <Text style={styles.textCount}>{value.category}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                    <Text style={styles.textCountNo}>{value.count}</Text>
                    </View>
                </View>
                ))} */}

          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 2 }}>
              <Text style={styles.textCount}>Patients</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.textCountNo}>88245.50</Text>
            </View>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#2c3e50",
              paddingTop: 40,
            }}
          >
            Total refunding
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  //edit description
  editDescription: {
    paddingLeft: 20,
    paddingTop: 8,
    left: 11,
    backgroundColor: "#FFFFFF",
    width: 370,
    height: 300,
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  descriptionInput: {
    width: 350,
    fontSize: 15,
  },
  //end of edit description

  //Subtitles
  subTitles: {
    color: "#1D11AD",
    fontWeight: "bold",
    fontSize: 17,
  },
  subTitlesContainer: {
    paddingLeft: 20,
    margin: 10,
    // alignContent:'center',
  },
  aroundCountShowing: {
    alignContent: "center",
    // textAlign : 'center',
    justifyContent: "center",
    paddingLeft: 30,
    paddingTop: 10,
    // paddingTop : 10,
    // fontSize : 20,
  },

  textCount: {
    fontSize: 15,
    // marginRight : 10,
    fontWeight: "bold",
    // color : "#2c3e50",
    color: "#7f8c8d",
    paddingTop: 5,
  },
  textCountNo: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#7f8c8d",
  },

  //styles for charts

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default PaymentSummary;
