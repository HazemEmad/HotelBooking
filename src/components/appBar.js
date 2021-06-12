import React, {useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import colors from '../constants/colors';
import _ from 'lodash';
import Arrow from '../assets/images/arrow-left.svg';

const AppBar = ({navigation, scene}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.pop()}>
        <Arrow />
      </TouchableOpacity>
      <Text style={styles.boldText}>
        {_.get(scene, ['route', 'params', 'title'])}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.background,
  },
  boldText: {
    fontFamily: 'NunitoSans-Bold',
    color: colors.basicText,
    fontSize: 24,
    marginHorizontal: 30,
  },
});
export default AppBar;
