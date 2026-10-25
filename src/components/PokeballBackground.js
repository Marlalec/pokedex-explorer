import { StyleSheet, View } from 'react-native';
import { colors } from '../theme.js';

function Pokeball({ size, style }) {
  const buttonSize = size * 0.24;
  return (
    <View style={[styles.ball, { width: size, height: size, borderRadius: size / 2 }, style]}>
      <View style={styles.redHalf} />
      <View style={styles.band} />
      <View style={[styles.button, { width: buttonSize, height: buttonSize, borderRadius: buttonSize / 2, marginLeft: -buttonSize / 2, marginTop: -buttonSize / 2 }]}>
        <View style={styles.buttonInset} />
      </View>
    </View>
  );
}

export default function PokeballBackground() {
  return (
    <View pointerEvents="none" accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={styles.background}>
      <Pokeball size={340} style={styles.topBall} />
      <Pokeball size={480} style={styles.bottomBall} />
      <Pokeball size={210} style={styles.smallBall} />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#FFF9FA',
    overflow: 'hidden'
  },

  ball: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderWidth: 7,
    borderColor: '#25242A',
    overflow: 'hidden'
  },

  redHalf: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: colors.accent
  },

  band: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 9,
    marginTop: -4.5,
    backgroundColor: '#25242A'
  },

  button: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    backgroundColor: '#FFFFFF',
    borderWidth: 7,
    borderColor: '#25242A',
    alignItems: 'center',
    justifyContent: 'center'
  },

  buttonInset: {
    width: '68%',
    height: '68%',
    borderWidth: 2,
    borderColor: '#D5D4D6',
    borderRadius: 100
  },

  topBall: {
    top: -85,
    right: -100,
    opacity: 0.15,
    transform: [{
      rotate: '-18deg'
    }]
  },

  bottomBall: {
    bottom: -155,
    left: -210,
    opacity: 0.12,
    transform: [{
      rotate: '22deg'
    }]
  },

  smallBall: {
    top: '48%',
    right: -110,
    opacity: 0.07,
    transform: [{
      rotate: '15deg'
    }]
  },
});
