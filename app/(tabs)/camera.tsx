import { ThemedView } from "@/components/ThemedView";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Image, ImageBackground, View, Text } from "react-native";
import { Camera, CameraView } from 'expo-camera';

export default function CameraScreen() {
    const cameraRef = useRef<CameraView>(null);
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  
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
    return (
        <ImageBackground source={require('@/assets/images/camera-background.png')} style={styles.container}>
            <ThemedView style={styles.camera}>
            <CameraView 
                ref={cameraRef} 
                style={StyleSheet.absoluteFillObject}
                />
            </ThemedView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    camera: {
        flexShrink: 0,
        width: 360,
        height: 527,
        borderRadius: 20,
        borderWidth: 4,
        borderColor: '#fff',
        overflow: 'hidden', // THIS is the magic
    }
});
