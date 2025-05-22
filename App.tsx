import React from 'react';
import {View, Alert, Text, PanResponder, StyleSheet} from 'react-native';
import Svg, {Circle} from 'react-native-svg';

const UnderlyingInteractiveElement = () => {
  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => Alert.alert('Underlying Element Touched!'),
      // Add some move handlers to visually confirm panning if desired
      onPanResponderMove: (_, gestureState) => {
        console.log(
          `Underlying move: dx=${gestureState.dx}, dy=${gestureState.dy}`,
        );
      },
    }),
  ).current;

  return (
    <View {...panResponder.panHandlers} style={styles.underlyingElement}>
      <Text>Underlaying area (Try to Pan/Touch)</Text>
    </View>
  );
};

const OverlaySvg = () => {
  const svgSize = 200;

  return (
    <View
      style={[
        styles.overlayContainer,
        {
          width: svgSize,
          height: svgSize,
          left: 50,
          top: 50,
        },
      ]}>
      <Svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${svgSize} ${svgSize}`}
        pointerEvents="none" // Expect SVG canvas to be non-interactive AND allow pass-through
      >
        {/* A purely visual, non-interactive circle */}
        <Circle
          cx={svgSize / 2}
          cy={svgSize / 2}
          r={40}
          fill="orange"
          // No onPress handler
          // No pointerEvents="auto" or any pointerEvents prop
        />
      </Svg>
    </View>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <UnderlyingInteractiveElement />
      <OverlaySvg />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  underlyingElement: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Ensure it's "underneath"
  },
  overlayContainer: {
    position: 'absolute',
    // Visual debugging for the overlay container's bounds:
    borderColor: 'red',
    borderWidth: 1,
    pointerEvents: 'box-none', // Crucial: Expect pass-through for empty areas of this View
    // pointerEvents: 'none',   //"none" makes the view pass-through touches to underlying elements
    zIndex: 2, // Ensure it's "on top"
  },
});
