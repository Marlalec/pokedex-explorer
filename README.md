# PokéDex Explorer

Aplicación del taller de consumo de API con React Native, Expo y JavaScript. Código en inglés e interfaz en español.

## Ejecutar

cd "C:\Users\marlo\Documents\Repos U\pokedex-explorer"
npm ci
npm start

## Estructura

```text
App.js
index.js
src/
  services/pokeApi.js
  hooks/usePokemonList.js
  hooks/usePokemonDetail.js
  screens/PokemonListScreen.js
  screens/PokemonDetailScreen.js
  components/ActionButton.js
  components/RequestState.js
  components/PokemonCard.js
  components/PokeballBackground.js
  theme.js
```

`App.js` cambia entre lista y detalle; `index.js` registra la app. El servicio contiene las peticiones HTTP y prepara los datos. Los hooks gestionan carga, errores, cancelación y paginación. Las pantallas muestran la información y los componentes reutilizan botones, estados y tarjetas. `theme.js` concentra colores y etiquetas; `PokeballBackground.js` dibuja el fondo solicitado.

Esta separación mantiene las llamadas a la API fuera del JSX y los estilos. La lista usa `FlatList`, carga 20 elementos por página y evita duplicados y peticiones simultáneas. La búsqueda acepta nombres y números, incluidos `025` y `026`. El detalle muestra las medidas divididas entre 10 y las seis estadísticas con barras relativas a 255.
