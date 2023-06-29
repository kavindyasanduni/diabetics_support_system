import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import BASE_URL from "../config";
import { TextInput } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";

const ReservationCancel = (props) => {
  const { userId } = props.route.params;
  console.log(userId); //patient id fro getting data
  
  const [reservations, setReservations] = useState([]);
  const [confirmCancellation, setConfirmCancellation] = useState(false);
  const [showBankDetailsForm, setShowBankDetailsForm] = useState(false);
  const [accountHolderName, setAccountHolderName] = useState("");
  const [bank, setBank] = useState("sampath");
  const [accountNumber, setAccountNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [saveData , setSaveData] = useState(false);

  const [rid , setRid] = useState("");

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getReservationsById/${userId}`);
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
            // cancelReservation(reservationId);
            setRid(reservationId);
            setShowBankDetailsForm(true);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const cancelReservation = async () => {
    console.log(`Cancelled reservation with ID: ${rid}`);
    try {
        const response = await axios.put(`${BASE_URL}/updateReservation/${rid}`,{
            isremove : isRemove
        });

        //update the bank details
        const response2 = await axios.delete(`${BASE_URL}/deleteReservation`, {
          data: {
            id: rid,
            account_holder_name: accountHolderName,
            bank: bank,
            account_number: accountNumber,
            mobile_number: mobileNumber,
            customer_name: "",
            booking_date: "",
          },
        });

        console.log('Data successfully updated');
        if(response2){
        console.log('Data successfully added to the refund details table'); 

        }
        alert("Reservation cancel request has been sent");
        fetchData();
        setShowBankDetailsForm(false);
        // setDoctorData(response.data)
        // console.log('Data successfully fetched:', response.data);
      } catch (error) {
        console.log(error);
        alert('An error occurred while updating the data. Please try again later.');
      }
 
    
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {!showBankDetailsForm && (
        <ScrollView>
          <View style={styles.DescContainer}>
            {reservations.map((data, index) => (
              <View key={index}>
                <Text
                  style={{
                    fontSize: 20,
                    paddingBottom: 5,
                    paddingTop: 10,
                    color: "#2980b9",
                  }}
                >
                  Reservation
                </Text>
                <Text style={styles.input}>{data.date}</Text>
                <Text style={styles.input}>Status</Text>
                <Text style={styles.input}>{data.time}</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() =>  handleClick(data.r_id)}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      )}

      {/* bank details form */}

      {showBankDetailsForm && (
        <View style={styles.bankdetails_container}>
          <Text style={styles.bankdetails_header}>Bank Details</Text>
          <View style={styles.bankdetails_formContainer}>
            <Text style={styles.bankdetails_label}>Account Holder Name:</Text>
            <TextInput
              style={styles.bankdetails_input}
              placeholder="Enter account holder name"
              value={accountHolderName}
              onChangeText={setAccountHolderName}
            />

            <Text style={styles.bankdetails_label}>Bank:</Text>
            <Picker
              style={styles.bankdetails_input}
              selectedValue={bank}
              onValueChange={setBank}
            >
              <Picker.Item label="Sampath Bank" value="sampath" />
              <Picker.Item label="HSBC" value="hsbc" />
              <Picker.Item label="Bank of Ceylon" value="boc" />
              <Picker.Item label="NDB" value="ndb" />
            </Picker>

            <Text style={styles.bankdetails_label}>Account Number:</Text>
            <TextInput
              style={styles.bankdetails_input}
              placeholder="Enter account number"
              keyboardType="numeric"
              value={accountNumber}
              onChangeText={setAccountNumber}
            />

            <Text style={styles.bankdetails_label}>Mobile Number:</Text>
            <TextInput
              style={styles.bankdetails_input}
              placeholder="Enter mobile number"
              keyboardType="phone-pad"
              value={mobileNumber}
              onChangeText={setMobileNumber}
            />

            <Text style={styles.bankdetails_refundText}>
              Refunds will only be done for bookings made within a week. Other
              refund requests will be ignored.
            </Text>

            <TouchableOpacity
              style={styles.bankdetails_button}
              // onPress={saveData}
              onPress={() => 
                cancelReservation()
              
              
              }

            >
              <Text style={styles.bankdetails_buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
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
  buttonContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    // borderRadius: 5,
    padding: 10,
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
    paddingTop: 5,
  },

  bankdetails_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  bankdetails_header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
    color: "#2980b9",
    textAlign: "center",
  },
  bankdetails_formContainer: {
    width: "80%",
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
  },
  bankdetails_label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#2980b9",
  },
  bankdetails_input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    color: "gray",
    marginBottom: 20,
  },
  bankdetails_refundText: {
    fontSize: 14,
    color: "gray",
    marginTop: 10,
    marginBottom: 20,
  },
  bankdetails_button: {
    backgroundColor: "#c0392b",
    height: 32,
    width: "100%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  bankdetails_buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default ReservationCancel;
