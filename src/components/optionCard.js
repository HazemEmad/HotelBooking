import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import colors from '../constants/colors';
import Award from '../assets/images/award.svg';
import Logout from '../assets/images/log-out.svg';
import Success from '../assets/images/miniSuccess.svg';
import Arrow from '../assets/images/Vector 2.svg';

const OptionCard = ({title, index, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.rowView}>
        {index == 0 && <Award style={styles.icon} />}
        {index == 1 && <Logout style={styles.icon} />}
        {index == 2 && <Success style={styles.icon} />}
        <Text style={styles.boldText}>{title}</Text>
      </View>
      {(index == 0 || index == 2) && <Arrow style={styles.icon} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: colors.obacityText,
    alignItems: 'center',
    padding: 20,
    marginVertical: 15,
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '50%',
  },
  icon: {
    height: 24,
    width: 24,
  },
  boldText: {
    fontFamily: 'NunitoSans-SemiBold',
    color: colors.basicText,
    fontSize: 16,
    width: '75%',
  },
});
export default OptionCard;
