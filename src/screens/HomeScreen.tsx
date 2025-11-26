import React, { useMemo, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Text, RefreshControl } from 'react-native';
import usePokemon from '../hooks/usePokemon';
import PokemonCard from '../components/PokemonCard';
import SkeletonCard from '../components/SkeletonCard';
import ErrorView from '../components/ErrorView';
import colors from '../styles/colors';
import spacing from '../styles/spacing';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { getTypes } from '../api/pokeapi';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { pokemons, loading, error, fetchMore, loadingMore, refresh, filterByType, hasMore } = usePokemon();
  const [filterOpen, setFilterOpen] = useState(false);
  const [types, setTypes] = useState<string[]>([]);
  const [typeLoading, setTypeLoading] = useState(false);

  const openFilters = async () => {
    setFilterOpen(true);
    if (types.length === 0) {
      setTypeLoading(true);
      try {
        const t = await getTypes();
        setTypes(t.map((x) => x.name));
      } catch {}
      setTypeLoading(false);
    }
  };

  const onSelectType = async (t: string) => {
    await filterByType(t);
  };

  if (loading) {
  return (
    <View style={s.center}>
      <ActivityIndicator size="large" color={colors.primary} />

      <FlatList
        data={[1,2,3,4,5,6]}
        numColumns={2}
        key={"SKELETON"}       
        keyExtractor={(i)=>String(i)}
        renderItem={() => <SkeletonCard />}
      />
    </View>
  );
}


  if (error) {
    return <ErrorView message={error} onRetry={refresh} />;
  }

  const renderItem = ({ item }: any) => (
    <PokemonCard
      name={item.name}
      id={item.id}
      image={item.image}
      onPress={() => navigation.navigate('Detail', { name: item.name, id: item.id })}
    />
  );

  return (
    <View style={s.container}>
      <View style={s.headerRow}>
        <TouchableOpacity onPress={() => navigation.navigate('Favorites')} style={s.headerBtn}>
          <Text style={s.headerBtnText}>Favorites</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={openFilters} style={s.headerBtn}>
          <Text style={s.headerBtnText}>Filter</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={pokemons}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        numColumns={2}
        onEndReached={() => { if (hasMore) fetchMore(); }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() =>
          loadingMore ? <ActivityIndicator style={{ margin: 16 }} /> : null
        }
        refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} />}
      />

      {filterOpen ? (
        <View style={s.filterWrap}>
          <Text style={{ fontWeight: '700', marginBottom: 8 }}>Filter by type</Text>
          {typeLoading ? <ActivityIndicator /> : (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {types.map((t) => (
                <TouchableOpacity key={t} onPress={() => onSelectType(t)} style={s.typeBtn}>
                  <Text style={{ color: '#fff', fontWeight: '700' }}>{t}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          <TouchableOpacity onPress={() => setFilterOpen(false)} style={{ marginTop: 12 }}>
            <Text style={{ color: colors.subText }}>Close</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', padding: spacing.m },
  headerBtn: { backgroundColor: '#fff', padding: 10, borderRadius: 8, elevation: 2 },
  headerBtnText: { fontWeight: '700' },
  filterWrap: { position: 'absolute', bottom: 16, left: 16, right: 16, backgroundColor: '#fff', padding: 14, borderRadius: 12, elevation: 6 },
  typeBtn: { backgroundColor: colors.primary, padding: 8, borderRadius: 8, margin: 6 },
});
