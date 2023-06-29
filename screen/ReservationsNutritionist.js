import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { View ,Text , ScrollView , StyleSheet ,TouchableOpacity ,Alert } from "react-native";
// import axios from "axios";
import BASE_URL from "../config";

const ReservationNutritionist = (props) => {
  const { userId } = props.route.params;
  console.log(userId);
    const [reservations , setReservations] = useState([]);

    useEffect(() => {
        fetchData();
        
      }, []);

      
      const fetchData = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/getReservationsByRole/${userId}/nutritionists`);
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
            const response = await axios.put(`${BASE_URL}/updateReservation/${reservationId}`,{
                isremove : isRemove
            });
            console.log('Data successfully updated');
            fetchData();
            // setDoctorData(response.data)
            // console.log('Data successfully fetched:', response.data);
          } catch (error) {
            console.log(error);
            alert('An error occurred while updating the data. Please try again later.');
          }
      };
//to show current and old reservation
      const currentDate = new Date();
      const formattedDate = `${currentDate.getDate()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getFullYear()}`;
      console.log(formattedDate);
    
      //to show past and future reservation
      const [showPastReservations, setShowPastReservations] = useState(false);
      const [showNowReservations, setShowNowReservations] = useState(true);
    
      const handlePastReservations = () => {
        setShowPastReservations(true);
        setShowNowReservations(false);
      };
    
      const handleNowReservations = () => {
        setShowPastReservations(false);
        setShowNowReservations(true);
      };

    return (
        <View style = {{flex : 1}}>
             <View
                style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 50,
                }}
            >
                <TouchableOpacity
                style={[
                    styles.filterButton,
                    showPastReservations && styles.activeButton,
                ]}
                onPress={handlePastReservations}
                >
                <Text style={styles.buttonTextHeader}>Past</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={[
                    styles.filterButton,
                    showNowReservations && styles.activeButton,
                ]}
                onPress={handleNowReservations}
                >
                <Text style={styles.buttonTextHeader}>Now</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
            
            <View style={{marginTop:50, backgroundColor: "#fff"}}>
            <View style={styles.DescContainer}>
                <Text style={{ fontSize: 20  ,color:"#2c3e50" , paddingBottom:5}}>Available Reservation</Text>
                <Text style={styles.input}>Appointment Date and time</Text>
                <Text style={styles.input}>Patient Name</Text>
                <Text style={styles.input}>Mobile Number</Text>
                <Text style={styles.input}>Click here to see reports</Text>
                </View>
                </View>
                <View style={styles.DescContainer}>
                    {reservations.map((data, index) => { 
                       const reservationDateParts = data.date.split("-");
                       const reservationDate = new Date(
                       parseInt(reservationDateParts[2]),
                       parseInt(reservationDateParts[1]) - 1,
                       parseInt(reservationDateParts[0])
                       );
                       const isPastReservation = reservationDate < currentDate;
                       if (
                       (isPastReservation && showPastReservations) ||
                       (!isPastReservation && showNowReservations)
                       ) {  
                        return (  
                    <View key={index}>
                        <Text style={{ fontSize: 20 ,paddingBottom:5,paddingTop:10,color:"#2c3e50" }}>Reservation</Text> 
                        <Text style={styles.input}>{data.date + " - " + data.time}</Text>
                        <Text style={styles.input}>{data.p_name}</Text>
                        <Text style={styles.input}>{data.phone_no}</Text>

                        <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}
                        onPress={() => props.navigation.navigate("ViewReportsNutritionist", {id , p_id: data.p_id})}
                            
                            >See Reports</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                        );
                       }
                    })}
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
    //   borderRadius: 8,
    
      // marginTop: 50,
    },
    input: {
      borderWidth: 1,
      borderColor: "#ddd",
      // borderRadius: 5,
      padding: 10,
      // backgroundColor: "#F9F5EB",
      // marginBottom: 20,
      color: "gray",
    },
    buttonContainer :{
      borderWidth: 1,
      borderColor: "#ddd",
      // borderRadius: 5,
      padding: 10,
      color: "gray",
    },
  
    button: {
      backgroundColor: "#3498db",
      height: 30,
      width: 111,
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
    filterButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: 5,
        // backgroundColor: '#e0e0e0',
        // borderRadius: 5,
      },
    
      activeButton: {
        borderBottomWidth: 2,
        borderBottomColor: "#2c3e50",
      },
    
      buttonTextHeader: {
        fontSize: 16,
        color: "#2c3e50",
      },
  });

export default ReservationNutritionist ;