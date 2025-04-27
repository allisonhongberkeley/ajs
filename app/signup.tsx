import { StyleSheet, TextInput, Button, Alert, Image } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router'; 

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import signup from '../utils/authUtils';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); 

  const handleSignUp = async () => {
    try {
      await signup(email, password);
      Alert.alert('Success!', 'User created successfully.');
      router.push('/allergens');
    } catch (error: any) {
      Alert.alert('Signup Error', error.message);
      setError(error.message);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Image source={require('@/assets/images/byte.png')} />

      <TextInput
        placeholder="Sign up with email"
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="*********"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Sign Up" onPress={handleSignUp} />

      {error}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    marginHorizontal: 20,
    marginTop: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(26, 163, 255, 0.7)', 
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#F1F8FF',
  },  
});
