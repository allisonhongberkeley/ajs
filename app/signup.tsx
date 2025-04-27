import { StyleSheet, TextInput, Button, Alert, Image, Text, View } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router'; 
import { Ionicons } from '@expo/vector-icons'; // <-- ADD THIS for icons
import { ThemedView } from '@/components/ThemedView';
import { SignUpButton } from '@/components/SignUpButton';
import signup from '../utils/authUtils';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
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
      <Image source={require('@/assets/images/byte.png')} style={styles.byte}/>
      <Image source={require('@/assets/gifs/signupbg.gif')} style={styles.logo} />

      <Text style={styles.subtitle}>
        Let’s get started by making an account.
      </Text>

      <View style={[styles.inputWrapper, emailFocused && styles.inputWrapperFocused]}>
  <Ionicons name="mail-outline" size={20} color="#999" style={styles.inputIcon} />
  <TextInput
    placeholder="Sign up with Email"
    placeholderTextColor="#999"
    style={styles.input}
    autoCapitalize="none"
    keyboardType="email-address"
    value={email}
    onChangeText={setEmail}
    onFocus={() => setEmailFocused(true)}
    onBlur={() => setEmailFocused(false)}
  />
</View>


<View style={[styles.inputWrapper, passwordFocused && styles.inputWrapperFocused]}>
  <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.inputIcon} />
  <TextInput
    placeholder="*********"
    placeholderTextColor="#999"
    style={styles.input}
    secureTextEntry
    value={password}
    onChangeText={setPassword}
    onFocus={() => setPasswordFocused(true)}
    onBlur={() => setPasswordFocused(false)}
  />
</View>


      <SignUpButton onPress={handleSignUp} />

      {error && <Text style={styles.error}>{error}</Text>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 200,
    gap: 8,
  },
  byte: {
    width: 180,
    // height: 200,
    resizeMode: 'contain',
    marginBottom: 0,
  },
  logo: {
    position: 'absolute', 
    bottom: 0,             
    alignSelf: 'center',   
    width: 300,            
    height: 300,           
    resizeMode: 'contain',
  },  
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginVertical: 32,
    marginTop: -52,
    width: 200,
    fontFamily: 'SF Pro', // optional
  },
  inputWrapper: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9FB', // background gray
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0, // no border by default
  },
  inputWrapperFocused: {
    borderWidth: 1,
    borderColor: 'rgba(26, 163, 255, 0.8)', 
    backgroundColor: '#F1F8FF',
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 8,
    borderWidth: 0, // remove inner TextInput border always
  },
  error: {
    color: 'red',
    marginTop: 10,
    fontSize: 14,
  },
});
