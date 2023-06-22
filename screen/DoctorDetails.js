import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import DatePicker from "react-native-datepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AvailableDateTime from "./Component/AvailableDateTime ";
import axios from "axios";
//import { Formik } from "formik";
//import * as yup from "yup";
import { ScrollView } from "react-native-gesture-handler";
import BASE_URL from "../config";

function AddDoctorData() {
  //add values
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [nic, setNic] = useState("");
  const [availableDays, setAvailableDays] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [Description, setDescription] = useState("");

  //set errors
  const [fNameError, setFNameError] = useState("");
  const [lNameError, setLNameError] = useState("");
  const [phoneNoError, setPhoneNoError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nicError, setNicError] = useState("");
  const [DescriptionError, setDescriptionError] = useState("");



  const handleValidation = () => {
    let isValid = true;

    // Validate fName (first name)
    if (fName.trim() === "") {
      setFNameError("*First name is required");
      isValid = false;
    } else {
      setFNameError("");
    }
    //Validate lname
    if (lName.trim() === "") {
      setLNameError("*Last name is required");
      isValid = false;
    } else {
      setFNameError("");
    }
    // Validate phoneNo (phone number)
    if (phoneNo.trim() === "") {
      setPhoneNoError("*Phone number is required");
      isValid = false;
    } else if (phoneNo.trim().length !== 10) {
      setPhoneNoError("*Phone number should be 10 digits");
      isValid = false;
    } else {
      setPhoneNoError("");
    }
    //Validate userName
    if (userName.trim() === "") {
      setUserNameError("*User Name is required");
      isValid = false;
    } else {
      setUserNameError("");
    }
    // Validate email
    if (email.trim() === "") {
      setEmailError("*Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email.trim())) {
      setEmailError("*Invalid email");
      isValid = false;
    } else {
      setEmailError("");
    }
    //Validate NIC
    if (nic.trim() === "") {
      setNicError("*NIC No is required");
      isValid = false;
    } else {
      setNicError("");
    }
    // validate Description 
    if (Description.trim() === "") {
    setDescriptionError("*Description is required");
    isValid = false;
    } else {
      setDescriptionError("");
    }

    //password
    if (password.trim() === "") {
      setPasswordError("*Password is required");
      isValid = false;
    } else if (
      password.trim().length < 8 ||
      !/[A-Za-z]/.test(password.trim()) ||
      !/[0-9]/.test(password.trim())
    ) {
      setPasswordError(
        "Password should be at least 8 characters long, contain an English letter, and a number"
      );
      isValid = false;
    } else {
      setPasswordError("");
    }
    return isValid;

    


  };

  // console.log(selectedDate);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (time) => {
    setSelectedTime(time);
    hideTimePicker();
  };

  const date = availableDays.split(","); //to get date ass array
   

  const handleSave = () => {
   console.log("");
    if (handleValidation()) {

      
      // All values passed validation, proceed with the desired action
     axios
       .post(`${BASE_URL}/adddoctorinformation`, {
         description: "",
         email: email,
         fname: fName,
         lname: lName,
         h_no: "",
         img_url: "",
         telephone: phoneNo,
         a_date: date,
         a_time: availableTimes,
       })
       .then(function (response) {
         console.log("Successfully added to to databaseD", response.data);
       })
       .catch(function (error) {
         console.log(error);
       });

     axios
       .post(`${BASE_URL}/api/users/adduser`, {
         nic: nic,
         email: email,
         firstname: fName,
         lastname: lName,
         password: password,
         user_type: "Doctor",
       })
       .then(function (response) {
         console.log("Successfully added to user databaseU", response.data);
       })
       .catch(function (error) {
         console.log(error);
       });
    } else {
      // Handle the validation errors, e.g., show an error message
      console.log("Validation failed. Please check the form for errors.");
    }

  }
  
  // // Save the data to the database with the selected date and times
  // const data = {
  //   name,
  //   phoneNo,
  //   email,
  //   userName,
  //   password,
  //   availableDays,
  //   availableTimes,
  // };
  // // Send the data to the server or perform any required actions
  // console.log(data);
  // console.log(availableDays);
  // console.log(availableTimes);



  // const addAvailableDateTime = () => {
  //   if (selectedDate && selectedTime) {
  //     const date = new Date(selectedDate);
  //     const time = new Date(selectedTime);
  //     const dateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes());

  //     setAvailableTimes([...availableTimes, dateTime]);
  //     setSelectedDate('');
  //     setSelectedTime('');
  //   }
  // };

  //to get dates and times seperatly
  // const addAvailableDateTime = () => {
  //   if (selectedDate && selectedTime) {
  //     const date = new Date(selectedDate);
  //     const time = new Date(selectedTime);
  //     const formattedDate = date.toISOString().split('T')[0]; // Get the date in YYYY-MM-DD format
  //     const formattedTime = time.toISOString().split('T')[1].slice(0, 5); // Get the time in HH:mm format

  //     setAvailableDays(formattedDate); // Store the selected date
  //     setAvailableTimes([...availableTimes, formattedTime]); // Store the selected time
  //     setSelectedDate('');
  //     setSelectedTime('');
  //   }
  // };

  // const addAvailableDateTime = () => {
  //   if (selectedDate && selectedTime) {
  //     const date = new Date(selectedDate);
  //     const time = selectedTime.toLocaleTimeString().slice(0, 5);
  //     const dateString = date.toISOString().slice(0, 10);

  //     setAvailableDays((prevDays) => prevDays ? prevDays + ', ' + dateString : dateString);
  //     setAvailableTimes((prevTimes) => [...prevTimes, time]);

  //     setSelectedDate('');
  //     setSelectedTime('');
  //   }
  // };

  const addAvailableDateTime = () => {
    if (selectedDate && selectedTime) {
      const date = new Date(selectedDate);
      const time = selectedTime.toLocaleTimeString().slice(0, 5);
      const dateString = date.toISOString().slice(0, 10);

      setAvailableDays((prevDays) => {
        const daysArray = prevDays ? prevDays.split(", ") : [];
        daysArray.push(dateString);
        return daysArray.join(", ");
      });
      setAvailableTimes((prevTimes) => [...prevTimes, time]);

      setSelectedDate("");
      setSelectedTime("");
    }
  };
   //to remove date and time
  const removeAvailableDateTime = (dateTime) => {
    const updatedTimes = availableTimes.filter((dt) => dt !== dateTime);
    setAvailableTimes(updatedTimes);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.input1}>Add New Doctor</Text>
      <ScrollView>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={fName}
          onChangeText={setFName}
        />
        {fNameError ? <Text style={styles.error}>{fNameError}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lName}
          onChangeText={setLName}
        />
        {lNameError ? <Text style={styles.error}>{lNameError}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="User Name"
          value={userName}
          onChangeText={setUserName}
        />
        {userNameError ? (
          <Text style={styles.error}>{userNameError}</Text>
        ) : null}
        <TextInput
          style={styles.input}
          placeholder="Phone No"
          keyboardType="numeric"
          value={phoneNo}
          onChangeText={setPhoneNo}
        />
        {phoneNoError ? <Text style={styles.error}>{phoneNoError}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="NIC"
          value={nic}
          onChangeText={setNic}
        />
        {nicError ? <Text style={styles.error}>{nicError}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          textAlignVertical="center"
        />
        {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
        {passwordError ? (<Text style={styles.error}>{passwordError}</Text>) : null}

        <TextInput
          style={styles.input}
          placeholder="Description"
          value={Description}
          onChangeText={setDescription}
        />
        {DescriptionError ? (<Text style={styles.error}>{DescriptionError}</Text>) : null}

        <TextInput style={styles.input3} value="Available Date and times" />
        <View style={styles.datePickerContainer}>
          <View>
            <TouchableOpacity style={styles.buttonP} onPress={showDatePicker}>
              <Text style={styles.buttonText}>Select Date</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.buttonP} onPress={showTimePicker}>
              <Text style={styles.buttonText}>Select Time</Text>
            </TouchableOpacity>
          </View>
          <View>
            {selectedDate && selectedTime && (
              <TouchableOpacity
                style={styles.buttonAddDate}
                onPress={addAvailableDateTime}
              >
                <Text style={{ color: "#fff" }}>Add DateTime</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.selectedDateTimeContainer}>
          {availableTimes.map((dateTime, index) => (
            <AvailableDateTime
              key={index}
              dateTime={dateTime}
              onRemove={() => removeAvailableDateTime(dateTime)}
            />
          ))}
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
          minimumDate={new Date()}
        />
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={hideTimePicker}
        />
        <View style={{ alignItems: "center", marginTop: 5 }}>
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
  };
  
  
      


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    alignItems: "center",
  },
  input: {
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 25,
    // padding: 13,
    paddingLeft: 15,
    marginBottom: 10,
    width: 320,
    height: 40,
    // alignItems: 'center',
  },

  input3: {
    //borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 25,
    padding: 13,
    paddingLeft: 15,
    marginBottom: 10,
    width: 190,
    height: 40,
    alignItems: "center",
    fontWeight: "bold",
    color: "#000",
    marginLeft: 50,
    marginTop:50,
  },

  input1: {
    marginBottom: 25,
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 50,
  },
  input2: {
    marginBottom: 30,
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#0E1879",
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    // justifyContent: 'center',
    width: 150,
    // marginLeft:150,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  datePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonP: {
    borderWidth: 2,
    borderColor: "#ecf0f1",
    padding: 10,
    marginLeft: 8,
    borderRadius: 25,
    width: 110, // Adjust the width as needed
    alignItems: "center",
    backgroundColor: "#3498db",
  },
  buttonAddDate: {
    //marginTop: 30,
    borderWidth: 2,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    height: 40,
    borderColor: "#ecf0f1",
    backgroundColor: "#3498db",
    marginLeft: 10,
  },
  buttonText: {
    color: "#fff",
  },

  error: { color: "red", marginBottom: 20, textAlign: "left" },
});

  


export default AddDoctorData;
