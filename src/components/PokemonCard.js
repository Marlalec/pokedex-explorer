import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { capitalize, colors, pokemonNumber } from '../theme.js';

export default function PokemonCard({ pokemon, onSelect }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={`Ver ${capitalize(pokemon.name)} ${pokemonNumber(pokemon.id)}`}
      onPress={() => onSelect(String(pokemon.id))}
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.7 }]}>
      <View style={styles.imageWell}><Image source={{ uri: pokemon.image }} style={{ width: 116, height: 116 }} resizeMode="contain" accessibilityLabel={capitalize(pokemon.name)} /></View>
      <Text style={styles.number}>{pokemonNumber(pokemon.id)}</Text>
      <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    maxWidth: '49%',
    padding: 14,
    backgroundColor: colors.surface,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 5
  },

  imageWell: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.soft,
    borderRadius: 16,
    height: 126,
    marginBottom: 6
  },

  number: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.muted,
    letterSpacing: 1
  },

  name: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.ink
  },

});
