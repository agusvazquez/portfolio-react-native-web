import React from "react";
import {
  StyleSheet,
  View,
  Animated,
  PanResponder,
  Dimensions,
  GestureResponderEvent,
  PanResponderGestureState,
  Platform,
  UIManager,
  LayoutAnimation,
} from "react-native";
import { ListItem } from "react-native-elements/dist/list/ListItem";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

interface Props<T> {
  keyExtractor?: (item: T) => string;
  data: T[];
  renderNoMoreCards: () => React.ReactNode;
  renderCard: (item: T) => React.ReactNode;
  onSwipeLeft?: (item: T) => void;
  onSwipeRight?: (item: T) => void;
}

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Deck = ({
  keyExtractor = (item) => item.id,
  data,
  renderNoMoreCards,
  renderCard,
  onSwipeLeft = () => {},
  onSwipeRight = () => {},
}: Props<any>) => {
  const position = React.useRef(new Animated.ValueXY()).current;

  const [currentIndex, setCurrentIndex] = React.useState<number>(0);

  React.useEffect(() => {
    setCurrentIndex(0);
  }, [data]);

  const onSwipeComplete = (x: number) => {
    const item = data[currentIndex];

    x > 0 ? onSwipeRight(item) : onSwipeLeft(item);
    position.setValue({ x: 0, y: 0 });

    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    LayoutAnimation.spring();
  };

  const forceSwipe = (x: number) => {
    Animated.timing(position, {
      useNativeDriver: false,
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
    }).start(() => onSwipeComplete(x));
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

  const panResponder = React.useMemo(() => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease,
    });
  }, [currentIndex]);

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
      outputRange: ["-50deg", "0deg", "50deg"],
    });

    return { ...position.getLayout(), transform: [{ rotate }] };
  };

  const renderCards = () => {
    if (currentIndex >= data.length) {
      return renderNoMoreCards();
    }

    return data
      .map((item, elementIndex) => {
        if (elementIndex < currentIndex) {
          return null;
        }

        if (elementIndex === currentIndex) {
          return (
            <Animated.View
              key={keyExtractor(item)}
              style={[getCardStyle(), styles.cardStyle, { zIndex: 10 }]}
              {...panResponder.panHandlers}
            >
              {renderCard(item)}
            </Animated.View>
          );
        }

        return (
          <Animated.View
            key={keyExtractor(item)}
            style={[
              styles.cardStyle,
              { top: 10 * (elementIndex - currentIndex), zIndex: 5 },
            ]}
          >
            {renderCard(item)}
          </Animated.View>
        );
      })
      .reverse();
  };

  return <View>{renderCards()}</View>;
};

const styles = StyleSheet.create({
  cardStyle: {
    position: "absolute",
    width: SCREEN_WIDTH,
  },
});

export default Deck;
