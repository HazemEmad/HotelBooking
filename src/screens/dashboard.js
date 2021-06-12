import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import colors from '../constants/colors';
import Award from '../assets/images/award.svg';
import Dot from '../assets/images/indicator.svg';
import HotelCard from '../components/hotelCard';
import _ from 'lodash';
import {connect} from 'react-redux';
import {
  YOUR_API_KEY,
  GOOGLE_PHOTOS,
  DEFAULT_IMAGE_URL,
  PLACES_API,
} from '../constants/urls';

import GeolocationCustomHook from '../hooks/geolocationCustomHook';

const Dashboard = ({navigation, user}) => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);

  const {currentLongitude, currentLatitude, locationStatus} =
    GeolocationCustomHook();

  const [tabs, setTabs] = useState([
    {name: 'Recommend', pressed: true},
    {name: 'Popular', pressed: false},
    {name: 'Trending', pressed: false},
  ]);

  useEffect(() => {
    if ((currentLongitude, currentLongitude)) {
      fetchNearestPlacesFromGoogle();
    }
  }, [refresh, currentLatitude, currentLongitude]);

  const fetchNearestPlacesFromGoogle = () => {
    setLoading(true);
    setHotels([]);
    let radMetter = 2 * 1000; // Search withing 2 KM radius
    const url =
      PLACES_API +
      currentLatitude +
      ',' +
      currentLongitude +
      '&radius=' +
      radMetter +
      '&keyword=hotel ' +
      tabs.filter(tab => tab.pressed == true)[0].name +
      '&key=' +
      YOUR_API_KEY;

    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(res => {
        var places = []; // This Array WIll contain locations received from google
        for (let googlePlace of res.results) {
          var place = {};
          var lat = googlePlace.geometry.location.lat;
          var lng = googlePlace.geometry.location.lng;
          var coordinate = {
            latitude: lat,
            longitude: lng,
          };

          var gallery = [];

          if (googlePlace.photos) {
            for (let photo of googlePlace.photos) {
              var photoUrl = placePhotos(
                photo.photo_reference,
                photo.height,
                photo.width,
              );
              gallery.push(photoUrl);
            }
          }

          place['placeTypes'] = googlePlace.types;
          place['coordinate'] = coordinate;
          place['placeId'] = googlePlace.place_id;
          place['name'] = googlePlace.name;
          place['gallery'] = gallery;
          place['rating'] = googlePlace.rating;
          place['userRating'] = googlePlace.user_ratings_total;
          place['address'] = googlePlace.vicinity;

          places.push(place);
        }
        setHotels(places);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  const placePhotos = (reference, height, width) => {
    return (
      GOOGLE_PHOTOS +
      reference +
      '&sensor=false&maxheight=' +
      height +
      '&maxwidth=' +
      width +
      '&key=' +
      YOUR_API_KEY
    );
  };

  const toggleTabs = index => {
    let tempTabs = tabs;
    tempTabs.map((tab, i) => {
      tempTabs[i].pressed = i == index ? true : false;
    });
    return tempTabs;
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Award
          style={{alignSelf: 'flex-end', marginBottom: 10}}
          onPress={() => navigation.navigate('Profile')}
        />
      </TouchableOpacity>
      <Text style={styles.boldText}>Good Morning, {user.email}</Text>
      <View style={styles.row}>
        {tabs.map((tab, index) => {
          return (
            <TouchableOpacity
              style={styles.tabContainer}
              key={tab.name}
              onPress={() => {
                setRefresh(!refresh);
                setTabs(toggleTabs(index));
              }}>
              <Text style={styles.tabText(tab.pressed == true)}>
                {tab.name}
              </Text>
              {/*<Dot />*/}
            </TouchableOpacity>
          );
        })}
      </View>
      {loading ? (
        <ActivityIndicator
          color={colors.logoColor}
          size={80}
          style={{alignSelf: 'center', position: 'absolute', bottom: 200}}
        />
      ) : (
        <FlatList
          data={hotels}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          contentContainerStyle={styles.contentStyle(hotels.length == 0)}
          ListEmptyComponent={() => (
            <Text style={styles.tabText(false)}>No Hotels Found!</Text>
          )}
          renderItem={({item}) => {
            return (
              <HotelCard
                navigate={() =>
                  navigation.navigate('HotelDetails', {
                    rate: _.get(item, 'rating', 'noRate!'),
                    name: _.get(item, 'name', 'noName!'),
                    address: _.get(item, 'address', 'noAddress!'),
                    photo: _.get(item, ['gallery', 0], DEFAULT_IMAGE_URL),
                    userRating: _.get(item, 'userRating', 'noUserRating!'),
                  })
                }
                rating={_.get(item, 'rating', 'noRate!')}
                name={_.get(item, 'name', 'noName!')}
                address={_.get(item, 'address', 'noAddress!')}
                photo={_.get(item, ['gallery', 0], DEFAULT_IMAGE_URL)}
              />
            );
          }}
        />
      )}
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
  boldText: {
    fontFamily: 'NunitoSans-Bold',
    color: colors.basicText,
    fontSize: 28,
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    marginBottom: 30,
  },
  tabContainer: {
    height: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabText: pressed => ({
    fontFamily: pressed ? 'NunitoSans-Bold' : 'NunitoSans-Regular',
    fontSize: 18,
    color: pressed ? colors.basicText : colors.obacityText,
  }),
  contentStyle: bool =>
    bool ? {justifyContent: 'center', alignItems: 'center', width: '100%'} : {},
});

const mapStateToProps = state => ({
  user: state.auth.user,
});
export default connect(mapStateToProps)(Dashboard);
