import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';

interface Props {
  type: string;
}

const typeColor = (t: string) => {
  switch (t) {
    case 'fire': return '#FB923C';
    case 'water': return '#60A5FA';
    case 'grass': return '#34D399';
    case 'electric': return '#FACC15';
    case 'psychic': return '#F472B6';
    case 'rock': return '#A78BFA';
    case 'ground': return '#D97706';
    case 'bug': return '#86EFAC';
    default: return '#CBD5E1';
  }
};

export default function TypeBadge({ type }: Props) {
  return (
    <View style={[styles.wrap, { backgroundColor: typeColor(type) }]}>
      <Text style={styles.text}>{type.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, marginRight: 8 },
  text: { color: '#fff', fontWeight: '700', fontSize: 12 },
});
