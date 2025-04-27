import { CameraProfileToggle } from '@/components/CameraProfileToggle';
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Image, ImageBackground, View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Camera, CameraView } from 'expo-camera';
import { useRouter } from 'expo-router';
import { queryFoodName, queryIngredients, queryRecommendations, querySafety } from '@/api/GeminiAPI/query';
import { useUserPreferences } from '@/utils/preferencesContext';

export default function CameraScreen() {
    const cameraRef = useRef<CameraView>(null);
    const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const { selectedAllergens: allergies, selectedRestrictions: dietaryRestrictions} = useUserPreferences();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    
    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
  
    if (hasPermission === null) {
      return <View><Text>Requesting permissions...</Text></View>;
    }
    if (hasPermission === false) {
      return <View><Text>No camera access</Text></View>;
    }

    const handleTakePhoto = async () => {
      if (cameraRef.current) {
        try {
          const photo = await cameraRef.current.takePictureAsync();
          if (photo && photo.uri) {
            setCapturedPhoto(photo.uri);
            /* After the photo is taken, parse ingredients*/
            analyzeIngredients(photo.uri);
          } else {
            console.error('No photo captured');
          }
        } catch (error) {
          console.error('Failed to take photo', error);
        }
      }
    };

    const analyzeIngredients = async(uri: string) => {
      setLoading(true);
      const ingredients = await queryIngredients(uri);
      const safety = await querySafety({ ingredients, allergies, dietaryRestrictions });
      const isSafe = safety?.split(",")[0] === "Yes";
      const foodName = await queryFoodName(uri);
      let recommendations;
      if (!isSafe) {
        recommendations = (await queryRecommendations({ foodName: foodName, allergies, dietaryRestrictions })).split(",");
      }
      setLoading(false);
      router.push({
        pathname: '/results',
        params: {
          ingredients: ingredients,
          safety: safety,
          recommendations: recommendations,
        },
      });
    };

    return (
        <ImageBackground source={require('@/assets/images/camera-background.png')} style={styles.container}>
            <ThemedView style={styles.camera}>
            {capturedPhoto ? (
                <Image
                  source={{ uri: capturedPhoto }}
                  style={StyleSheet.absoluteFillObject}
                />
                ) : (
                <CameraView
                  ref={cameraRef}
                  style={StyleSheet.absoluteFillObject}
                />
            )}

            </ThemedView>

            <View style={styles.actionContainer}>
              {loading ? (
                <ActivityIndicator size="large" color="#000" />
              ) : (
                <TouchableOpacity onPress={handleTakePhoto}>
                  <Image
                    source={require('@/assets/images/click.png')}
                    style={styles.nextIcon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )}
            </View>

            <CameraProfileToggle/>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 109,
      position: 'relative',
  },
  camera: {
      flexShrink: 0,
      width: 360,
      height: 527,
      borderRadius: 20,
      borderWidth: 4,
      borderColor: '#fff',
      overflow: 'hidden',
  },
  instructionText: {
      marginTop: 16,
      fontSize: 18,
      color: 'white',
      fontWeight: '600',
      textAlign: 'center',
  },
  toggleContainer: {
      position: 'absolute',
      bottom: 40,
      flexDirection: 'row',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: 30,
      overflow: 'hidden',
  },
  toggleButton: {
      paddingVertical: 12,
      paddingHorizontal: 20,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
  },
  nextIcon: {
    height: 48,
    width: 48,
  },
  actionContainer: {
    marginTop: 24, 
    alignItems: 'center',
  },
});