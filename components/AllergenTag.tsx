import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // <-- Add this import

interface AllergenTagProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  variant?: 'allergen' | 'diet'; 
}

export function AllergenTag({ label, selected, onPress, variant = 'allergen' }: AllergenTagProps) {
    const isDiet = variant === 'diet';
  
    return (
      <TouchableOpacity
        style={[
          styles.tag,
          selected && (isDiet ? styles.selectedDietTag : styles.selectedTag)
        ]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.content}>
          {selected && (
            <Ionicons
              name="close"
              size={16}
              color={isDiet ? '#FF8F3A' : '#D9534F'} // orange if diet, red if allergen
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
    borderWidth: 1,
    borderColor: '#EFEFF1',
    margin: 5,
  },
  selectedTag: {
    backgroundColor: '#FEECEC',
    borderColor: '#F3A6A6',
  },
  selectedDietTag: {
    backgroundColor: '#FFF7EA',
    borderColor: '#FFD7A8',
  },  
  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  text: {
    fontSize: 14,
    color: '#555',
    fontFamily: 'Space Mono',
  }
});
