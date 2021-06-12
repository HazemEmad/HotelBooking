import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import colors from '../constants/colors';
import CustomTextInput from './customTextInpunt';
import auth from '@react-native-firebase/auth';
import _ from 'lodash';

const LoginComponent = ({saveUser}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (error)
      setTimeout(() => {
        setError('');
      }, 2000);
  }, [error]);
  const login = (email, password) => {
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        saveUser(_.get(res, 'user'));
      })
      .catch(error => {
        setError(_.get(error, 'code', '').split('/')[1]);
        console.error(error);
      })
      .finally(() => setLoading(false));
  };
  console.log(error);

  return (
    <View style={styles.container}>
      <Text style={styles.error}>{error}</Text>

      <CustomTextInput
        topic={'Username or E-mail'}
        type={'username'}
        placeholder={'Enter your username or email'}
        onChangeText={text => setEmail(text)}
      />
      <CustomTextInput
        topic={'Password'}
        type={'password'}
        placeholder={'Enter your password'}
        onChangeText={text => setPassword(text)}
      />
      <Text style={styles.normalText}>Forgot Password?</Text>
      <TouchableOpacity
        style={styles.button(error != '', email == '' || password == '')}
        onPress={() => login(email, password)}
        disabled={email == '' || password == ''}>
        {loading ? (
          <ActivityIndicator size={18} color={colors.white} />
        ) : (
          <Text style={styles.textButton}>Login</Text>
        )}
      </TouchableOpacity>
    </View>
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
  row: {flexDirection: 'row', alignItems: 'flex-end'},
  normalText: {
    fontFamily: 'NunitoSans-Regular',
    color: colors.obacityText,
    fontSize: 14,
    textAlign: 'right',
  },
  button: (error, disabled) => ({
    backgroundColor: error ? 'red' : disabled ? colors.dash : colors.logoColor,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 75,
    height: 57,
    width: '100%',
    marginVertical: 20,
  }),
  textButton: {
    color: colors.white,
    fontSize: 18,
    fontFamily: 'NunitoSans-Bold',
  },
  error: {
    color: 'red',
    fontSize: 16,
    fontFamily: 'NunitoSans-SemiBold',
    textAlign: 'center',
  },
});
export default LoginComponent;
