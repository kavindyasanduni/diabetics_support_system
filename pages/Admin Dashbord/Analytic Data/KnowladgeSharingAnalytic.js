import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Text, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";

const KnowledgeSharingAnalytic = () => {
  const [count, setCount] = useState([]); //to get the count of all posts
  const [totalPostPerMonth, setTotalPostPerMonth] = useState([]); //to get the total

  //get the count of all posts
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http:///192.168.8.100:8082/getCount`);
      const responseOfCountAccordingToMonth  = await axios.get(`http:///192.168.8.100:8082/countByMonth`);
      // console.log("Response:", response.data);
      console.log( "Re" , responseOfCountAccordingToMonth.data);

      //to iterate through array of results
      const countArray = response.data.map((item) => ({
        category: item[0],
        count: item[1],
      }));

      setCount(countArray);
      console.log("Data successfully fetched", countArray);
      //end of iteration


      //get the counts of months
      const totalPostsPerMonthArray = responseOfCountAccordingToMonth.data.map((item) => ({
        month: item[0],
        totalPosts: item[1],
      }));

      setTotalPostPerMonth(totalPostsPerMonthArray);
      console.log("Data successfully fetched", totalPostsPerMonthArray);
      //end of get all posts according to Month

    } catch (error) {
      console.log(error);
      alert(
        "An error occurred while fetching the data. Please try again later."
      );
    }
  };
//end of get the count of all posts


//Code segment for set data for viewing line charts

//get month according to Month number
const getMonthName = (monthNumber) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return monthNames[monthNumber - 1] || "";
};
//end of function

//map function to set the data to line chart
const chartData = {
  labels: totalPostPerMonth.map((item) => getMonthName(item.month)),
  datasets: [
    {
      data: totalPostPerMonth.map((item) => item.totalPosts),
    },
  ],
};
//end of setting data to line chart


  return (
    <View>
      <View style={styles.subTitlesContainer}>
        <Text style={styles.subTitles}>Knowledge Sharing Center</Text>
      </View>
      <View style={styles.editDescription}>
        <View>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#2c3e50" }}>
            Total Posts
          </Text>
        </View>
        <View style={styles.aroundCountShowing}>
          {count.map((value, index) => (
            <View key={index} style={{ flexDirection: "row" }}>
              <View style={{ flex: 3 }}>
                <Text style={styles.textCount}>{value.category}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.textCountNo}>{value.count}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* <View style={styles.container}>
          <LineChart
            data={chartData}
            width={300}
            height={200}
            yAxisLabel=""
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            style={styles.chart}
          />
        </View> */}
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
    borderRadius: 15,
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

  textCount:{
    fontSize : 15,
    // marginRight : 10,
    fontWeight : 'bold',
        // color : "#2c3e50",
    color : "#7f8c8d",
    paddingTop : 5,

  }, 
  textCountNo : {
    fontSize : 15,
    fontWeight : 'bold',
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
export default KnowledgeSharingAnalytic;
