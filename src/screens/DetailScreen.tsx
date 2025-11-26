import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { getPokemonDetail } from '../api/pokeapi';
import colors from '../styles/colors';
import spacing from '../styles/spacing';
import TypeBadge from '../components/TypeBadge';
import FavoriteButton from '../components/FavoriteButton';
import useFavorites from '../hooks/useFavorites';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function DetailScreen({ route }: Props) {
  const { name, id } = route.params;
  const [detail, setDetail] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const { isFavorite, toggle } = useFavorites();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const d = await getPokemonDetail(name);
        setDetail(d);
      } catch (e) {
        console.warn(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [name]);

  if (loading || !detail) {
    return <View style={s.center}><ActivityIndicator size="large" color={colors.primary} /></View>;
  }

  const sprite = detail.sprites?.other?.['official-artwork']?.front_default || detail.sprites?.front_default;

  return (
    <ScrollView style={s.container} contentContainerStyle={{ alignItems: 'center', padding: spacing.m }}>
      <View style={s.header}>
        <Image source={{ uri: sprite }} style={s.sprite} />
      </View>

      <Text style={s.title}>{detail.name.toUpperCase()}</Text>

      <View style={{ flexDirection: 'row', marginVertical: 8 }}>
        {detail.types.map((t: any) => <TypeBadge key={t.type.name} type={t.type.name} />)}
      </View>

      <View style={s.row}>
        <View style={s.statCol}><Text style={s.statLabel}>Height</Text><Text>{detail.height}</Text></View>
        <View style={s.statCol}><Text style={s.statLabel}>Weight</Text><Text>{detail.weight}</Text></View>
      </View>

      <View style={{ width: '100%', marginTop: 12 }}>
        <Text style={{ fontWeight: '700', marginBottom: 8 }}>Stats</Text>
        {detail.stats.map((st: any) => (
          <View key={st.stat.name} style={s.statRow}>
            <Text style={{ flex: 1 }}>{st.stat.name}</Text>
            <Text style={{ width: 60, textAlign: 'right' }}>{st.base_stat}</Text>
          </View>
        ))}
      </View>

      <View style={{ height: 12 }} />
      <FavoriteButton active={isFavorite(detail.id)} onPress={() => toggle(detail.id)} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { width: '100%', alignItems: 'center', marginTop: 8 },
  sprite: { width: 220, height: 220 },
  title: { fontSize: 26, fontWeight: '800', color: colors.text, marginTop: 10 },
  row: { flexDirection: 'row', marginTop: 12, width: '100%', justifyContent: 'space-around' },
  statCol: { alignItems: 'center' },
  statLabel: { fontWeight: '700', color: colors.subText },
  statRow: { flexDirection: 'row', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
});
