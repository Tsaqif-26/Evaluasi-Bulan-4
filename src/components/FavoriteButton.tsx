import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import colors from '../styles/colors';

interface Props {
  active: boolean;
  onPress: () => void;
}

export default function FavoriteButton({ active, onPress }: Props) {
  return (
    <TouchableOpacity style={[s.btn, active ? s.active : s.inactive]} onPress={onPress}>
      <Text style={s.text}>{active ? '★ Favorited' : '☆ Favorite'}</Text>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  btn: { padding: 8, borderRadius: 8 },
  active: { backgroundColor: colors.primary },
  inactive: { backgroundColor: '#9fa8baff', borderWidth: 1, borderColor: '#E5E7EB' },
  text: { color: '#fff', fontWeight: '700' },
});
