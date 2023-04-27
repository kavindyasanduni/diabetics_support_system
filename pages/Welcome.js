import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert,Image} from 'react-native';

const Welcome = props => {
/*
    const onPressButton = () => {
        Alert.alert('clicked button');
    };*/

    return (
        <View style={styles.container}> 
            
            <Text style={styles.text1}>Manage Your Diabetes</Text> 
            <Text style={styles.text2}>Welcome</Text>
            <TouchableOpacity style={styles.button} onPress={()=> props.navigation.navigate("Login")}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {  
        flex: 1,  
        backgroundColor:'#1E1E1E'
    }, 
    text1:{
        textAlign:'center',
        width:269,
        height:33,
        left:80,
        top:456,
        color:'#FFFFFF'
    } ,  
    text2:{
        textAlign:'center',
        width:269,
        height:33,
        left:80,
        top:460,
        color:'#FFFFFF'
    } ,
    button: {
        backgroundColor: '#7a42f4',
        padding: 10,
        top:512,
        width:258,
        height:49,
        left:85,
        borderRadius:32, 
    },
    buttonText:{
        textAlign:'center',
        color:'#FFFFFF',
    },
    image: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginTop: 50,
      },
});

export default Welcome;
