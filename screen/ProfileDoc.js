import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, Image, TouchableOpacity ,StyleSheet} from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import {useConfirmPayment} from '@stripe/stripe-react-native'



import axios from "axios";
import BASE_URL from "../config";
import { Button } from "react-native-elements";


const ProfileDoc = (props) => {
const {confirmPayment, loading} = useConfirmPayment();

  const [AppoinmentDateandDay, setAppinmentDateandDay] = useState("");
  const [showCardField, setShowCardField] = useState(false);


  const { id, name } = props.route.params;
  console.log(id);
  console.log(name);
  const [doctorData, setDoctorData] = useState([]);

  useEffect(() => {
    if (name === "doctor") {
      fetchDataD();
    } else if (name === "nutritionist") {
      fetchDataN();
    }
    // fetchDataN();
  }, []);

  const fetchDataD = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getdoctordatabyid/${id}`);
      if (response.data) {
        setDoctorData(response.data);
      }
      console.log('Data successfully fetched');
      // setDoctorData(response.data)
      // console.log('Data successfully fetched:', response.data);
    } catch (error) {
      console.log(error);
      alert('An error occurred while fetching the data. Please try again later.');
    }
  };



  const fetchDataN = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getnutritionist/${id}`);
      if (response.data) {
        setDoctorData(response.data);
      }
      console.log('Data successfully fetched');
      // setDoctorData(response.data)
      // console.log('Data successfully fetched:', response.data);
    } catch (error) {
      console.log(error);
      alert('An error occurred while fetching the data. Please try again later.');
    }
  };


  //send data
    const handleClick = (date, time) => {
      // Create an object with the data to be sent
      const data = {
        date: date,
        time: time
      };
     if (name ==="doctor"){
      // Send the data to the server using Axios
      axios.post(`${BASE_URL}/addReservation`,{
            p_id: "1", //should send actual p id
            r_type : name,
            d_id : id,
            date : date,
            time : time,
            p_name : "Lakshan",
 
      })
        .then(response => {
          // Handle the response if needed
          alert("Reservation saved!");
          console.log('Data saved successfully!');
        })
        .catch(error => {
          // Handle the error if needed
          alert("Error occurred! Try again later");
          console.error('Error saving data:', error);
        });

     }else if (name === "nutritionist"){
          axios.post(`${BASE_URL}/addReservation`,{
            p_id: "1",
            r_type : name,
            d_id : id,
            date : date,
            time : time,
            p_name : "Lakshan",
            isremove : "no",

       })
        .then(response => {
          // Handle the response if needed
          alert("Reservation saved!");
          setShowCardField(false)
          console.log('Data saved successfully!');
        })
        .catch(error => {
          // Handle the error if needed
          alert("Error occurred! Try again later");
          console.error('Error saving data:', error);
        });
      }
    };
  
    const handleBookNowPress = () => {
      setShowCardField(true);
    };


  const click = () => {};

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${BASE_URL}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // this is the default booking fee 
        amount : 200000,
        currency: 'lkr',
      }),
    });
    const {clientSecret} = await response.json();
    return clientSecret;
  };

  const handlePayPress = async () => {
    const clientSecret = await fetchPaymentIntentClientSecret();
  };


  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.HeadContainer}>
          <Image
            source={require("../assets/images/d1.jpg")}
            style={styles.photoButton}
          />
          <Text style={styles.DocName}>
            DR.{doctorData.fname + " " + doctorData.lname}
          </Text>

          <Text style={styles.Desc}>Diabetologists</Text>
          <Text style={styles.Desc}>BioNeu Hospital</Text>
        </View>

        <View style={styles.DescContainer}>
          <Text style={{ fontSize: 20 }}>Available Time</Text>
          <Text style={styles.input}>Appoinment Date and day</Text>

          <Text style={styles.input}>Status</Text>

          <Text style={styles.input}>Time</Text>

          <Text style={styles.input}>Clik here to make Appointment</Text>
        </View>
        <View style={styles.DescContainer}>
        {doctorData.a_date && doctorData.a_date.map((date, index) => (    
          <View key={index}>
            <Text style={{ fontSize: 20 ,paddingTop:20 }}>Available Time</Text> 
            <Text style={styles.input}>{date}</Text>
            <Text style={styles.input}>Status</Text>
            <Text style={styles.input}>{doctorData.a_time[index]}</Text>
            <View style={styles.input}>
              <TouchableOpacity style={styles.button} onPress={handleBookNowPress}>
                <Text style={styles.buttonText}>Book Now </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      </View>

      {/* card */}
    <View>
    {showCardField && (
              <View style={styles.stickyCardContainer}>

      <CardField
        postalCodeEnabled={false}
        placeholders={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={(cardDetails) => {
          console.log('cardDetails', cardDetails);
        }}
        onFocus={(focusedField) => {
          console.log('focusField', focusedField);
        }}
      />
      <Button onPress={handlePayPress} title="Pay" disabled={loading} />
      </View>
    )}
    </View>
      {/*  */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  HeadContainer: {
    marginBottom: 25,
    backgroundColor: "#1D11AD",
    width: "100%",
    padding: 10,
    borderRadius: 0,
  },
  DocName: {
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 15,
    marginLeft: 32,
    color: "#fff",
  },
  Desc: {
    color: "gray",
    fontSize: 15,
    marginLeft: 32,
  },

  photoButton: {
    backgroundColor: "#eee",
    height: 180,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 60,
    marginBottom: 5,
    marginRight: 0,
    padding: 10,
  },
  photoText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#aaa",
  },
  photo: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  DescContainer: {
    padding: 20,
    // marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    // borderRadius: 5,
    padding: 10,
    backgroundColor: "#F9F5EB",
    // marginBottom: 20,
    color: "gray",
  },

  button: {
    backgroundColor: "#3498db",
    height: 30,
    width: 100,
    // marginLeft: 100,
    borderRadius: 10,
    marginRight: "auto",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 16,
    marginTop: 3,
  },
  stickyCardContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  cardField: {
    height: 50,
  },
});

export default ProfileDoc;
