import _ from 'lodash';
import React from 'react';
import {StyleSheet, Text, FlatList} from 'react-native';
import MiniHotelCard from '../components/miniHotelCard';
import colors from '../constants/colors';
import {connect} from 'react-redux';
import {DEFAULT_IMAGE_URL} from '../constants/urls';
const Bookings = ({bookings, user}) => {
  const getMyBookings = () => {
    return bookings.filter(book => book.user == user.email);
  };
  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={{paddingHorizontal: 20}}
      data={getMyBookings()}
      ListEmptyComponent={() => (
        <Text style={styles.boldText}>There is not any booking yet.</Text>
      )}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <MiniHotelCard
          address={_.get(item, 'address', 'noAddress!')}
          name={_.get(item, 'name', 'noName!')}
          rate={_.get(item, 'rate', 'noRate!')}
          userRating={_.get(item, 'userRating', 'noUserRating!')}
          photo={_.get(item, 'photo', DEFAULT_IMAGE_URL)}
          date={_.get(item, 'date', {from: 'noDate!', to: 'noDate!'})}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
  boldText: {
    fontFamily: 'NunitoSans-Bold',
    color: colors.obacityText,
    fontSize: 20,
    alignSelf: 'center',
    marginVertical: 100,
  },
  row: {flexDirection: 'row', alignItems: 'flex-end'},
});
const mapStateToProps = state => ({
  user: state.auth.user,
  bookings: state.bookings.bookings,
});
export default connect(mapStateToProps)(Bookings);
