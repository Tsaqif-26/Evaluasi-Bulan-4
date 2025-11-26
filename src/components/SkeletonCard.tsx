import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../styles/colors';

export default function SkeletonCard() {
  return (
    <View style={styles.card}>
      <View style={styles.image} />
      <View style={styles.textWrap}>
        <View style={styles.lineShort} />
        <View style={styles.lineLong} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', backgroundColor: '#fff', padding: 12, margin: 8, borderRadius: 12, elevation: 2, alignItems: 'center' },
  image: { width: 68, height: 68, borderRadius: 8, backgroundColor: '#e6e6e6', marginRight: 12 },
  textWrap: { flex: 1 },
  lineShort: { height: 14, width: '40%', backgroundColor: '#e6e6e6', borderRadius: 6, marginBottom: 8 },
  lineLong: { height: 12, width: '70%', backgroundColor: '#eaeaea', borderRadius: 6 },
});
