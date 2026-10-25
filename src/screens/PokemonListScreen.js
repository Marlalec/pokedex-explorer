import { useState } from 'react';
import { ActivityIndicator, FlatList, Keyboard, StyleSheet, Text, TextInput, View } from 'react-native';
import ActionButton from '../components/ActionButton.js';
import PokemonCard from '../components/PokemonCard.js';
import RequestState from '../components/RequestState.js';
import { colors } from '../theme.js';

export default function PokemonListScreen({ list, onSelect, active }) {
  const [query, setQuery] = useState('');
  const [validation, setValidation] = useState('');
  function search() {
    const value = query.trim();
    if (!value) { setValidation('Escribe un nombre o número para buscar.'); return; }
    setValidation('');
    Keyboard.dismiss();
    onSelect(value);
  }
  const footer = list.status === 'loading' && list.items.length ? (
    <View style={styles.footer} accessibilityLiveRegion="polite">
      <ActivityIndicator color={colors.accent} /><Text style={styles.muted}>Cargando más Pokémon...</Text>
    </View>
  ) : list.error && list.items.length ? (
    <RequestState title="No pudimos cargar más" message={list.error} onRetry={list.retry} />
  ) : list.nextOffset === null && list.items.length ? (
    <Text style={[styles.muted, styles.footer]}>¡Ya exploraste todos los Pokémon!</Text>
  ) : <View style={{ height: 24 }} />;
  return (
    <View style={[styles.screen, !active && { display: 'none' }]}>
      <View style={styles.header}>
        <Text accessibilityRole="header" style={styles.title}>PokéDex Explorer</Text>
        <View style={styles.search}>
          <TextInput value={query} onChangeText={(value) => { setQuery(value); setValidation(''); }}
            placeholder="Busca por nombre o número..." placeholderTextColor={colors.muted}
            accessibilityLabel="Busca por nombre o número..." autoCapitalize="none" autoCorrect={false}
            returnKeyType="search" onSubmitEditing={search} style={styles.input} />
          <ActionButton title="Buscar" onPress={search} />
        </View>
        {!!validation && <Text accessibilityRole="alert" style={styles.validation}>{validation}</Text>}
      </View>

      <FlatList data={list.items} numColumns={2} keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <PokemonCard pokemon={item} onSelect={onSelect} />}
        columnWrapperStyle={styles.row} contentContainerStyle={styles.grid}
        onEndReached={() => { if (active && list.items.length) list.loadMore(); }} onEndReachedThreshold={0.35}
        initialNumToRender={20} keyboardShouldPersistTaps="handled"
        ListEmptyComponent={list.error
          ? <RequestState title="No pudimos cargar la colección" message={list.error} onRetry={list.retry} />
          : list.status === 'success'
            ? <RequestState title="No hay Pokémon disponibles" />
            : <RequestState loading title="Cargando Pokémon..." />}
        ListFooterComponent={footer} />
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1
  },

  header: {
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 18
  },

  title: {
    color: colors.ink,
    fontSize: 29,
    fontWeight: '800',
    letterSpacing: -1
  },

  search: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 24
  },

  input: {
    flex: 1,
    minWidth: 0,
    fontSize: 13,
    color: colors.ink,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 12,
    minHeight: 48
  },

  validation: {
    color: colors.error,
    fontSize: 13,
    marginTop: 8
  },

  row: {
    gap: 12,
    marginBottom: 12
  },

  grid: {
    paddingHorizontal: 22,
    paddingBottom: 16
  },

  footer: {
    padding: 20,
    alignItems: 'center',
    gap: 10
  },

  muted: {
    color: colors.muted,
    textAlign: 'center'
  },
});
