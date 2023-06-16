import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { View ,Text , ScrollView , StyleSheet ,TouchableOpacity ,Alert } from "react-native";
// import axios from "axios";

const ReservationCancel= () => {
    const id = 1;
    const [reservations , setReservations] = useState([]);

    useEffect(() => {
        fetchData();
        
      }, []);

      
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://192.168.8.100:8082/getReservationsById/${id}`);
          if (response.data) {
            setReservations(response.data);
          }
          console.log(response.data);
          console.log('Data successfully fetched');
          // setDoctorData(response.data)
          // console.log('Data successfully fetched:', response.data);
        } catch (error) {
          console.log(error);
          alert('An error occurred while fetching the data. Please try again later.');
        }
      };

      //to delete
      const isRemove =  'yes';
      const handleClick = (reservationId) => {
        Alert.alert(
          'Confirmation',
          'Are you sure you want to cancel this reservation?',
          [
            {
              text: 'No',
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: () => {
                // Call your cancel reservation function here
                cancelReservation(reservationId);
              },
            },
          ],
          { cancelable: false }
        );
      };
    
      const cancelReservation = async (reservationId) => {
        // Perform cancel reservation logic here
        console.log(`Cancelled reservation with ID: ${reservationId}`);
        try {
            const response = await axios.put(`http://192.168.8.100:8082/updateReservation/${reservationId}`,{
                isremove : isRemove
            });
            console.log('Data successfully updated');
            // setDoctorData(response.data)
            // console.log('Data successfully fetched:', response.data);
          } catch (error) {
            console.log(error);
            alert('An error occurred while updating the data. Please try again later.');
          }
      };



    return (
        <View>
            <ScrollView>
            <View style ={{  marginTop : 30}}>
            <Text>
               Your reservations
            </Text>
            </View>

            <View style={styles.DescContainer}>
                <Text style={{ fontSize: 20 }}>Reservation</Text>
                <Text style={styles.input}>Appointment Date</Text>

                <Text style={styles.input}>Status</Text>

                <Text style={styles.input}>Time</Text>

                <Text style={styles.input}>Click here to cancel Appointment</Text>
                </View>

                <View style={styles.DescContainer}>
                    {reservations.map((data, index) => (    
                    <View key={index}>
                        <Text style={{ fontSize: 20 ,paddingTop:20 }}>Reservation</Text> 
                        <Text style={styles.input}>{data.date}</Text>
                        <Text style={styles.input}>Status</Text>
                        <Text style={styles.input}>{data.time}</Text>
                        <View style={styles.input}>
                        <TouchableOpacity style={styles.button} onPress={() => handleClick(data.r_id)}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                    ))}
                </View>
            </ScrollView>
                
        </View>
    );
} 
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
      backgroundColor: "#c0392b",
      height: 32,
      width: 100,
      // marginLeft: 100,
      borderRadius: 20,
      marginRight: "auto",
      alignItems: "center",
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 15,
    //   marginLeft: 16,
    //   marginTop: 3,
    paddingTop : 5,
    
    },
  });

export default ReservationCancel;