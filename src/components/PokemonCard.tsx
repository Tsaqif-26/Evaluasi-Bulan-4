import React, { useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import colors from '../styles/colors';

interface Props {
  name: string;
  image: string;
  id: number;
  onPress: () => void;
}

export default function PokemonCard({ name, image, id, onPress }: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start();
  const onPressOut = () => Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();

  return (
    <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
      <TouchableOpacity onPressIn={onPressIn} onPressOut={onPressOut} onPress={onPress} activeOpacity={0.9} style={styles.inner}>
        <Image source={{ uri: image }} style={styles.image} resizeMode="contain" />
        <View style={styles.info}>
          <Text style={styles.name}>{name.toUpperCase()}</Text>
          <Text style={styles.id}>#{id}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, margin: 8, borderRadius: 12, elevation: 3, backgroundColor: '#fff' },
  inner: { flexDirection: 'row', alignItems: 'center', padding: 12 },
  image: { width: 76, height: 76, marginRight: 12 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: '700', color: colors.text },
  id: { color: colors.subText, marginTop: 4 },
});
