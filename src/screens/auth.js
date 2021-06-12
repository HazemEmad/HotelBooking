import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
} from 'react-native';
import colors from '../constants/colors';
import Logo from '../assets/images/hopin2.svg';
import LoginComponent from '../components/loginComponent';
import SignupComponent from '../components/signupComponent';
import {authUserData} from '../redux/actions/auth';
import {connect} from 'react-redux';

const Auth = ({navigation, dispatch}) => {
  const [pressed, setPressed] = useState('login');

  const saveUser = user => {
    dispatch(authUserData(user));
  };

  return (
    <View style={styles.container}>
      <Logo style={{alignSelf: 'center'}} />
      <View style={styles.rowAllWidth}>
        <TouchableOpacity
          style={styles.authTabs(pressed == 'login')}
          onPress={() => setPressed('login')}>
          <Text style={styles.boldText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.authTabs(pressed == 'signup')}
          onPress={() => setPressed('signup')}>
          <Text style={styles.boldText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.basicContainer}>
        {pressed == 'login' ? (
          <LoginComponent saveUser={saveUser} />
        ) : (
          <SignupComponent saveUser={saveUser} />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 61,
    justifyContent: 'space-between',
  },
  logo: {
    flexDirection: 'row',
    backgroundColor: colors.logoColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 78,
    width: 78,
    alignSelf: 'center',
  },
  row: {flexDirection: 'row', alignItems: 'flex-end'},
  rowAllWidth: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    height: 66,
    marginVertical: 20,
  },
  authTabs: pressed => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: pressed ? 3 : 0,
    borderColor: colors.logoColor,
  }),
  boldText: {
    fontFamily: 'NunitoSans-Bold',
    color: colors.basicText,
    fontSize: 20,
  },
  basicContainer: {paddingHorizontal: 20, paddingVertical: 20},
});
export default connect()(Auth);
