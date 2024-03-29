import { View, Text, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios';
import { white } from 'color-name';
import { Linking } from 'react-native';
const baseURL = "http://192.168.8.101:8082";
const medicalReportURL = "/medicalReports/did/1/2";

export default function MedicalReportNutritionist(props) {

    const id = props.route.params.id;
    const p_id = props.route.params.p_id;
    console.log(id);
    console.log(p_id);

    const [data, setData] = useState(null);
    const [reportLinkes, setReportLinkes] = useState([]);
    
    const handlePress = () => {
        Alert.alert('Button Pressed');
    }

    useEffect(() => {
        // Fetch data using Axios GET request
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseURL}/medicalReports/nid/${p_id}/${id}`);
                setData(response.data);
                console.log(response.data);
                setReportLinkes(response.data[0].reportlink);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
      }, []); 

  return (
    <View style={{color: "#fff"}}>

        <View style = {{marginTop:50}}>
            <Text>View reports For Nutrionist</Text>
        </View>
         {data ? (
            <View style={{color: white}}>
                <Text style={{color: "#fff" }}>MedicalReport  component</Text>
                <Text style={{color: "#fff"}}>{data[0].description}</Text>
                    {
                    reportLinkes.map(item => (
                        <View>
                        <Button style={{color: "#fff" , width:"50%"}} key={"id"} title='Link for Document' onPress={() => {
                            Linking.openURL(item);
                            
                        }}/>
                        </View>
                        ))
                    }
            </View>
      ) : (
        <Text>Fetching data....</Text>
      )}
    </View>
  )
}