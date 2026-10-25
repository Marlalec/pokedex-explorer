import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { usePokemonDetail } from '../hooks/usePokemonDetail.js';
import ActionButton from '../components/ActionButton.js';
import RequestState from '../components/RequestState.js';
import { capitalize, colors, pokemonNumber, statLabels, typeInfo } from '../theme.js';

export default function PokemonDetailScreen({ query, onBack }) {
  const { status, pokemon, error, retry } = usePokemonDetail(query);
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.top}>
        <ActionButton title="Volver a la lista" onPress={onBack} secondary /></View>
      {status === 'loading' && <RequestState loading title="Cargando ficha..." />}
      {status === 'error' && <RequestState title="No pudimos abrir la ficha" message={error} onRetry={retry} />}
      {status === 'not-found' && <RequestState title="Pokémon no encontrado" message={error} />}
      {pokemon && <>
        <View style={styles.hero}>
          <Text style={styles.number}>{pokemonNumber(pokemon.id)}</Text>
          <Text accessibilityRole="header" style={styles.title}>{capitalize(pokemon.name)}</Text>
          <View style={styles.types}>{pokemon.types.map((type) => {
            const [label, backgroundColor] = typeInfo[type] || [capitalize(type), colors.soft];
            return <View key={type} style={[styles.badge, { backgroundColor }]}><Text style={styles.badgeLabel}>{label}</Text></View>;
          })}</View>
          <View style={styles.artwork}><Image source={{ uri: pokemon.image }} style={{ width: 230, height: 230 }} resizeMode="contain" accessibilityLabel={capitalize(pokemon.name)} /></View>
        </View>
        <View style={styles.measurements}>
          <View style={styles.measure}><Text style={styles.measureLabel}>ALTURA</Text><Text style={styles.measureValue}>{pokemon.height.toLocaleString('es-CO')} m</Text></View>
          <View style={styles.divider} />
          <View style={styles.measure}><Text style={styles.measureLabel}>PESO</Text><Text style={styles.measureValue}>{pokemon.weight.toLocaleString('es-CO')} kg</Text></View>
        </View>
        <View style={styles.stats}>
          <Text style={styles.statsTitle}>Estadísticas base</Text>
          {pokemon.stats.map((stat) => <View key={stat.name} style={styles.statRow}>
            <Text style={styles.statLabel}>{statLabels[stat.name] || stat.name}</Text><Text style={styles.statValue}>{stat.value}</Text>
            <View style={styles.track} accessibilityLabel={`${statLabels[stat.name] || stat.name}: ${stat.value} de 255`}>
              <View style={[styles.fill, { width: `${stat.value / 255 * 100}%` }]} />
            </View>
          </View>)}
        </View>
      </>}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1
  },

  content: {
    padding: 22,
    paddingBottom: 36
  },

  top: {
    alignItems: 'flex-start',
    marginBottom: 24
  },

  hero: {
    alignItems: 'center'
  },

  number: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 2
  },

  title: {
    color: colors.ink,
    fontSize: 36,
    fontWeight: '800',
    marginTop: 6
  },

  types: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14
  },

  badge: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 24
  },

  badgeLabel: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: '700'
  },

  artwork: {
    marginTop: 16,
    marginBottom: 22,
    backgroundColor: colors.soft,
    width: 260,
    height: 260,
    borderRadius: 130,
    alignItems: 'center',
    justifyContent: 'center'
  },

  measurements: {
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 20
  },

  measure: {
    flex: 1,
    alignItems: 'center',
    gap: 8
  },

  measureLabel: {
    fontSize: 10,
    color: colors.muted,
    letterSpacing: 2,
    fontWeight: '700'
  },

  measureValue: {
    fontSize: 23,
    color: colors.ink,
    fontWeight: '700'
  },

  divider: {
    width: 1,
    backgroundColor: colors.border
  },

  stats: {
    marginTop: 26
  },

  statsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.ink,
    marginBottom: 20
  },

  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 17,
    gap: 10
  },

  statLabel: {
    width: 92,
    fontSize: 13,
    color: colors.muted
  },

  statValue: {
    width: 30,
    textAlign: 'right',
    color: colors.ink,
    fontWeight: '700',
    fontSize: 13
  },

  track: {
    flex: 1,
    height: 8,
    borderRadius: 8,
    backgroundColor: colors.soft,
    overflow: 'hidden'
  },

  fill: {
    height: 8,
    backgroundColor: colors.accent,
    borderRadius: 8
  },

});
