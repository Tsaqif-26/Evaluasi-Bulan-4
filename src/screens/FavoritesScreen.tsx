import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import useFavorites from '../hooks/useFavorites';
import { getPokemonDetail } from '../api/pokeapi';
import PokemonCard from '../components/PokemonCard';
import colors from '../styles/colors';

export default function FavoritesScreen({ navigation }: any) {
  const { favorites, ready } = useFavorites();
  const [list, setList] = useState<any[]>([]);
  const ids = Object.keys(favorites).map((k) => Number(k));

  useEffect(() => {
    (async () => {
      if (!ready) return;
      const arr: any[] = [];
      for (const id of ids) {
        try {
          const d = await getPokemonDetail(id);
          const image = d.sprites?.other?.['official-artwork']?.front_default || d.sprites?.front_default;
          arr.push({ id: d.id, name: d.name, image });
        } catch {}
      }
      setList(arr);
    })();
  }, [ready, favorites]);

  if (!ready) return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Loading...</Text></View>;

  if (list.length === 0) return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>No favorites</Text></View>;

  return (
    <FlatList
      data={list}
      keyExtractor={(i) => String(i.id)}
      renderItem={({ item }) => (
        <PokemonCard name={item.name} id={item.id} image={item.image} onPress={() => navigation.navigate('Detail', { name: item.name, id: item.id })} />
      )}
      numColumns={2}
      contentContainerStyle={{ paddingBottom: 24 }}
    />
  );
}
