import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface SignUpButtonProps {
  onPress: () => void;
}

export function SignUpButton({ onPress }: SignUpButtonProps) {
  return (
    <LinearGradient
      colors={['rgba(26, 163, 255, 0.8)', 'rgba(216, 219, 231, 0.8)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.buttonContainer}
    >
      <View style={styles.signUp}>
        <Text style={styles.buttonText}>Sign up</Text>

        <Image
          source={require('@/assets/images/happy.png')}
          style={styles.happyIcon}
          resizeMode="contain"
        />
      </View>

      <Pressable onPress={onPress} style={styles.arrowButton}>
        <Ionicons name="arrow-forward" size={24} color="#1AA3FF" />
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '60%',
    borderRadius: 40,
    paddingHorizontal: 8,
    paddingVertical: 12,
    overflow: 'hidden',
  },
  signUp: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Courier',
  },
  happyIcon: {
    width: 24,
    height: 24,
    marginLeft: 8,
    alignSelf: 'center',
  },
  arrowButton: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
