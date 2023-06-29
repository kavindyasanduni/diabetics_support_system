import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

const Call = ({ route, navigation }) => {
    const { item } = route.params;

    const handleEndCall = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.callContainer}>
                <Image source={{ uri: item.image }} style={styles.callerImage} />
                <Text style={styles.callerName}>{item.name}</Text>
                <Text style={styles.callerType}>{item.type}</Text>
                <Text style={styles.callingText}>Calling...</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.endCallButton} onPress={handleEndCall}>
                    <MaterialIcons name="call-end" size={32} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
    },
    callContainer: {
        alignItems: "center",
        marginBottom: 48,
    },
    callerImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 40,
        borderWidth: 4,
        borderColor: "#fff",
    },
    callerName: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#fff",
    },
    callerType: {
        fontSize: 20,
        color: "#fff",
        marginBottom: 8,
    },
    callingText: {
        fontSize: 18,
        color: "#fff",
        marginBottom: 25,
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "center",
    },
    endCallButton: {
        backgroundColor: "#ff3b30",
        paddingVertical: 18,
        paddingHorizontal: 18,
        borderRadius: 50,
        marginHorizontal: 8,
    },
});

export default Call;
