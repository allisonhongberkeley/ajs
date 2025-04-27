import { View, StyleSheet, Text, Image, Pressable } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { SignUpButton } from '@/components/SignUpButton'; 
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <Image source={require('@/assets/images/byte.png')} style={styles.logo} />
      <Text style={styles.subtitle}>
        Know before you buy.
      </Text>

      <SignUpButton onPress={() => router.push('/results')} />
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
  Container: {
    marginTop: 20,
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '60%',
    borderRadius: 40,
    paddingHorizontal: 8,
    paddingVertical: 12,
    overflow: 'hidden',
  }
});
