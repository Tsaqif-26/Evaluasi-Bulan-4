import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@pokedex_favorites_v1';

export default function useFavorites() {
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(KEY);
        if (raw) setFavorites(JSON.parse(raw));
      } catch (e) {
        console.warn('Failed to load favorites', e);
      } finally {
        setReady(true);
      }
    })();
  }, []);

  const persist = async (next: Record<number, boolean>) => {
    setFavorites(next);
    try {
      await AsyncStorage.setItem(KEY, JSON.stringify(next));
    } catch (e) {
      console.warn('Failed to save favorites', e);
    }
  };

  const toggle = (id: number) => {
    const next = { ...favorites };
    if (next[id]) delete next[id];
    else next[id] = true;
    persist(next);
  };

  const isFavorite = (id: number) => !!favorites[id];

  return { favorites, ready, toggle, isFavorite, setFavorites };
}
