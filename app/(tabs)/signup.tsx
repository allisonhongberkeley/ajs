import { StyleSheet, TextInput, Button, Alert } from 'react-native';
import { useState } from 'react';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import signup from '../../utils/authUtils';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      await signup(email, password);
      Alert.alert('Success!', 'User created successfully.');
    } catch (error: any) {
      Alert.alert('Signup Error', error.message);
    }
  };

  return (
    <
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title">Create Account</ThemedText>

        <TextInput
          placeholder="Email"
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Button title="Sign Up" onPress={handleSignUp} />
      </ThemedView>
    </>
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
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
});
