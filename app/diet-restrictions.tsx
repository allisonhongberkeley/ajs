import { SafeAreaView, View, StyleSheet, Text, TextInput, TouchableOpacity, Image, Keyboard } from 'react-native';
import { useState } from 'react'; 
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { AllergenTag } from '@/components/AllergenTag';
import ProgressBar from '@/components/ProgressBar'; 
import { useUserPreferences } from '@/utils/preferencesContext';

export default function DietRestrictions() {
    const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([
        'Gluten-Free',
        'Keto',
        'Vegan',
        'Vegetarian',
        'Dairy-Free',
        'Nut-Free',
        'Soy-Free',
        'Egg-Free',
        'Pescatarian',
        'Paleo',
        'Halal',
        'Kosher',
        'Shellfish-Free',
        'Sugar-Free',
        'Low-Carb',
      ]);
  const { selectedRestrictions, setSelectedRestrictions } = useUserPreferences();
  const [searchText, setSearchText] = useState('');

  const toggleAllergen = (item: string): void => {
    const newSelectedRestrictions = selectedRestrictions.includes(item)
      ? selectedRestrictions.filter(i => i !== item)
      : [...selectedRestrictions, item];
  
    setSelectedRestrictions(newSelectedRestrictions);
  };
  

  const handleAddCustomAllergen = () => {
    const trimmed = searchText.trim();
    if (trimmed && !dietaryRestrictions.includes(trimmed)) {
      setDietaryRestrictions(prev => [trimmed, ...prev]);
  
      const newSelectedRestrictions = [...selectedRestrictions, trimmed];
      setSelectedRestrictions(newSelectedRestrictions);
    }
    setSearchText('');
    Keyboard.dismiss();
  };
  

  const router = useRouter();

  const handleNext = () => {
    router.push('/diet-restrictions'); 
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
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
          placeholder="Search for specific diets"
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
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
