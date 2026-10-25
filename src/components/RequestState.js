import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import ActionButton from './ActionButton.js';
import { colors } from '../theme.js';

export default function RequestState({ loading = false, title, message = '', onRetry = null }) {
  return (
    <View style={styles.container} accessibilityLiveRegion="polite">
      {loading && <ActivityIndicator size="large" color={colors.accent} />}
      <Text style={styles.title}>{title}</Text>
      {!!message && <Text style={styles.message}>{message}</Text>}
      {!!onRetry && <ActionButton title="Reintentar" onPress={onRetry} secondary />}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 24,
    gap: 12
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.ink,
    textAlign: 'center'
  },

  message: {
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 380
  },
});
