import React, { useState, useEffect } from "react";
import { View, Text, Dimensions ,StyleSheet} from "react-native";
import { BarChart } from "react-native-chart-kit";
import axios from "axios";
import BASE_URL from "../../../config";
 // Replace with our API base URL

const PaymentSummary = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getAllPayment`);
      console.log("Data fetched", response.data);
      setPaymentData(response.data); // Store the payment data in state
      setIsDataFetched(true);
    } catch (error) {
      console.log(error);
      alert("An error occurred while fetching the data. Please try again later.");
    }
  };

// Function to process payment data and calculate monthly totals
const getMonthlyPayments = () => {
  // Initialize an object to store monthly totals
  const monthlyPayments = {};

  // Define an array of month labels
  const monthLabels = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Iterate over the payment data
  paymentData.forEach((payment) => {
    const date = new Date(payment.createdDate);
    const monthIndex = date.getMonth(); // Months are zero-indexed

    // Get the corresponding month label
    const monthLabel = monthLabels[monthIndex];

    // Check if the month key already exists, if not, initialize it to 0
    if (!monthlyPayments[monthLabel]) {
      monthlyPayments[monthLabel] = 0;
    }

    // Add the payment amount to the corresponding month
    monthlyPayments[monthLabel] += payment.amount;
  });

  return monthlyPayments;
};

// Get the monthly payment data
const monthlyPayments = getMonthlyPayments();

// Extract the payment amounts and labels for the bar chart
const paymentAmounts = Object.values(monthlyPayments);
const paymentLabels = Object.keys(monthlyPayments);

  // Define chart configuration
  const chartConfig = {
    backgroundGradientFrom: '#16a085',
            backgroundGradientTo: '#3498db',
            decimalPlaces: 2,
            color: (opacity = 10) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
  };

  const barChartData = {
    labels: paymentLabels,
    datasets: [
      {
        data: paymentAmounts,
      },
    ],
  };

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
    
        <View style={styles.container}>

        {isDataFetched ? (
              <BarChart
                data={barChartData}
                width={320}
                height={220}
                chartConfig={chartConfig}
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
            
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
