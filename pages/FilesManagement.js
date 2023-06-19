import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { storage } from "../firebaseconfig";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import axios from "axios";
import BASE_URL from "../config";

const FileManagement = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [reportLink , setReportLink] = useState(null);

  const handleUploadFiles = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (res.type === "success") {
        // Handle the selected file here
        console.log(res);
        setSelectedFile(res); // Set the selected file to state
      } else {
        // User canceled the picker
        console.log("User canceled the file picker.");
      }
    } catch (err) {
      // Error occurred while picking the file
      console.log("Error picking the file:", err);
    }
  };

  const handleSaveFile = async () => {
    if (selectedFile) {
      const { uri, name } = selectedFile;

      // Show confirmation dialog
      Alert.alert(
        "Confirmation",
        "Are you sure you want to save the file?",
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => {
              console.log("File upload canceled.");
            },
          },
          {
            text: "Save",
            onPress: async () => {
              try {
                const response = await uploadFile(uri, name);
                console.log("File uploaded:", response);
                setReportLink(response);
                setSelectedFile(null);


                //send data to database
                try{
                    const updateDatabase = await axios.post(`${BASE_URL}/addNewReport` , {
                        description : "",
                        type :"",
                        pid: "",//should be actual value
                        did : "", //doctor/nutirionist id
                        nid : "" , 
                        reportlink : reportLink,
                    })
                     alert("File uploaded successfully");
                    
                }catch(error){
                    console.log("ERROR OCCURS WHILE SAVING" , error);
                }

              } catch (error) {
                console.log("Error uploading the file:", error);
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
    <View style={{ flex: 1, color: "#fff", alignItems: "center", marginTop: 100 }}>
      <TouchableOpacity onPress={handleUploadFiles}>
        <Text>Upload files</Text>
      </TouchableOpacity>
      {selectedFile && <Text>{selectedFile.name}</Text>}
      <TouchableOpacity onPress={handleSaveFile}>
        <Text>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FileManagement;
