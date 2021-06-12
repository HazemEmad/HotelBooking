import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import colors from '../constants/colors';
import IntroImage from '../assets/images/Vector 1.svg';
import Splash from './splash';

const Intro = ({navigation}) => {
  const [showSplash, setShowSplash] = useState(true);
  const navigate = () => {
    navigation.navigate('Auth');
  };
  useEffect(() => {
    let timeout = setTimeout(() => {
      setShowSplash(false);
    }, 1200);
    return () => {
      clearTimeout(timeout)
    }
  }, []);

  return showSplash ? (
    <Splash />
  ) : (
    <View style={styles.container}>
      <IntroImage />
      <View style={styles.baseContainer}>
        <Text style={styles.boldText}>Travel with no worry</Text>
        <Text style={styles.normalText}>
          You can now experience the next level travel experience for hotel
          bookings.
        </Text>
        <TouchableOpacity style={styles.button} onPress={navigate}>
          <Text style={styles.textButton}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingVertical: 61,
  },
  baseContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-evenly',
  },
  boldText: {
    fontFamily: 'NunitoSans-Bold',
    color: colors.basicText,
    fontSize: 24,
  },
  normalText: {
    fontFamily: 'NunitoSans-Regular',
    color: colors.obacityText,
    fontSize: 16,
  },
  button: {
    backgroundColor: colors.logoColor,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 75,
    height: 57,
    width: 165,
  },
  textButton: {
    color: colors.white,
    fontSize: 18,
    fontFamily: 'NunitoSans-Bold',
  },
});
export default Intro;
