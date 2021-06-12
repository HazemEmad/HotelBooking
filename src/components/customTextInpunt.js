import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import colors from '../constants/colors';
import EyeOff from '../assets/images/eye-off.svg';
import Eye from '../assets/images/eye.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';

const CustomTextInput = ({topic, placeholder, type, ...props}) => {
  const [showCharacter, setShowCharacter] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.topicText}>{topic}</Text>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder={placeholder}
          style={styles.textInput}
          placeholderTextColor={colors.obacityText}
          secureTextEntry={type == 'password' && !showCharacter}
          {...props}
        />
        {type == 'password' && (
          <TouchableOpacity onPress={() => setShowCharacter(!showCharacter)}>
            {showCharacter ? <Eye /> : <EyeOff />}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingVertical: 15,
  },
  topicText: {
    fontFamily: 'NunitoSans-SemiBold',
    color: colors.basicText,
    fontSize: 16,
    marginBottom: 15,
  },
  textInputContainer: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    borderRadius: 75,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    color: colors.basicText,
    fontFamily: 'NunitoSans-Regular',
    width: '80%',
  },
});
export default CustomTextInput;
