// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { View, Text, StyleSheet } from "react-native";
// import { LineChart } from "react-native-gifted-charts";
// import BASE_URL from "../../../config";

// const KnowledgeSharingAnalytic = () => {
//   const [count, setCount] = useState([]);
//   const [totalPostPerMonth, setTotalPostPerMonth] = useState([]);


//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`${BASE_URL}/getCount`);
//       const responseOfCountAccordingToMonth = await axios.get(
//         `${BASE_URL}/countByMonth`
//       );
      
//       const countArray = response.data.map((item) => ({
//         category: item[0],
//         count: item[1],
//       }));
//       console.log('Response:', response.data);
//       	console.log('Response of Count According to Month:', responseOfCountAccordingToMonth.data);


//       setCount(countArray);

//       const totalPostsPerMonthArray = responseOfCountAccordingToMonth.data.map(
//         (item) => ({
//           month: item[0],
//           totalPosts: item[1],
//         })
//       );

//       setTotalPostPerMonth(totalPostsPerMonthArray);
//     } catch (error) {
//       console.log(error);
//       alert(
//         "An error occurred while fetching the data. Please try again later."
//       );
//     }
//   };

//   const getMonthName = (monthNumber) => {
//     const monthNames = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ];

//     return monthNames[monthNumber - 1] || "";
//   };

//   const chartData = {
//     labels: totalPostPerMonth.map((item) => getMonthName(item.month)),
//     datasets: totalPostPerMonth.length > 0 ? [  // Add conditional check here
//       {
//         data: totalPostPerMonth.map((item) => item.totalPosts),
//       },
//     ] : [],
//   };

//   return (
//     <View>
//       <View style={styles.subTitlesContainer}>
//         <Text style={styles.subTitles}>Knowledge Sharing Center</Text>
//       </View>
//       <View style={styles.editDescription}>
//         <View>
//           <Text style={{ fontSize: 16, fontWeight: "bold", color: "#2c3e50" }}>
//             Total Posts
//           </Text>
//         </View>
//         <View style={styles.aroundCountShowing}>
//           {count.map((value, index) => (
//             <View key={index} style={{ flexDirection: "row" }}>
//               <View style={{ flex: 3 }}>
//                 <Text style={styles.textCount}>{value.category}</Text>
//               </View>
//               <View style={{ flex: 1 }}>
//                 <Text style={styles.textCountNo}>{value.count}</Text>
//               </View>
//             </View>
//           ))}
//         </View>

//         <View>
//           <Text
//             style={{
//               fontSize: 16,
//               fontWeight: "bold",
//               color: "#2c3e50",
//               marginTop: 15,
//             }}
//           >
//             Total Posts per month
//           </Text>
//         </View>
//         <View style={styles.container}>
//           {/* <LineChart
//             data={chartData}
//             width={320}
//             height={200}
//             yAxisLabel=""
//             chartConfig={{
//               backgroundColor: "#ffffff",
//               backgroundGradientFrom: "#ffffff",
//               backgroundGradientTo: "#ffffff",
//               decimalPlaces: 0,
//               color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//               labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//             }}
//             bezier
//             style={styles.chart}
//           /> */}
//           <LineChart data={chartData} />
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   //edit description
//   editDescription: {
//     paddingLeft: 20,
//     paddingTop: 8,
//     left: 11,
//     backgroundColor: "#FFFFFF",
//     width: 370,
//     height: 400,
//     borderRadius: 8,
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000000",
//         shadowOffset: {
//           width: 0,
//           height: 4,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 2,
//       },
//     }),
//   },
//   descriptionInput: {
//     width: 350,
//     fontSize: 15,
//   },
//   //end of edit description

//   //Subtitles
//   subTitles: {
//     color: "#1D11AD",
//     fontWeight: "bold",
//     fontSize: 17,
//   },
//   subTitlesContainer: {
//     paddingLeft: 20,
//     margin: 10,
//     // alignContent:'center',
//   },
//   aroundCountShowing: {
//     alignContent: "center",
//     // textAlign : 'center',
//     justifyContent: "center",
//     paddingLeft: 30,
//     paddingTop: 10,
//     // paddingTop : 10,
//     // fontSize : 20,
//   },

//   textCount:{
//     fontSize : 15,
//     // marginRight : 10,
//     fontWeight : 'bold',
//         // color : "#2c3e50",
//     color : "#7f8c8d",
//     paddingTop : 5,
//     textTransform: "capitalize",

//   }, 
//   textCountNo : {
//     fontSize : 15,
//     fontWeight : 'bold',
//     color: "#7f8c8d",

//   },

//   //styles for charts

//   container: {
//     // paddingTop : 15,
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   chart: {
//     // marginVertical: 8,
//     borderRadius: 16,
//   },
// });
// export default KnowledgeSharingAnalytic;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Text, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import BASE_URL from "../../../config";

const KnowledgeSharingAnalytic = () => {
  const [count, setCount] = useState([]);
  const [totalPostPerMonth, setTotalPostPerMonth] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getCount`);
      const responseOfCountAccordingToMonth = await axios.get(`${BASE_URL}/countByMonth`);
      const countArray = response.data.map((item) => ({
        category: item[0],
        count: item[1],
      }));
      setCount(countArray);
      const totalPostsPerMonthArray = responseOfCountAccordingToMonth.data.map((item) => ({
        month: item[0],
        totalPosts: item[1],
      }));
      setTotalPostPerMonth(totalPostsPerMonthArray);
      setIsDataFetched(true);
    } catch (error) {
      console.log(error);
      alert("An error occurred while fetching the data. Please try again later.");
    }
  };

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

  const chartData = {
    labels: totalPostPerMonth.map((item) => getMonthName(item.month)),
    datasets: [
      {
        data: totalPostPerMonth.map((item) => item.totalPosts),
      },
    ],
  };

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

        <View>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#2c3e50", marginTop: 15 }}>
            Total Posts per month
          </Text>
        </View>
        <View style={styles.container}>
          {isDataFetched ? (
            <LineChart
              data={chartData}
              width={320}
              height={200}
              yAxisLabel=""
              chartConfig={{
                backgroundColor: "#3498db",
                backgroundGradientFrom: "#2980b9",
                backgroundGradientTo: "#3498db",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              style={styles.chart}
            />
          ) : (
            <Text>Loading data...</Text>
          )}
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
    height: 400,
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

  textCount:{
    fontSize : 15,
    // marginRight : 10,
    fontWeight : 'bold',
        // color : "#2c3e50",
    color : "#7f8c8d",
    paddingTop : 5,
    textTransform: "capitalize",

  }, 
  textCountNo : {
    fontSize : 15,
    fontWeight : 'bold',
    color: "#7f8c8d",

  },

  //styles for charts

  container: {
    // paddingTop : 15,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  chart: {
    // marginVertical: 8,
    borderRadius: 16,
  },
});
export default KnowledgeSharingAnalytic;

