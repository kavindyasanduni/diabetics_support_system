import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import DatePicker from 'react-native-datepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AvailableDateTime from './Component/AvailableDateTime ';
import axios from 'axios';

function AddDoctorData () {
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [nic  , setNic]  = useState('');
  const [availableDays, setAvailableDays] = useState('');
  const [availableTimes, setAvailableTimes] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');


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
    // console.log(date);

  const handleSave = () => {
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
    
      axios
        .post("http://192.168.8.100:8082/adddoctorinformation", {
          description : "",
          email : email,
          fname : fName,
          lname : lName,
          h_no:"",
          img_url : "",
          telephone :phoneNo, 
          a_date : date,
          a_time : availableTimes,

        })
        .then(function (response) {
          console.log("Successfully added to to databaseD" , response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

        axios
        .post("http://192.168.8.100:8082/api/users/adduser", {
          nic : nic,
          email : email,
          firstname : fName,
          lastname : lName,
          password : password,
          user_type : "Doctor", 
          

        })
        .then(function (response) {
          console.log("Successfully added to user databaseU" , response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
   
   
  };


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
      const daysArray = prevDays ? prevDays.split(', ') : [];
      daysArray.push(dateString);
      return daysArray.join(', ');
    });
    setAvailableTimes((prevTimes) => [...prevTimes, time]);

    setSelectedDate('');
    setSelectedTime('');
  }
};

  //to remove date and tiem
  const removeAvailableDateTime = (dateTime) => {
    const updatedTimes = availableTimes.filter((dt) => dt !== dateTime);
    setAvailableTimes(updatedTimes);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.input1}>Add New Doctor</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={fName}
        onChangeText={setFName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lName}
        onChangeText={setLName}
      />
      <TextInput
        style={styles.input}
        placeholder="User Name"
        value={userName}
        onChangeText={setUserName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone No"
        keyboardType="numeric"
        value={phoneNo}
        onChangeText={setPhoneNo}
      />
      <TextInput
        style={styles.input}
        placeholder="NIC"
        value={nic}
        onChangeText={setNic}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
  
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      <Text> Available Date and times</Text>
      <View style={styles.datePickerContainer}>
        <View >
        <TouchableOpacity style = {styles.buttonP} onPress={showDatePicker}>
          <Text >Select Date</Text>
        </TouchableOpacity>
        </View>
        <View  >
        <TouchableOpacity style = {styles.buttonP} onPress={showTimePicker}>
          <Text >Select Time</Text>
        </TouchableOpacity>
        </View>
        <View >
        {selectedDate && selectedTime && (
          <TouchableOpacity style={styles.buttonAddDate} onPress={addAvailableDateTime}>
            <Text >Add DateTime</Text>
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
      />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />
      <View style={{ alignItems: 'center', marginTop:5 }}>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // padding: 20,
    alignItems: 'center',
  },
  
  input: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 25,
    // padding: 13,
    paddingLeft:15,
    marginBottom: 10,
    width: 320,
    height: 40,
    // alignItems: 'center',
  },
    input1:{
        marginBottom:25,
        fontSize:18,
        fontWeight:'bold',
        paddingTop:50,

    },
     input2:{
        marginBottom:30,
        fontSize:18,
        fontWeight:'bold',

    },
  button: {
    backgroundColor: '#0E1879',
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    // justifyContent: 'center',
    width:150,
    // marginLeft:150,
    
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonP: {
    borderWidth: 2,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 25,
    width: 120, // Adjust the width as needed
    alignItems: 'center',
  },
  buttonAddDate: {
    marginTop: 30,
    borderWidth: 2,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
  },

});

export default AddDoctorData;
