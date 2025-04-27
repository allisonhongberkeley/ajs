import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from "react-native";
import { ThemedView } from "./ThemedView";
import { AllergenTag } from "./AllergenTag";
import { useState } from "react";

export default function WarningTag( {warningIsOpen, setWarningIsOpen, foodRestrictions}: {warningIsOpen: boolean, setWarningIsOpen: React.Dispatch<React.SetStateAction<boolean>>, foodRestrictions: string[] | undefined} ) {

    return (
        <ThemedView style={warningIsOpen ? styles.openedDropdown : styles.unOpenedDropdown}>
            <ThemedView style={warningIsOpen ? styles.openedContainer : styles.unOpenedContainer}>
                <ThemedView style={styles.textContainer}>
                    <Image source={require('@/assets/images/warning.png')} />
                    <Text style={styles.containsText}>Contains</Text>
                    {!warningIsOpen && <AllergenTag label={foodRestrictions?.[0] ?? ''} selected={true} />}
                </ThemedView>
                <TouchableOpacity onPress={() => setWarningIsOpen(!warningIsOpen)}>
                    <Image source={require('@/assets/images/open-dropdown.png')} />
                </TouchableOpacity>
            </ThemedView>
            {warningIsOpen && (
                <ThemedView style={styles.avoidContainer}>
                    <Text style={styles.avoidText}>Avoid this product</Text>
                    <ThemedView style={styles.allergenTagContainer}>
                        {foodRestrictions?.map((allergen, index) => (
                            <AllergenTag key={index} label={allergen} selected={true} border={false} />
                        ))}
                    </ThemedView>
                </ThemedView>
            )}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    unOpenedDropdown: {
        width: 375,
        height: 72,
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 20,
        backgroundColor: '#FFF',
    },
    openedDropdown:{
        width: 375,
        minHeight: 208,
        paddingHorizontal: 24,
        paddingVertical: 20,
        borderRadius: 20,
        backgroundColor: '#FFF',
        gap: 56,
    },
    unOpenedContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    openedContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    textContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },
    containsText: {
        color: "#000",
        textAlign: "center",
        fontFamily: "Space Mono",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: 22, // 137.5%
    },
    avoidContainer: {
        gap: 12,
    },
    avoidText: {
        color: "#000",
        fontFamily: "Space Mono",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: 22, // 137.5%
    },
    allergenTagContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    }
  });