import React, {useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import colors from '../constants/colors';
import Success from '../assets/images/success.svg';
import Failed from '../assets/images/failed.svg';

const WarningMessages = ({status, onLayout, onPress}) => {
  return (
    <View style={styles.container} onLayout={onLayout}>
      <View style={styles.dash} />
      {status ? (
        <Success style={styles.icon} />
      ) : (
        <Failed style={styles.icon} />
      )}
      <Text style={styles.boldText}>
        Transaction {status ? 'Success' : 'Failed'}
      </Text>
      <Text style={styles.normalText}>
        {status
          ? 'Congratulations! You can see your bookings in the booking section. Enjoy your trip!'
          : 'Please check your internet connection and try again in a moments. Good luck!'}
      </Text>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.textButton}>
          {status ? 'Back To Home' : 'Try Again'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  dash: {
    backgroundColor: colors.dash,
    borderRadius: 3,
    height: 5,
    width: 114,
    alignSelf: 'center',
    marginBottom: 50,
  },
  boldText: {
    fontFamily: 'NunitoSans-Bold',
    color: colors.basicText,
    fontSize: 24,
    marginBottom: 20,
  },
  normalText: {
    fontFamily: 'NunitoSans-Regular',
    color: colors.obacityText,
    fontSize: 16,
    marginBottom: 40,
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 25,
  },
  button: {
    backgroundColor: colors.logoColor,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 75,
    height: 57,
    width: '100%',
  },
  textButton: {
    color: colors.white,
    fontSize: 18,
    fontFamily: 'NunitoSans-Bold',
  },
});
export default WarningMessages;
