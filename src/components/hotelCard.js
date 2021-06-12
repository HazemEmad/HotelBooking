import React, {useEffect} from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import colors from '../constants/colors';
import CoverGradient from '../assets/images/cover gradient.svg';
import Star from '../assets/images/star.svg';

const HotelCard = ({navigate, rating, name, address, photo}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={navigate}>
      <ImageBackground
        style={styles.imageBackground}
        source={{uri: photo}}
        imageStyle={styles.image}>
        <CoverGradient style={styles.absoluteView} />
        <View style={styles.row}>
          <Star />
          <Text style={styles.rateText}>{rating}</Text>
        </View>
        <View>
          <Text style={styles.boldText}>{name}</Text>
          <Text style={styles.normalText}>{address}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 256,
    height: 424,
    borderRadius: 25,
    marginRight: 20,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  image: {
    width: 256,
    height: 424,
    borderRadius: 25,
  },
  absoluteView: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    borderRadius: 25,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: colors.obacityBlack,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'flex-end',
    width: 74,
    height: 36,
    borderRadius: 20.5,
  },
  rateText: {
    color: colors.white,
    fontFamily: 'NunitoSans-SemiBold',
    fontSize: 14,
  },
  boldText: {
    fontFamily: 'NunitoSans-Bold',
    color: colors.white,
    fontSize: 20,
    marginBottom: 10,
  },
  normalText: {
    fontFamily: 'NunitoSans-Regular',
    color: colors.obacityWhite,
    fontSize: 14,
  },
});
export default HotelCard;
