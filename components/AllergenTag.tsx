import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AllergenTagProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  variant?: 'allergen' | 'diet';
  border?: boolean; // <-- New prop
}

export function AllergenTag({ label, selected, onPress, variant = 'allergen', border = true }: AllergenTagProps) {
  const isDiet = variant === 'diet';

  const getTagStyles = () => {
    if (!selected) {
      return [styles.tag, border ? styles.withBorder : styles.noBorder];
    }

    if (isDiet) {
      return [
        styles.tag,
        styles.selectedDietTag,
        border ? styles.withDietBorder : styles.noBorder,
      ];
    } else {
      return [
        styles.tag,
        styles.selectedTag,
        border ? styles.withAllergenBorder : styles.noBorder,
      ];
    }
  };

  return (
    <TouchableOpacity
      style={getTagStyles()}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        {selected && (
          <Ionicons
            name="close"
            size={16}
            color={isDiet ? '#FF8F3A' : '#D9534F'}
          />
        )}
        <Text style={styles.text}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F9F9F9',
  },
  withBorder: {
    borderWidth: 1,
    borderColor: '#EFEFF1',
  },
  noBorder: {
    borderWidth: 0,
  },
  selectedTag: {
    backgroundColor: '#FEECEC',
  },
  selectedDietTag: {
    backgroundColor: '#FFF7EA',
  },
  withAllergenBorder: {
    borderWidth: 1,
    borderColor: '#F3A6A6',
  },
  withDietBorder: {
    borderWidth: 1,
    borderColor: '#FFD7A8',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  text: {
    fontSize: 14,
    color: '#555',
    fontFamily: 'Space Mono',
  },
});
