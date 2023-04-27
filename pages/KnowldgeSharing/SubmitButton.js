import { TouchableOpacity, Text,StyleSheet } from 'react-native';

const SubmitButton = ({ onPress }) => {
    return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.text}>Submit</Text>
      </TouchableOpacity>
    );
  }
  
  const styles = StyleSheet.create({
    button: {
      backgroundColor: '#1D11AD',
      padding: 5,
      borderRadius: 18,
      alignItems: 'center',
      width:110,
      height:32,
    },
    text: {
      color: 'white',
      fontWeight: 'bold',
    },
  });

  export default SubmitButton;  