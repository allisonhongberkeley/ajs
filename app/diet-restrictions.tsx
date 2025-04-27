import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react'; 
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { AllergenTag } from '@/components/AllergenTag';
import ProgressBar from '@/components/ProgressBar'; // adjust path if needed

export default function DietRestrictions() {
    const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([
        'Gluten-Free',
        'Vegan',
        'Vegetarian',
        'Dairy-Free',
        'Nut-Free',
        'Soy-Free',
        'Egg-Free',
        'Pescatarian',
        'Keto',
        'Paleo',
        'Low FODMAP',
        'Halal',
        'Kosher',
        'Shellfish-Free',
        'Sugar-Free',
        'Low-Carb',
      ]);
  const [selectedRestrictions, setselectedRestrictions] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');

  const toggleAllergen = (item: string) => {
    setselectedRestrictions(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const handleAddCustomAllergen = () => {
    const trimmed = searchText.trim();
    if (trimmed && !dietaryRestrictions.includes(trimmed)) {
      setDietaryRestrictions(prev => [trimmed, ...prev]);
      setselectedRestrictions(prev => [...prev, trimmed]);
    }
    setSearchText('');
  };

  const router = useRouter();

  const handleNext = () => {
    router.push('/diet-restrictions'); 
  };

  return (
    <ThemedView style={styles.container}>
    <ProgressBar step={2} />

    <View style={styles.titleContainer}>
      <Text style={styles.title}>My Diet Restrictions</Text>
      <Text style={styles.subtitle}>Select your dietary restrictions/foods you want to avoid.</Text>
    </View>

      <View style={styles.divider} />

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for specific dietaryRestrictions"
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleAddCustomAllergen}
          returnKeyType="done"
        />
      </View>

      <View style={styles.dietaryRestrictionsContainer}>
        <View style={styles.tagsWrapper}>
          {dietaryRestrictions.map((item) => (
            <AllergenTag
              key={item}
              label={item}
              selected={selectedRestrictions.includes(item)}
              onPress={() => toggleAllergen(item)}
              variant='diet'
            />
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Image
          source={require('@/assets/images/next.png')}
          style={styles.nextIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: 'white',
    position: 'relative', 
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 400,
    fontFamily: "Space Mono",
    lineHeight: 22,
  },
  subtitle: {
    fontFamily: "SF Pro",
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22,
    color: '#A9A9A9', 
    marginBottom: 8,
  },  
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 8,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    borderWidth: 0,     
    outline: 'none', 
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    width: '100%',
    marginVertical: 16, 
  },
  dietaryRestrictionsContainer: {
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EFEFF1',
    marginTop: 20,
  },
  tagsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  nextButton: {
    marginTop: 20,
    alignSelf: 'flex-end', 
    backgroundColor: 'transparent',
  },
  nextIcon: {
    width: 50,
    height: 50,
  },
});
