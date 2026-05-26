//  Estilos isolados da página Resultado
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#121214', paddingTop: 60 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FFF', textAlign: 'center', marginBottom: 24 },
  scoreCard: { backgroundColor: '#202024', padding: 20, borderRadius: 8, alignItems: 'center', marginBottom: 32, borderWidth: 1, borderColor: '#323238' },
  scoreLabel: { color: '#c4c4cc', fontSize: 14, marginBottom: 8 },
  scoreValue: { color: '#00b37e', fontSize: 36, fontWeight: 'bold' },
  scoreMax: { color: '#7c7c8a', fontSize: 20 },
  rankingTitle: { color: '#e1e1e6', fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  list: { flex: 1, marginBottom: 16 },
  rankingItem: { flexDirection: 'row', backgroundColor: '#29292e', padding: 14, borderRadius: 6, alignItems: 'center', marginBottom: 8 },
  highlightItem: { borderWidth: 1, borderColor: '#00b37e', backgroundColor: '#1a2722' },
  position: { color: '#e1a412', fontWeight: 'bold', width: 30, fontSize: 16 },
  name: { color: '#e1e1e6', flex: 1, fontSize: 16, fontWeight: '500' },
  score: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  emptyText: { color: '#7c7c8a', textAlign: 'center', marginTop: 12 },
  buttonPlayAgain: { marginBottom: 12 }, // Usado para dar margem ao nosso componente Button
  buttonReset: { padding: 12, alignItems: 'center' },
  resetText: { color: '#f75a68', fontSize: 14, fontWeight: '500' }
});