import { View, StyleSheet, Text, TextInput } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AllergensScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <Text style={styles.subtitle}>I'm allergic to...</Text>
      <Text style={styles.subtitle}>Select allergies or foods you want to avoid.</Text>

      <View style={styles.divider} />

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for specific allergens"
          placeholderTextColor="#999"
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: 'white',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Space Mono",
    color: '#555',
    marginBottom: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9', // light background
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    width: '100%',
    marginVertical: 16, 
  },
});
