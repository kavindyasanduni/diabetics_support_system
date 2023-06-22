import React, { useState , useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AvailableDateTime from './Component/AvailableDateTime ';


function UpdateNutritionistDetails() {
 
  const [doctorData, setDoctorData] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentDates, setAppointmentDates] = useState([]);
  const [appointmentTimes, setAppointmentTimes] = useState([]);

  const [availableDays, setAvailableDays] = useState('');
  const [availableTimes, setAvailableTimes] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleChoosePhoto = () => {
    // handle choose photo logic here
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.8.100:8082/getallnutritionist');
      if (response.data) {
        setDoctorData(response.data);
      }
      console.log(response.data);
      console.log('Data successfully fetched');
    } catch (error) {
      console.log(error);
      alert('An error occurred while fetching the data. Please try again later.');
    }
  };

  const handleDoctorChange = (doctorId) => {
    setSelectedDoctor(doctorId);
  
    // Find the selected doctor object
    const selectedDoctorObj = doctorData.find((doctor) => doctor.nid === doctorId);
    if (selectedDoctorObj) {
      setAppointmentDates(selectedDoctorObj.a_date);
      setAppointmentTimes(selectedDoctorObj.a_time);
    }
  };



  //dat and time picker
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

//date and time picker functionality
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


    //save data back to database
    const date = availableDays.split(",");
    const handleSave = async () => {
      console.log(selectedDoctor);
      try {
        const response = await axios.put(`http://192.168.8.101:8082/updateNutritionist/${selectedDoctor}`, {
          // did: selectedDoctor,
          a_date: date,
          a_time: appointmentTimes,
        })
    
        .then(function (response) {
          console.log("Successfully added to user databaseU" , response.data);
        })
        
      } catch (error) {
        console.log(error);
        alert('An error occurred while updating the data. Please try again later.');
      }
    };

  return (
    <View style={styles.container}>
      <Text style={styles.input1}>Update Nutritionist</Text>

      <Picker
        selectedValue={selectedDoctor}
        onValueChange={(value) => handleDoctorChange(value)}
      >
        <Picker.Item label="Select Nutritionist" value="" />
        {doctorData.map((doctor) => (
          <Picker.Item
            key={doctor.nid}
            label={`${doctor.fname} ${doctor.lname}`}
            value={doctor.did}
          />
        ))}
      </Picker>

      <TextInput style={styles.label} placeholder="User Name">
        Appointment Dates:
      </TextInput>
      {appointmentDates.map((date, index) => (
        <Text key={index}>{date}</Text>
      ))}

      <Text style={styles.label}>Add new Date and times</Text>
      {appointmentTimes.map((time, index) => (
        <Text key={index}>{time}</Text>
      ))}

      <Text style={styles.label}>Add new Date and times</Text>
      <View style={styles.datePickerContainer}>
        <View>
          <TouchableOpacity style={styles.buttonP} onPress={showDatePicker}>
            <Text>Select Date</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.buttonP} onPress={showTimePicker}>
            <Text>Select Time</Text>
          </TouchableOpacity>
        </View>
        <View>
          {selectedDate && selectedTime && (
            <TouchableOpacity
              style={styles.buttonAddDate}
              onPress={addAvailableDateTime}
            >
              <Text>Add DateTime</Text>
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

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 25,
    // padding: 13,
    paddingLeft: 15,
    marginBottom: 10,
    width: 300,
    height: 40,
  },
  label: {
    margin: 20,
  },
  input1: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
    //alignContent:"center"
    marginLeft: 100,
    marginTop: 50,
  },
  button: {
    backgroundColor: "#0E1879",
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    marginLeft: 100,
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
    borderRadius: 25,
    width: 120,
    alignItems: "center",
    backgroundColor: "#30A2FF",
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
    backgroundColor: "#30A2FF",
    marginLeft: 1,
  },
});
export default UpdateNutritionistDetails;