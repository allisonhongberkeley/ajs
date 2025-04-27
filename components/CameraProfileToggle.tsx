import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';

export function CameraProfileToggle() {
  const router = useRouter();
  const pathname = usePathname();

  const isCameraActive = pathname === '/camera';
  const isProfileActive = pathname === '/profile';

  const handleCameraPress = () => {
    if (!isCameraActive) {
      router.replace('/camera');
    }
  };

  const handleProfilePress = () => {
    if (!isProfileActive) {
      router.push('/profile');
    }
  };

  return (
    <View style={styles.toggleContainer}>
      <TouchableOpacity style={styles.iconWrapper} onPress={handleCameraPress}>
        <View style={[styles.iconCircle, isCameraActive && styles.activeCircle]}>
          <Ionicons 
            name="camera-outline" 
            size={24} 
            color={isCameraActive ? 'white' : 'black'} 
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconWrapper} onPress={handleProfilePress}>
        <View style={[styles.iconCircle, isProfileActive && styles.activeCircle]}>
          <Ionicons 
            name="person-outline" 
            size={24} 
            color={isProfileActive ? 'white' : 'black'} 
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  toggleContainer: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    backgroundColor: 'white', // white pill container
    borderRadius: 30,
    padding: 4,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  iconWrapper: {
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
  iconCircle: {
    backgroundColor: 'transparent',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeCircle: {
    backgroundColor: 'black',
  },
});
