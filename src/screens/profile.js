import React from 'react';
import {StyleSheet, TouchableOpacity, View, Image, Text} from 'react-native';
import colors from '../constants/colors';
import Camera from '../assets/images/camera.svg';
import OptionCard from '../components/optionCard';
import auth from '@react-native-firebase/auth';
import {logoutUser} from '../redux/actions/auth';
import {connect} from 'react-redux';
import _ from 'lodash';
import {DEFAUL_PROFILE} from '../constants/urls';

const Profile = ({navigation, dispatch, user, bookings}) => {
  const detailsData = [
    {count: 47, title: 'Reviews'},
    {count: 75, title: 'Transactions'},
    {
      count: bookings.filter(book => book.user == user.email).length,
      title: 'Bookings',
    },
  ];
  const signout = () => {
    auth()
      .signOut()
      .then(() => {
        dispatch(logoutUser());
        console.log('User signed out!');
      });
  };
  const optionsCard = ['User Settings', 'Logout', 'Bookings'];
  const _onPress = index => {
    switch (index) {
      case 0:
        null;
        break;
      case 1:
        signout();
        break;
      case 2:
        navigation.navigate('Bookings');
        break;
      default:
        null;
        break;
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: DEFAUL_PROFILE}} />
        <View style={styles.cameraContainer}>
          <Camera />
        </View>
      </TouchableOpacity>
      <View style={styles.centerView}>
        <Text style={styles.boldText}>{_.get(user, 'email', 'No name!')}</Text>
        <Text style={styles.normalText}>Indonesia</Text>
      </View>
      <View style={styles.rowView}>
        {detailsData.map(data => (
          <View style={styles.detailsContainer} key={data.title}>
            <Text style={styles.colorText}>{data.count}</Text>
            <Text style={styles.normalText}>{data.title}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.boldText}>Options</Text>
      {optionsCard.map((option, index) => (
        <OptionCard
          key={option}
          index={index}
          title={option}
          onPress={() => _onPress(index)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  imageContainer: {
    width: 90,
    height: 90,
    alignSelf: 'center',
    marginVertical: 10,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 90 / 2,
  },
  cameraContainer: {
    width: 38,
    height: 38,
    borderRadius: 38 / 2,
    backgroundColor: colors.logoColor,
    borderWidth: 1,
    borderColor: colors.white,
    position: 'absolute',
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
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
  centerView: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    backgroundColor: colors.white,
    marginVertical: 20,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  colorText: {
    fontSize: 28,
    color: colors.logoColor,
    fontFamily: 'NunitoSans-Bold',
  },
});
const mapStateToProps = state => ({
  user: state.auth.user,
  bookings: state.bookings.bookings,
});
export default connect(mapStateToProps)(Profile);
