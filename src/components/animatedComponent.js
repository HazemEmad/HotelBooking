import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, ScrollView} from 'react-native';
import {useDimensions} from '@react-native-community/hooks';
import colors from '../constants/colors';

const AnimatedComponent = props => {
  const {width} = useDimensions().window;
  let heightAnimated = useRef(new Animated.Value(0)).current;

  const animate = () => {
    Animated.timing(heightAnimated, {
      toValue: props.open ? props.height : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    animate();
  }, [props.open, props.height]);

  return (
    <Animated.View
      style={[styles.container, {height: heightAnimated, width: width}]}>
      <ScrollView>{props.render()}</ScrollView>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    borderRadius: 40,
    bottom: 0,
    backgroundColor: colors.background,
    overflow: 'hidden',
    elevation: 20,
    zIndex: 20,
  },
});

export default AnimatedComponent;
