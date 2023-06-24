
import { View, Text, TextInput, TouchableOpacity,StyleSheet } from 'react-native';

const AvailableDateTime = ({ dateTime, onRemove }) => {
    const formattedDateTime = dateTime.toLocaleString([], {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
    // console.log(formattedDateTime);
  
    return (
      <View style={styles.dateTimeContainer}>
        <Text>{formattedDateTime}</Text>
        <TouchableOpacity onPress={onRemove}>
          <Text style={styles.removeButton}>Remove</Text>
        </TouchableOpacity>
      </View>
    );
  };
  export default AvailableDateTime;

  const styles = StyleSheet.create({
    // ... previous styles ...
    dateTimeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 8,
      paddingHorizontal: 16,
      backgroundColor: '#f2f2f2',
      borderRadius: 8,
      marginTop: 8,
    },
    removeButton: {
      color: 'red',
      fontWeight: 'bold',
    },
  });

