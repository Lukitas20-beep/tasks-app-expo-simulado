// src/styles/global.ts
import { StyleSheet, StatusBar } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: StatusBar.currentHeight || 20,
    paddingHorizontal: 20,
  },
  primaryText: {
    color: '#6200EE',
    fontWeight: 'bold',
  },
  bodyText: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
  },
  vencida: {
    backgroundColor: '#e53935',
  },
  noPrazo:{
    backgroundColor: '#43a047',
  }
});
