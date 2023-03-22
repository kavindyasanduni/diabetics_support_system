import React from 'react';
import { StyleSheet, View } from 'react-native';

const Triangle = () => {
  return (
    <View style={styles.container}>
      <View style={styles.triangle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderBottomWidth: 100,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'red',
    transform: [{ rotate: '90deg' }],
  },
});

export default Triangle;