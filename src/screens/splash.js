import React from 'react';
import {StyleSheet, View} from 'react-native';
import colors from '../constants/colors';
import Logo from '../assets/images/hopin.svg';

import TopWave from '../assets/images/Vector 5.svg';
import BottomWave from '../assets/images/Vector 4.svg';

const Splash = () => {
  return (
    <View style={styles.container}>
      <TopWave style={styles.absoluteView} />
      <BottomWave style={styles.absoluteView2} />
      <Logo />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.logoColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 78,
    width: 78,
  },
  absoluteView: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  absoluteView2: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  row: {flexDirection: 'row', alignItems: 'flex-end'},
});
export default Splash;
