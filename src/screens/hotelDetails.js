import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AnimatedComponent from '../components/animatedComponent';
import DateRangePicker from '../components/DateRangePicker';
import MiniHotelCard from '../components/miniHotelCard';
import WarningMessages from '../components/warningMessages';
import colors from '../constants/colors';
import moment from 'moment';
import _ from 'lodash';
import NetInfo from '@react-native-community/netinfo';
import {addBooking} from '../redux/actions/bookings';
import {connect} from 'react-redux';

const HotelDetails = props => {
  const {address, name, rate, userRating, title, photo} = _.get(props, [
    'route',
    'params',
  ]);
  const [openModal, setOpenModal] = useState(false);
  const [status, setStatus] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  const [dimensions, setDimensions] = useState(0);
  const [startDateSt, setStartDateSt] = useState(
    moment().startOf('day').utc(true).subtract(7, 'day').format('YYYY-MM-DD'),
  );
  const [endDateSt, setEndDateSt] = useState(
    moment().endOf('day').utc(true).format('YYYY-MM-DD'),
  );

  const takeBook = () => {
    setOpenModal(true);
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        setStatus(true);
        let bookings = props.bookings;
        let addedBooking = {
          user: props.user.email,
          address,
          name,
          rate,
          userRating,
          title,
          photo,
          date: {from: startDateSt, to: endDateSt},
        };
        bookings.push(addedBooking);
        props.dispatch(addBooking(bookings));
      } else {
        setStatus(false);
      }
    });
    setShowMessage(true);
  };
  const onLayout = event => {
    let {height} = event.nativeEvent.layout;
    setDimensions(height);
  };
  const _onPress = () => {
    if (status) props.navigation.popToTop();
    else takeBook();
  };

  return (
    <View
      style={styles.container}
      onStartShouldSetResponder={() => {
        setShowMessage(false);
        setOpenModal(false);
      }}>
      <ScrollView style={{opacity: openModal ? 0.4 : 1}}>
        <MiniHotelCard
          address={address}
          name={name}
          rate={rate}
          userRating={userRating}
          title={title}
          photo={photo}
        />
        <Text style={styles.normalText}>{address}</Text>
      </ScrollView>
      <AnimatedComponent
        open={openModal}
        height={dimensions}
        render={() =>
          !showMessage ? (
            <DateRangePicker
              onLayout={onLayout}
              startDate={startDateSt}
              endDate={endDateSt}
              setDate={(s, e) => {
                setStartDateSt(s);
                setEndDateSt(e);
              }}
              windowHeight={'100%'}
              windowWidth={100}
              onPress={() => takeBook()}
            />
          ) : (
            <WarningMessages
              status={status}
              onLayout={onLayout}
              onPress={_onPress}
            />
          )
        }
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => setOpenModal(true)}>
        <Text style={styles.textButton}>Book</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  normalText: {
    fontFamily: 'NunitoSans-Regular',
    color: colors.obacityText,
    fontSize: 14,
    marginVertical: 30,
    textAlign: 'left',
  },
  button: {
    backgroundColor: colors.logoColor,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 75,
    height: 57,
    width: 165,
    position: 'absolute',
    bottom: 30,
  },
  textButton: {
    color: colors.white,
    fontSize: 18,
    fontFamily: 'NunitoSans-Bold',
  },
});
const mapStateToProps = state => ({
  user: state.auth.user,
  bookings: state.bookings.bookings,
});
export default connect(mapStateToProps)(HotelDetails);
