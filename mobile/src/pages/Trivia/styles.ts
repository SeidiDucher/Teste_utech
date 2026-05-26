// Estilos isolados da página Trivia
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#121214', justifyContent: 'center' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121214' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  progress: { color: '#8d8d99', fontSize: 14, fontWeight: 'bold' },
  badge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  badgeText: { color: '#FFF', fontSize: 11, fontWeight: 'bold' },
  category: { color: '#00b37e', fontSize: 14, fontWeight: '600', marginBottom: 8 },
  questionText: { color: '#e1e1e6', fontSize: 22, fontWeight: 'bold', marginBottom: 32, lineHeight: 30 },
  optionsContainer: { width: '100%', gap: 12 },
  optionButton: { backgroundColor: '#202024', padding: 18, borderRadius: 8, borderWidth: 1, borderColor: '#323238' },
  optionText: { color: '#c4c4cc', fontSize: 16, fontWeight: '500' },
  loadingText: { color: '#c4c4cc', marginTop: 16, fontSize: 16 }
});