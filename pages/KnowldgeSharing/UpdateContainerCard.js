import React, { useState, useEffect, useRef } from "react";

import {
  Button,
  View,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

// importing firebase modules
import { storage } from "../../firebaseconfig";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { async } from "@firebase/util";

const UpdateContainerCard = (props) => {
  const [image, setImage] = useState(null);
  const [viewBeforeUpload, setViewBeforeUpload] = useState(null);

  const [text, setText] = useState(""); //for description
  const [title, setTitle] = useState(""); // for title

  const [pogress, setPogress] = useState(0); //to get the upload pogress

  const [loading, setLoading] = useState(true); //to get the upload pogress
  //for dropdown selection
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);


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

  useEffect(() => {
    const requestPermission = async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Permission denied!");
        }
      }
    };

    requestPermission();
  }, []);
  let result;
  const PickImage = async () => {
    result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
    }
  };

  /////////////////////////////////////////////////////////////

  useEffect(() => {
    console.log(text);
    // setText(text);
    console.log(title);
  }, [text, title]);

  //end of sending data to database
  // let imageLink;

  const handleImageSubmit = async () => {
    // clickedSubmit = true;

    const response = await fetch(result.uri);
    const blob = await response.blob();

    const storageRef = ref(storage, `/images/${result.uri.split("/").pop()}`); //split is used only getting image link
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
          // setImage(downloadURL);
          // imageLink = downloadURL;

          //send data to database when uploading finished
          axios
            .post("http://10.10.21.73:8082/addKInformation", {
              title: title,
              catergory: selectedOption,
              description: text,
              img_url: downloadURL,
            })
            .then(function (response) {
              console.log(
                "Data successfully saved to database: ",
                response.data
              );
            })
            .catch(function (error) {
              console.log(error);
            });
          // setLoading(false);

          //end of upload function
        });
      }
    );
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.modelHeader}>{props.modelHeader}</Text>
          </View>
        </View>
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

        <View style={styles.description}>
          <TextInput
            style={{
              height: 40,
              width: 250,
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 10,
              paddingLeft: 20,
            }}
            onChangeText={setTitle}
            value={title}
            placeholder="Content title"
          />
        </View>

        <View style={styles.description}>
          <TextInput
            style={{
              height: 80,
              width: 250,
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 10,
              padding: 20,
            }}
            onChangeText={setText}
            value={text}
            placeholder="Description"
          />
        </View>
        <View style={styles.addPhotoCntainer}>
          <View>
            <Text style={styles.addPhoto}>{props.text}</Text>
          </View>
          <View>
            <View style={styles.button_view}>
              <TouchableOpacity style={styles.button} onPress={PickImage}>
                {/* <ButtonD title ="Update Knowledge Sharing center"  navigation="knowladgesharingdashbord" /> */}
                <Text style={styles.buttonText}>Choose Image</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.imgViewing}>
          {viewBeforeUpload && (
            <Image
              source={{ uri: viewBeforeUpload }}
              style={{
                width: 250,
                height: 150,
              }}
            />
          )}
        </View>
        <View style={styles.submitButtonCOntainer}>
          <View>
            <TouchableOpacity
              style={styles.button_s}
              onPress={() => {
                handleImageSubmit();
              }}
            >
              <Text style={styles.text}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default UpdateContainerCard;
const styles = StyleSheet.create({
  aroundContainer: {
    marginTop: 30,
  },
  aroundContainerSecond: {
    marginTop: 100,
  },
  container: {
    justifyContent: "center",
    backgroundColor: "#FFF",
    // marginTop: 10,
    width: 300,
    height: 612,
    left: 49,
    borderRadius: 32,
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
  modelHeader: {
    color: "#1D11AD",
    fontWeight: "bold",
  },
  headerContainer: {
    alignItems: "center",
    padding: 10,
    marginTop: 10,
  },
  description: {
    alignItems: "center",
    marginTop: 30,

    borderColor: "red",
  },
  addPhotoCntainer: {
    flexDirection: "row",
    marginTop: 20,
    padding: 10,

    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 15,
    marginRight: 15,
  },
  submitButtonCOntainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    left: 115,
    marginTop: 20,
    width: 200,
  },
  addPhoto: {
    color: "#1D11AD",
  },
  //css for choose phot
  button: {
    backgroundColor: "#be2edd",
    width: 135,
    height: 30,
    borderRadius: 25,
  },
  buttonText: {
    justifyContent: "center",
    textAlign: "center",
    color: "#FFF",

    padding: 5,
  },

  //button submit
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

  //styles for drop down
  dropdownButton: {
    backgroundColor: "#f2f2f2",
    width: 250,
    padding: 10,
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

  //img viewing
  imgViewing: {
    marginTop: 30,
    alignItems: "center",
  },
});
