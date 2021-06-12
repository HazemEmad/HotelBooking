import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import colors from '../constants/colors';
import Star from '../assets/images/star.svg';

const MiniHotelCard = ({date, address, name, rate, userRating, photo}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: photo}} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.boldText}>{name}</Text>
        <Text style={styles.normalText(false)} numberOfLines={2}>
          {address}
        </Text>
        {date ? (
          <Text style={styles.normalText(true)}>
            {'From ' + date.from + ' To ' + date.to}
          </Text>
        ) : (
          <View style={styles.row}>
            <Star />
            <Text style={styles.colorText}>{rate}</Text>
            <Text style={styles.normalText(false)}>({userRating} Reviews)</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 1,
    marginVertical: 7,
  },
  detailsContainer: {
    justifyContent: 'space-between',
    width: '60%',
  },
  image: {
    height: '100%',
    width: 95,
    borderRadius: 15,
    marginRight: 10,
  },
  boldText: {
    fontFamily: 'NunitoSans-Bold',
    color: colors.basicText,
    fontSize: 18,
    textAlign: 'left',
  },
  normalText: bold => ({
    fontFamily: 'NunitoSans-Regular',
    color: bold ? colors.obacityText : colors.obacityBlack,
    fontSize: 14,
    textAlign: 'left',
  }),
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  colorText: {
    fontFamily: 'NunitoSans-SemiBold',
    color: colors.star,
    fontSize: 14,
  },
});
export default MiniHotelCard;
