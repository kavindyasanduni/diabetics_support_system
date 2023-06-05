import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Picker,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import axios from "axios";
import EditContentModal from "./EditContentModal";
import { storage } from "../../firebaseconfig";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const DeleteContentFromKSC = () => {
  //for dropdown selection
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [selectedData, setSelectedData] = useState(null); //to edit purticualr data item
  // console.log(selectedOption);
  const [pogress, setPogress] = useState(0); //to get the upload pogress
  const [imgLinkForCheking, setImageLinkForCheking] = useState(null); //to CHECK if the image is same
  const [id, setId] = useState(null);
  console.log("id : " + id);

  const options = ["workouts", "diet plans", "news and reaserach"];
  let clickedSubmit;
  let catchedPhoto;
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    toggleDropdown();
  };

  //end for dropdown selection

  const fetchData = async () => {
    // console.log("called");
    try {
      const response = await axios.get(
        `http:///192.168.8.100:8082/getKInformationByCategory/${selectedOption}`
      );
      setTableData(response.data);
      console.log("Data captured: " + response.data);
    } catch (error) {
      console.log(error);
      alert(
        "An error occurred while fetching the data. Please try again later."
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedOption]);
  //get data to object
  const kInformation = tableData.map((data, index) => ({
    id: data.kid,
    title: data.title,
    description: data.description,
    imgLink: data.img_url,
    date: data.created_date,
  }));
  //to show spesific number of length
  const maxDescriptionLength = 10;

  // update the data

  const handleSave = async (newData) => {
    //if image is not changed and if changed
    console.log(newData.id);
    if (imgLinkForCheking == newData.imgLink) {
      console.log("same image");
      try {
        // Send the updated data to the backend API
        await axios.put(
          `http:///192.168.8.100:8082/updateKInformation/${newData.id}`,
          {
            title: newData.title,
            catergory: selectedOption,
            description: newData.description,
            img_url: newData.imgLink,
          }
        );
        console.log("Data updated");
        // Fetch the updated data from the backend API
        await fetchData();
        // Hide the edit modal
        setSelectedData(null);
      } catch (error) {
        console.log(error);
        alert(
          "An error occurred while updating the data. Please try again later."
        );
      }
    } else {
      const response = await fetch(newData.imgLink);
      const blob = await response.blob();

      const storageRef = ref(
        storage,
        `/images/${newData.imgLink.split("/").pop()}`
      ); //split is used only getting image link
      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setPogress(progress);
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            // send data to database when uploading finished
            axios
              .put(
                `http:///192.168.8.100:8082/updateKInformation/${newData.id}`,
                {
                  title: newData.title,
                  catergory: selectedOption,
                  description: newData.description,
                  img_url: downloadURL,
                }
              )
              .then(function (response) {
                console.log(
                  "Data successfully saved to database: ",
                  response.data
                );
                // Fetch the updated data from the backend API
                fetchData();
                // Hide the edit modal
                setSelectedData(null);
              })
              .catch(function (error) {
                console.log(error);
              });

            //end of upload function
          });
        }
      );
    }
    // console.log(newData.imgLink);
    // try {
    //   // Send the updated data to the backend API
    //   await axios.put(`http://192.168.8.100:8082/updateKInformation/${newData.id}`, newData);
    //   // Fetch the updated data from the backend API
    //   await fetchData();
    //   // Hide the edit modal
    //   setSelectedData(null);
    // } catch (error) {
    //   console.log(error);
    //   alert('An error occurred while updating the data. Please try again later.');
    // }
  };

  // end of update data code
  // hide the modal
  const handleCancel = () => {
    setSelectedData(null); // or any other code to close the modal
  };
  // end of hide the modal

  const handleDelete = async () => {
    try {
      // Delete data to the backend API
      await axios.delete(
        `http:///192.168.8.100:8082/deleteKInformationById/${id}`
      );
      console.log("Data Deleted Successfully");
      // Fetch the updated data from the backend API
      await fetchData();
      // Hide the edit modal
      setSelectedData(null);
    } catch (error) {
      console.log(error);
      alert(
        "An error occurred while updating the data. Please try again later."
      );
    }
  };


  return (
    <View>
      <View style={styles.container}>
        {/* select catergory */}

        <View style={styles.description}>
          <TouchableOpacity
            onPress={toggleDropdown}
            style={styles.dropdownButton}
          >
            <Text style={styles.dropdownButtonText}>
              {selectedOption || "Select an option"}
            </Text>
          </TouchableOpacity>
          <Modal visible={dropdownVisible} animationType="slide">
            <View style={styles.dropdownModal}>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => selectOption(option)}
                  style={styles.dropdownItem}
                >
                  <Text style={styles.dropdownItemText}>{option}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                onPress={toggleDropdown}
                style={styles.dropdownItem}
              >
                <Text style={styles.dropdownItemText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
        {/* <View style={styles.submitButtonCOntainer}>
          <View>
            <TouchableOpacity
              style={styles.button_s}
              onPress={() => {
                fetchData();
              }}
            >
              <Text style={styles.text}>Show data</Text>
            </TouchableOpacity>
          </View>
        </View> */}

        <View style={styles.aroundTable}>
          {/* <ScrollView> */}
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Id</Text>
              <Text style={styles.tableHeaderText}>Title</Text>
              <Text style={styles.tableHeaderText}>Description</Text>
              <Text style={styles.tableHeaderText}>Option</Text>
            </View>
            {/* Render table data here */}
            <View style={styles.tableData}>
              <ScrollView>
                {kInformation.map((item, index) => (
                  <View style={styles.tableRow} key={index}>
                    <Text style={styles.tableCell}>
                      {item.title.slice(0, maxDescriptionLength)}
                    </Text>
                    <Text style={styles.tableCell}>
                      {item.description.slice(0, maxDescriptionLength)}
                    </Text>
                    <Text style={styles.tableCell}>{item.date}</Text>
                    {/* <TouchableOpacity  onPress={setSelectedData(item)}> */}
                    <Text style={styles.tableCell}>
                    
                    <TouchableOpacity
                    onPress={() => {
                      
                      setSelectedData(item);
                      setImageLinkForCheking(item.imgLink);
                      setId(item.id);
                    }}
                      style={styles.editButton}
                    >
                      {/* <TouchableOpacity> */}
                      <Text style={styles.editButtonText}>Edit</Text>
                    </TouchableOpacity>
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
          {/* </ScrollView> */}
        </View>
      </View>

      {/* TO VIEW THE MODAL...BEFOR OPEN THE MODAL CHECK selectedData IS NULL OR NOT */}
      {selectedData && (
        <EditContentModal
          visible={Boolean(selectedData)}
          data={selectedData}
          onSave={handleSave}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
       )}
    </View>
  );
};

const styles = StyleSheet.create({
  description: {
    alignItems: "center",
    marginTop: 30,

    borderColor: "red",
  },
  //styles for drop down
  dropdownButton: {
    backgroundColor: "#fff",
    width: 250,
    padding: 10,
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 10,
  },
  dropdownButtonText: {
    color: "#333",
    fontSize: 12,

    alignItems: "center",
  },
  dropdownModal: {
    backgroundColor: "#fff",
    margin: 20,
    marginTop: 200,
    // alignItems:'center',
    borderRadius: 10,
    padding: 10,
    maxHeight: 200,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#be2edd",
  },
  //end of select catergory dropdown

  //styles for table
  aroundTable: {
    // flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#FFF",
    marginTop: 50,
    width: 375,
    height: 550,
    marginLeft: 10,
    // marginRight:10,
    paddingLeft: 20,
    paddingRight: 20,
    // paddingTop:5,
    paddingBottom: 5,
    // padding:15,
    borderRadius: 5,
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
  tableContainer: {
    // marginTop:50,
    marginTop: 20,

    flex: 1,
    // paddingVertical: 8,
  },
  tableHeader: {
    // width:96,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 5,
    backgroundColor: "white",
  },
  tableHeaderText: {
    width: 96,
    // flex: 1,
    fontWeight: "bold",
    paddingVertical: 2,
  },
  tableRow: {
    flexDirection: "row",
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  tableCell: {
    // flex: 1,
    width: 100,
    paddingVertical: 5,
    // paddingHorizontal:5,
    // paddingRight:10,
  },

  tableData: {
    flex: 1,
    paddingVertical: 8,
  },
  //end of table styles

  //show data button styles
  submitButtonCOntainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    left: 85,
    marginTop: 20,
    width: 200,
  },
  button_s: {
    backgroundColor: "#1D11AD",
    padding: 5,
    borderRadius: 18,
    alignItems: "center",
    width: 110,
    height: 32,
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
  //end of button styles

  //edit button styles
  // editButton: {
  //   // width:30,
  //   backgroundColor: '#007AFF',
  //   borderRadius: 3,
  //   padding: 2,
  //   margin: 2,
  //   alignItems: 'center',
  // },
  editButtonText: {
    color: "#007AFF",
    fontWeight: "bold",
  },
  //end of edit button
});

export default DeleteContentFromKSC;
