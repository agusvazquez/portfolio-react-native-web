import React from "react";
import {
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  GestureResponderEvent,
  PanResponderGestureState,
} from "react-native";
import { Text } from "react-native-elements";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

const Deck = () => {
  const position = React.useRef(new Animated.ValueXY()).current;

  const forceSwipe = (x: number) => {
    Animated.timing(position, {
      useNativeDriver: false,
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
    }).start();
  };

  const forceSwipeRight = () => {
    forceSwipe(SCREEN_WIDTH);
  };

  const forceSwipeLeft = () => {
    forceSwipe(-SCREEN_WIDTH);
  };

  const resetPosition = () => {
    Animated.spring(position, {
      useNativeDriver: false,
      toValue: { x: 0, y: 0 },
    }).start();
  };

  const onPanResponderRelease = (
    event: GestureResponderEvent,
    gesture: PanResponderGestureState
  ) => {
    const { dx } = gesture;

    if (dx > SWIPE_THRESHOLD) {
      forceSwipeRight();
    } else if (dx < -SWIPE_THRESHOLD) {
      forceSwipeLeft();
    } else {
      resetPosition();
    }
  };

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease,
    })
  ).current;

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
      outputRange: ["-50deg", "0deg", "50deg"],
    });

    return { ...position.getLayout(), ...styles.box, transform: [{ rotate }] };
  };

  return (
    <Animated.View {...panResponder.panHandlers} style={getCardStyle()}>
      <Text style={styles.text}>This is my Animated View</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontWeight: "bold",
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: "blue",
    borderRadius: 5,
  },
});

export default Deck;
