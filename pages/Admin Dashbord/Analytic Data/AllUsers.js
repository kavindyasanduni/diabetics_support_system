import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Text, StyleSheet } from "react-native";
import { BarChart } from "react-native-chart-kit";
import BASE_URL from "../../../config";

const AllUsers = () => {

  const [countAccordingToUserType , setCountAccordingToUserType] = useState ([]);//to get the count of each users

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async() => {
    try { 
      const response = await axios.get(`${BASE_URL}/api/users/getCountOfUsers`);
      // console.log("response"  , response.data);

      //set data to an array
      const countOfUsersArray = response.data.map((item) =>({
            userType : item[0],
            count : item[1],
      }));
      setCountAccordingToUserType(countOfUsersArray);
      console.log("Data successfully fetched :" , countOfUsersArray);

    }
    catch (error){
      console.log(error);
      alert("An error occurred while fetching the data. Please try again later.");

    }
  };


  // Calculate the total count and percentages
  const totalCount = countAccordingToUserType.reduce((acc, curr) => acc + curr.count, 0);
  const percentages = countAccordingToUserType.map((item) => (item.count / totalCount) * 100);
  
  // Truncate labels to 4 characters
  const truncatedLabels = countAccordingToUserType.map((item) => item.userType.substring(0, 4));


// Render the bar chart
const data = {
  labels: truncatedLabels,
  datasets: [
    {
      data: percentages,
    },
  ],
};

  return (
    <View>
      <View style={styles.subTitlesContainer}>
        <Text style={styles.subTitles}>Users</Text>
      </View>
      <View style={styles.editDescription}>
        <View>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#2c3e50" }}>
            Total counts
          </Text>
        </View>
        <View style={styles.aroundCountShowing}>
          {countAccordingToUserType.map((value, index) => (
            <View key={index} style={{ flexDirection: "row" }}>
              <View style={{ flex: 3 }}>
                <Text style={styles.textCount}>{value.userType}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.textCountNo}>{value.count}</Text>
              </View>
            </View>
          ))}

        </View>

        <View style={{paddingTop:15}}>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#2c3e50" }}>
            Users as a percentages
          </Text>
        </View>
         {/* Bar chart start from here */}
      <View style = {styles.barChartContainer}>
        <BarChart
          data={data}
          width={320}
          height={220}
          chartConfig={{
            // backgroundColor: '#2ecc71',
            backgroundGradientFrom: '#f1c40f',
            backgroundGradientTo: '#27ae60',
            decimalPlaces: 2,
            color: (opacity = 50) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
            // paddingBottom:5,
            // marginBottom: 5,
          }}
        />
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
    height: 470,
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
        elevation: 5,
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
    textTransform: "capitalize",

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

  //styles for barchart
  barChartContainer : {
    paddingTop: 10,
    paddingLeft:10,
    // alignItems:"center",



  }
});

export default AllUsers;
