import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { ThemedView } from "./ThemedView";
import { AllergenTag } from "./AllergenTag";

interface WarningTagProps {
  warningIsOpen: boolean;
  setWarningIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  allergenRestrictions: string[];
  dietaryRestrictions: string[];
}

export default function WarningTag({
  warningIsOpen,
  setWarningIsOpen,
  allergenRestrictions,
  dietaryRestrictions,
}: WarningTagProps) {
  const firstItem = allergenRestrictions[0] || dietaryRestrictions[0] || '';

  return (
    <ThemedView style={warningIsOpen ? styles.openedDropdown : styles.unOpenedDropdown}>
      <ThemedView style={warningIsOpen ? styles.openedContainer : styles.unOpenedContainer}>
        <ThemedView style={styles.textContainer}>
          <Image source={require('@/assets/images/warning.png')} />
          <Text style={styles.containsText}>Contains</Text>
          {!warningIsOpen && (
            <AllergenTag
              label={firstItem}
              selected={true}
              variant={allergenRestrictions.includes(firstItem) ? 'allergen' : 'diet'}
              border={false}
            />
          )}
        </ThemedView>
        <TouchableOpacity onPress={() => setWarningIsOpen(!warningIsOpen)}>
          <Image source={require('@/assets/images/open-dropdown.png')} />
        </TouchableOpacity>
      </ThemedView>

      {warningIsOpen && (
        <ThemedView style={styles.avoidContainer}>
          <Text style={styles.avoidText}>Avoid this product</Text>

          <ThemedView style={styles.allergenTagContainer}>
            {allergenRestrictions.map((item, index) => (
              <AllergenTag
                key={`allergen-${index}`}
                label={item}
                selected={true}
                variant="allergen"
                border={false}
              />
            ))}
            {dietaryRestrictions.map((item, index) => (
              <AllergenTag
                key={`diet-${index}`}
                label={item}
                selected={true}
                variant="diet"
                border={false}
              />
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