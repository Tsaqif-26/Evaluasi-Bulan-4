import { useEffect, useState, useCallback } from 'react';
import { getPokemonList, getPokemonDetail, getPokemonsByType } from '../api/pokeapi';

export interface ShortPokemon {
  name: string;
  url: string;
  id: number;
  image: string;
}

export default function usePokemon() {
  const PAGE_SIZE = 20;
  const [pokemons, setPokemons] = useState<ShortPokemon[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const parseItem = (item: { name: string; url: string }): ShortPokemon => {
    const parts = item.url.split('/').filter(Boolean);
    const id = Number(parts[parts.length - 1]);
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    return { ...item, id, image };
  };

  const fetchInitial = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      const res = await getPokemonList(PAGE_SIZE, 0);
      const parsed = res.results.map(parseItem);
      setPokemons(parsed);
      setOffset(PAGE_SIZE);
      setHasMore(Boolean(res.next));
    } catch (e) {
      setError('Gagal memuat daftar Pokémon.');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    try {
      setLoadingMore(true);
      const res = await getPokemonList(PAGE_SIZE, offset);
      const parsed = res.results.map(parseItem);
      setPokemons((p) => [...p, ...parsed]);
      setOffset((o) => o + PAGE_SIZE);
      setHasMore(Boolean(res.next));
    } catch (e) {
      setError('Gagal memuat lebih banyak Pokémon.');
    } finally {
      setLoadingMore(false);
    }
  }, [offset, hasMore, loadingMore]);

  const refresh = useCallback(async () => {
    await fetchInitial();
  }, [fetchInitial]);

  const filterByType = useCallback(async (typeName: string) => {
    try {
      setLoading(true);
      setError(null);
      const r = await getPokemonsByType(typeName);
      const parsed = r.map(parseItem);
      setPokemons(parsed);
      setHasMore(false);
      setOffset(0);
    } catch (e) {
      setError('Gagal memfilter berdasarkan tipe.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInitial();
  }, [fetchInitial]);

  return {
    pokemons,
    loading,
    error,
    fetchMore,
    loadingMore,
    refresh,
    filterByType,
    hasMore,
  };
}
