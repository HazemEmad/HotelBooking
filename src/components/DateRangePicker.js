import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';

import DateRangeCalendar from './DateRangeCalendar';
import colors from '../constants/colors';
import Arrow from '../assets/images/Vector-3.svg';
import moment from 'moment';

const DateRangePicker = props => {
  const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'));

  useEffect(() => {
    setStartDate(props.startDate);
    setEndDate(props.endDate);
  }, []);

  const selectDate = (sDate, eDate) => {
    setStartDate(sDate);
    setEndDate(eDate);
    props.setDate(sDate, eDate);
  };


  const checkIn = new Date(startDate).toLocaleString('default', {
    month: 'long',
    day: '2-digit',
  });
  const checkOut = new Date(endDate).toLocaleString('default', {
    month: 'long',
    day: '2-digit',
  });

  const sDate =
    checkIn.split(' ')[1] +
    ' ' +
    (checkIn.split(' ')[2].toString() == ''
      ? checkIn.split(' ')[3]
      : checkIn.split(' ')[2]);

  const eDate =
    checkOut.split(' ')[1] +
    ' ' +
    (checkOut.split(' ')[2].toString() == ''
      ? checkOut.split(' ')[3]
      : checkOut.split(' ')[2]);

  return (
    <View style={styles.container} onLayout={props.onLayout}>
      <View style={styles.calendarContainer}>
        <DateRangeCalendar
          style={{
            width: '100%',
            height: '100%',
          }}
          enableSwipeMonths={true}
          theme={{
            backgroundColor: colors.logoColor,
            calendarBackground: colors.background,
            textSectionTitleColor: colors.obacityText,
            selectedDayBackgroundColor: colors.logoColor,
            selectedDayTextColor: colors.basicText,
            dayTextColor: colors.basicText,
            textDisabledColor: colors.obacityText,
            arrowColor: colors.logoColor,
            monthTextColor: colors.basicText,
            todayTextColor: colors.star,
            markColor: colors.star,
            markTextColor: colors.star,
            textDayFontFamily: 'NunitoSans-SemiBold',
            textMonthFontFamily: 'NunitoSans-Bold',
            textDayHeaderFontFamily: 'NunitoSans-Regular',
            textDayFontSize: 14,
            textMonthFontSize: 20,
            textDayHeaderFontSize: 14,
          }}
          initialRange={[startDate, endDate]}
          onSuccess={(startDate, endDate) => {
            selectDate(startDate, endDate);
          }}
        />
      </View>
      <View style={styles.row}>
        <View style={styles.centerView}>
          <Text style={styles.obacityText}>Check In</Text>
          <Text style={styles.boldText}>{sDate}</Text>
        </View>
        <Arrow />
        <View style={styles.centerView}>
          <Text style={styles.obacityText}>Check Out</Text>
          <Text style={styles.boldText}>{eDate}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={props.onPress} style={styles.calendarButton}>
        <Text style={styles.textButton}>Continute</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DateRangePicker;

const styles = StyleSheet.create({
  calendarButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.logoColor,
    borderRadius: 75,
    width: '90%',
    color: colors.dash,
    paddingVertical: 17,
    marginVertical: 10,
  },

  calendarContainer: {
    width: '90%',
    height: 350,
    backgroundColor: colors.background,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    color: colors.white,
    fontSize: 18,
    fontFamily: 'NunitoSans-Bold',
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  boldText: {
    fontFamily: 'NunitoSans-Bold',
    color: colors.basicText,
    fontSize: 22,
  },
  obacityText: {
    fontFamily: 'NunitoSans-Regular',
    color: colors.obacityText,
    fontSize: 16,
  },
});
