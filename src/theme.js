export const colors = {
  background: '#FFFFFF', surface: '#FFFFFF', ink: '#32191D', muted: '#786267',
  accent: '#C62836', border: '#EEDCDF', soft: '#FCE8EB', error: '#A71D2A',
};
export const typeInfo = {
  normal: ['Normal', '#E8E5DE'], fire: ['Fuego', '#FFD7BF'], water: ['Agua', '#CDE5FC'],
  electric: ['Eléctrico', '#FAE99E'], grass: ['Planta', '#D4ECC7'], ice: ['Hielo', '#C9EFED'],
  fighting: ['Lucha', '#F4CCC5'], poison: ['Veneno', '#E8D1ED'], ground: ['Tierra', '#EDDFC0'],
  flying: ['Volador', '#DCE1F9'], psychic: ['Psíquico', '#F9D0DF'], bug: ['Bicho', '#E1E9B3'],
  rock: ['Roca', '#E5DBB9'], ghost: ['Fantasma', '#DCD5EF'], dragon: ['Dragón', '#D2D5F9'],
  dark: ['Siniestro', '#D7D1CE'], steel: ['Acero', '#DCE3E7'], fairy: ['Hada', '#F7D9EC'],
};
export const statLabels = {
  hp: 'PS', attack: 'Ataque', defense: 'Defensa', 'special-attack': 'At. especial',
  'special-defense': 'Def. especial', speed: 'Velocidad',
};
export const pokemonNumber = (id) => `#${String(id).padStart(3, '0')}`;
export const capitalize = (name) => name.charAt(0).toUpperCase() + name.slice(1);
