import React, {useState, useEffect} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';

import colors from '../constants/colors';

const XDate = require('xdate');

LocaleConfig.locales['HotelBooking'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'Decenmber',
  ],
  monthNamesShort: [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'May',
    'Jun.',
    'Jul.',
    'Aug.',
    'Sept.',
    'Oct.',
    'Nov.',
    'Dec.',
  ],
  dayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
};

LocaleConfig.defaultLocale = 'HotelBooking';

const DateRangeCalendar = props => {
  const [isFromDatePicked, setIsFromDatePicked] = useState(false);
  const [isToDatePicked, setIsToDatePicked] = useState(false);
  const [markedDates, setMarkedDates] = useState({});
  const [fromDate, setFromDate] = useState('');

  useEffect(() => {
    setupInitialRange();
  }, []);

  const onDayPress = day => {
    if (!isFromDatePicked || (isFromDatePicked && isToDatePicked)) {
      setupStartMarker(day);
    } else if (!isToDatePicked) {
      let _markedDates = {...markedDates};
      let [mMarkedDates, range] = setupMarkedDates(
        fromDate,
        day.dateString,
        _markedDates,
      );
      if (range >= 0) {
        setIsFromDatePicked(true);
        setIsToDatePicked(true);
        setMarkedDates(mMarkedDates);
        props.onSuccess(fromDate, day.dateString);
      } else {
        setupStartMarker(day);
      }
    }
  };

  const setupStartMarker = day => {
    let markedDates = {
      [day.dateString]: {
        startingDay: true,
        customStyles: {
          container: {
            backgroundColor: colors.logoColor,
            borderRadius: 35 / 2,
            width: 35,
            hight: 35,
            justifyContent: 'center',
            alignItems: 'center',
          },
          text: {
            color: colors.basicText,
          },
        },
      },
    };
    setIsFromDatePicked(true);
    setIsToDatePicked(false);
    setFromDate(day.dateString);
    setMarkedDates(markedDates);
  };

  const setupMarkedDates = (fromDate, toDate, _markedDates) => {
    let mFromDate = new XDate(fromDate);
    let mToDate = new XDate(toDate);
    let range = mFromDate.diffDays(mToDate);
    if (range >= 0) {
      if (range == 0) {
        _markedDates = {
          [toDate]: {
            customStyles: {
              container: {
                backgroundColor: colors.logoColor,
                borderRadius: 35 / 2,
                width: 35,
                hight: 35,
                justifyContent: 'center',
                alignItems: 'center',
              },
              text: {
                color: colors.basicText,
              },
            },
          },
        };
      } else {
        for (var i = 1; i <= range; i++) {
          let tempDate = mFromDate.addDays(1).toString('yyyy-MM-dd');
          if (i < range) {
            _markedDates[tempDate] = {
              customStyles: {
                container: {
                  backgroundColor: colors.opacityLogoColor,
                  borderRadius: 0,
                  width: i == 1 || i == range - 1 ? 60 : '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: i == 1 ? 'flex-end' : 'flex-start',
                },
                text: {
                  color: colors.basicText,
                  position: i == 1 || i == range - 1 ? 'absolute' : 'relative',
                  left: i == range - 1 ? 60 / 5 : i == 1 ? 60 / 2 : 0,
                },
              },
            };
          } else {
            _markedDates[tempDate] = {
              endingDay: true,
              customStyles: {
                container: {
                  backgroundColor: colors.logoColor,
                  borderRadius: 35 / 2,
                  width: 35,
                  hight: 35,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
                text: {
                  color: colors.basicText,
                },
              },
            };
          }
        }
      }
    }
    return [_markedDates, range];
  };

  const setupInitialRange = () => {
    if (!props.initialRange) return;
    let [fromDate, toDate] = props.initialRange;
    let ـmarkedDates = {
      [fromDate]: {
        customStyles: {
          container: {
            backgroundColor: colors.logoColor,
            borderRadius: 35 / 2,
            width: 35,
            hight: 35,
            justifyContent: 'center',
            alignItems: 'center',
          },
          text: {
            color: colors.basicText,
          },
        },
        startingDay: true,
      },
    };

    let [mMarkedDates, range] = setupMarkedDates(
      fromDate,
      toDate,
      ـmarkedDates,
    );
    setMarkedDates(mMarkedDates);
    setFromDate(fromDate);
  };

  return (
    <Calendar
      {...props}
      markingType={'custom'}
      current={fromDate}
      markedDates={markedDates}
      onDayPress={day => {
        onDayPress(day);
      }}
    />
  );
};
export default DateRangeCalendar;
