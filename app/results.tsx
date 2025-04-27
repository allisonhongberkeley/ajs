import { ThemedView } from "@/components/ThemedView";
import { ImageBackground, StyleSheet, Image, Text } from "react-native";
import WarningTag from "@/components/WarningTag";
import { ScrollView } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useMemo, useRef, useState } from "react";
import { Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';

export default function ResultsScreen( { isSafe, foodImage, foodName, foodRestrictions} : { isSafe: boolean, foodImage: string, foodName: string, foodRestrictions: string[] | undefined} ) {
    const [warningIsOpen, setWarningIsOpen] = useState(false);
    const bottomSheetRef = useRef(null);

    // Define snap points (e.g., 25% and 100% of screen)
    const snapPoints = useMemo(() => [warningIsOpen ? '34%' : '300%', '50%'], [warningIsOpen]);
    return (
        <GestureHandlerRootView>
            <ImageBackground source={require('@/assets/images/camera-background.png')} style={styles.container}>
                <WarningTag warningIsOpen={warningIsOpen} setWarningIsOpen={setWarningIsOpen} foodRestrictions={foodRestrictions}/>
                <BottomSheet 
                    ref={bottomSheetRef}
                    index={0} // Initial snap point index (0 = 25%)
                    snapPoints={snapPoints}
                    enablePanDownToClose={false}
                >
                    <BottomSheetView style={styles.foodInfoContainer}>
                        <Image source={require('@/assets/images/strawberry.png')} style={styles.foodImage}/>
                        <Text style={styles.foodName}>Food Name</Text>
                    </BottomSheetView>
                </BottomSheet>
            </ImageBackground>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 236,
      alignItems: 'center',
      gap: 20,
    },
    foodInfoContainer: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 16,
        paddingTop: 44,
        paddingBottom: 38,
        height: '100%',
        width: '100%',
        backgroundColor: '#FFF',
    },
    foodImage: {
        width: '100%',
        height: 187,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#EAEAEE',
        backgroundColor: 'lightgray',
    },
    foodName: {
        color: '#000',
        fontFamily: "Space Mono",
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 22, // 137.5%
        marginTop: 8,
    },
  });