const API_ROOT = 'https://pokeapi.co/api/v2/';
const PAGE_SIZE = 20;
const ARTWORK_ROOT = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';

export const normalizeQuery = (query) => {
  const value = String(query).trim().toLowerCase();
  return /^\d+$/.test(value) ? value.replace(/^0+(?=\d)/, '') : value;
};
const artworkUrl = (id) => `${ARTWORK_ROOT}${id}.png`;

async function requestJson(path, { signal } = {}) {
  try {
    const response = await fetch(`${API_ROOT}${path}`, { signal });
    if (!response.ok) {
      const error = new Error(response.status === 404
        ? 'No encontramos ese Pokémon. Revisa el nombre o número.'
        : `No pudimos consultar la PokéAPI (HTTP ${response.status}).`);
      error.status = response.status;
      throw error;
    }
    return await response.json();
  } catch (error) {
    if (signal?.aborted || error.status) throw error;
    throw new Error('No pudimos conectar con la PokéAPI. Revisa tu conexión e inténtalo de nuevo.');
  }
}

export async function getPokemonPage(offset = 0, options) {
  const data = await requestJson(`pokemon?limit=${PAGE_SIZE}&offset=${offset}`, options);
  if (!Array.isArray(data.results)) throw new Error('La lista recibida no es válida.');

  const items = data.results.map(({ name, url }) => {
    const match = /\/pokemon\/(\d+)\/?$/.exec(url);
    if (!match || !name) throw new Error('La lista recibida no es válida.');
    const id = Number(match[1]);
    return { id, name, image: artworkUrl(id) };
  });
  let nextOffset = null;
  if (data.next && items.length) {
    const match = /[?&]offset=(\d+)/.exec(data.next);
    const candidate = match ? Number(match[1]) : NaN;
    if (!Number.isSafeInteger(candidate) || candidate <= offset) {
      throw new Error('La API devolvió una página repetida. Puedes reintentar.');
    }
    nextOffset = candidate;
  }
  return { items, nextOffset };
}

export async function getPokemon(query, options) {
  const normalized = normalizeQuery(query);
  if (!normalized) throw new Error('Escribe un nombre o número para buscar.');
  const data = await requestJson(`pokemon/${encodeURIComponent(normalized)}`, options);
  return {
    id: data.id,
    name: data.name,
    image: data.sprites?.other?.['official-artwork']?.front_default || artworkUrl(data.id),
    height: data.height / 10,
    weight: data.weight / 10,
    types: data.types.map(({ type }) => type.name),
    stats: data.stats.map(({ stat, base_stat }) => ({ name: stat.name, value: base_stat })),
  };
}
