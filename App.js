import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { usePokemonList } from './src/hooks/usePokemonList.js';
import PokemonListScreen from './src/screens/PokemonListScreen.js';
import PokemonDetailScreen from './src/screens/PokemonDetailScreen.js';
import PokeballBackground from './src/components/PokeballBackground.js';
import { colors } from './src/theme.js';

export default function App() {
  const [selectedQuery, setSelectedQuery] = useState(null);
  const list = usePokemonList();

  return (
    <SafeAreaProvider>
      <View style={styles.app}>
        <PokeballBackground />
        <SafeAreaView style={styles.safeArea}>
          <StatusBar style="dark" />
          <PokemonListScreen
            list={list}
            onSelect={setSelectedQuery}
            active={selectedQuery === null}
          />
          {selectedQuery !== null && (
            <PokemonDetailScreen
              key={selectedQuery}
              query={selectedQuery}
              onBack={() => setSelectedQuery(null)}
            />
          )}
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: colors.background
  },

  safeArea: {
    flex: 1
  },
});
