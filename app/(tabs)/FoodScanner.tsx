import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";

export default function FoodScanner() {
    return (
        <ThemedView style={styles.container}>hi</ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});