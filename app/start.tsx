import { View, StyleSheet, Text, Image, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function StartScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <Image source={require('@/assets/images/byte.png')} style={styles.logo} />
      <Text style={styles.subtitle}>
        Know before you buy.
      </Text>

      <LinearGradient
        colors={['rgba(0, 0, 0, 0.2)', 'rgba(204, 199, 199, 0.2)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.buttonContainer}
      >
        <Text style={styles.buttonText}>Sign up now</Text>
        <Pressable onPress={() => router.push('/signup')} style={styles.arrowButton}>
          <Ionicons name="arrow-forward" size={24} color="#007AFF" />
        </Pressable>
      </LinearGradient>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 20,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
    color: '#666',
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '80%',
    borderRadius: 40,
    paddingHorizontal: 20,
    paddingVertical: 12,
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Courier', 
  },
  arrowButton: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
