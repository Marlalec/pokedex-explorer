import { useEffect, useRef, useState } from 'react';
import { getPokemonPage } from '../services/pokeApi.js';

const initialState = { items: [], nextOffset: 0, status: 'idle', error: null };

export function usePokemonList() {
  const [state, setState] = useState(initialState);
  const currentState = useRef(initialState);
  const request = useRef(null);

  function update(patch) {
    currentState.current = { ...currentState.current, ...patch };
    setState(currentState.current);
  }

  async function loadMore({ retry = false } = {}) {
    const current = currentState.current;
    if (request.current || current.nextOffset === null || (current.error && !retry)) return;

    const controller = new AbortController();
    request.current = controller;
    update({ status: 'loading', error: null });

    try {
      const page = await getPokemonPage(current.nextOffset, { signal: controller.signal });
      if (controller.signal.aborted) return;

      const knownIds = new Set(current.items.map((item) => item.id));
      const additions = page.items.filter((item) => {
        if (knownIds.has(item.id)) return false;
        knownIds.add(item.id);
        return true;
      });

      if (page.items.length && !additions.length) {
        throw new Error('La API devolvió Pokémon repetidos. Puedes reintentar.');
      }

      update({
        items: [...current.items, ...additions],
        nextOffset: page.nextOffset,
        status: 'success'
      });
    } catch (error) {
      if (!controller.signal.aborted) update({ status: 'error', error: error.message });
    } finally {
      if (request.current === controller) request.current = null;
    }
  }

  useEffect(() => {
    loadMore();
    return () => {
      request.current?.abort();
      request.current = null;
    };
  }, []);

  return { ...state, loadMore, retry: () => loadMore({ retry: true }) };
}
