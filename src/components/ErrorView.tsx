import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../styles/colors';
import spacing from '../styles/spacing';

interface Props {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorView({ message = 'Terjadi kesalahan', onRetry }: Props) {
  return (
    <View style={s.wrap}>
      <Text style={s.msg}>{message}</Text>
      {onRetry ? (
        <TouchableOpacity onPress={onRetry} style={s.btn}>
          <Text style={s.btnText}>Retry</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.m },
  msg: { color: colors.subText, fontSize: 16, marginBottom: 12 },
  btn: { backgroundColor: colors.primary, paddingHorizontal: 18, paddingVertical: 10, borderRadius: 8 },
  btnText: { color: '#fff', fontWeight: '600' },
});
