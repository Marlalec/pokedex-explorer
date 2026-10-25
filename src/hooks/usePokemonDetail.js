import { useEffect, useState } from 'react';
import { getPokemon } from '../services/pokeApi.js';

export function usePokemonDetail(query) {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState({ status: 'loading', pokemon: null, error: null });

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const pokemon = await getPokemon(query, { signal: controller.signal });
        if (!controller.signal.aborted) setState({ status: 'success', pokemon, error: null });
      } catch (error) {
        if (!controller.signal.aborted) setState({
          status: error.status === 404 ? 'not-found' : 'error', pokemon: null, error: error.message,
        });
      }
    }
    load();

    return () => controller.abort();
  }, [query, attempt]);
  return { ...state, retry: () => {
    setState({ status: 'loading', pokemon: null, error: null });
    setAttempt((value) => value + 1);
  } };
}
