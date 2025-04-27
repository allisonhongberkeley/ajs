import { View, StyleSheet, Text, Image, Pressable } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { SignUpButton } from '@/components/SignUpButton'; 
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <Image
        source={require('@/assets/images/circlebg.png')}
        style={styles.footerImage}
        resizeMode="contain"
      />

      {/* Main Content */}
      <Image 
        source={require('@/assets/gifs/index.gif')} 
        style={styles.logo} 
      />

      <SignUpButton onPress={() => router.push('/signup')} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
    gap: 20,
  },
  logo: {
    width: 450,
    height: 450,
    marginBottom: 20,
    marginRight: 40,
    marginTop: 100,
    resizeMode: 'contain',
  },
  // subtitle: {
  //   fontSize: 16,
  //   textAlign: 'center',
  //   marginVertical: 10,
  //   color: '#666',
  // },
  footerImage: {
    position: 'absolute',
    bottom: -100,
    alignSelf: 'center',
    width: 450, 
    height: 450, 
    zIndex: 0, 
    resizeMode: 'contain',
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
