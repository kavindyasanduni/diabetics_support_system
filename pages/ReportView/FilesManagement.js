import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { storage } from "../../firebaseconfig";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import axios from "axios";
import BASE_URL from "../../config";
import { AntDesign } from '@expo/vector-icons';

const FileManagement = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [reportLink , setReportLink] = useState(null);

  const {typeOfUser , id , pid } = props.route.params;

  const handleUploadFiles = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (res.type === "success") {
        setSelectedFile(res);
      } else {
        console.log("User canceled the file picker.");
      }
    } catch (err) {
      console.log("Error picking the file:", err);
    }
  };

  const handleSaveFile = async () => {
    if (selectedFile) {
      const { uri, name } = selectedFile;

      Alert.alert(
        "Confirmation",
        "Are you sure you want to save the file?",
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => {
              console.log("File upload cancelled.");
            },
          },
          {
            text: "Save",
            onPress: async () => {
              if (typeOfUser == "doctor"){
                try {
                  const response = await uploadFile(uri, name);
                  console.log("File uploaded:", response);
                  setReportLink(response);
                  setSelectedFile(null);

                  try {
                    const updateDatabase = await axios.post(`${BASE_URL}/addNewReport`, {
                      description : "",
                      type :"",
                      pid: pid,
                      did : id,
                      nid : "",
                      reportlink : reportLink,
                      // type:typeOfUser,
                    });
                    alert("File uploaded successfully");

                  } catch (error) {
                    console.log("ERROR OCCURS WHILE SAVING", error);
                  }

                } catch (error) {
                  console.log("Error uploading the file:", error);
                }
              } else if (typeOfUser == "nutritionist"){
                try {
                  const response = await uploadFile(uri, name);
                  console.log("File uploaded:", response);
                  setReportLink(response);
                  setSelectedFile(null);

                  try {
                    const updateDatabase = await axios.post(`${BASE_URL}/addNewReport`, {
                      description : "",
                      type :"",
                      pid: pid,
                      did : "",
                      nid : id,
                      reportlink : reportLink,
                      // type:typeOfUser,

                    });
                    alert("File uploaded successfully");
                    props.navigation.navigate('ProfileDoc')
                  } catch (error) {
                    console.log("ERROR OCCURS WHILE SAVING", error);
                  }

                } catch (error) {
                  console.log("Error uploading the file:", error);
                }
              }
            },
          },
        ]
      );
    }
  };

  const uploadFile = async (uri, fileName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, "Patient documents/" + fileName);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.uploadButton} onPress={handleUploadFiles}>
        <Text style={styles.buttonTextU}>Upload files</Text>
        <View style={styles.iconContainer}>
          <AntDesign name="upload" size={35} color="black" />
        </View>
      </TouchableOpacity>

      {selectedFile && (
        <View style={styles.fileContainer}>
          <Text style={styles.fileName}>{selectedFile.name}</Text>
        </View>
      )}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveFile}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    paddingVertical: 50,
    paddingHorizontal: 90,
    marginBottom: 10,
    flexDirection: "column", // Display content vertically
    alignItems: "center",
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2196f3",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
    color : "white",	
  },
  fileContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  fileName: {
    fontSize: 16,
  },
  iconContainer: {
    marginTop: 10,
  },
  buttonTextU:{
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
    	
  }
  
});

export default FileManagement;
