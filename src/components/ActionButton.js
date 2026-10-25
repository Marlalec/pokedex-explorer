import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../theme.js';

export default function ActionButton({ title, onPress, secondary = false }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress}
      style={({ pressed }) => [styles.button, secondary && styles.secondary, pressed && styles.pressed]}>
      <Text style={[styles.label, secondary && styles.secondaryLabel]}>{title}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.accent,
    borderRadius: 14,
    minHeight: 48,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center'
  },

  label: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700'
  },

  secondary: {
    backgroundColor: colors.soft
  },

  secondaryLabel: {
    color: colors.accent
  },

  pressed: {
    opacity: 0.72
  },
});
