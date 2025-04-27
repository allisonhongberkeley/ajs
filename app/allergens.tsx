import { SafeAreaView, View, StyleSheet, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react'; 
import { Keyboard } from 'react-native'; 
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { AllergenTag } from '@/components/AllergenTag';
import ProgressBar from '@/components/ProgressBar'; 
import { useUserPreferences } from '@/utils/preferencesContext';


export default function AllergensScreen() {
    const { selectedAllergens, setSelectedAllergens, customAllergens, setCustomAllergens } = useUserPreferences();
    const [searchText, setSearchText] = useState('');
  
    const defaultAllergens = [
      'Peanuts', 'All Tree Nuts', 'Soy', 'Eggs', 'Milk/Dairy', 'Wheat', 'Walnuts', 'Cashews',
    ];
  
    const allAllergens = [...customAllergens, ...defaultAllergens]; // ← combined list
  
    const toggleAllergen = (item: string): void => {
      const newSelected = selectedAllergens.includes(item)
        ? selectedAllergens.filter(i => i !== item)
        : [...selectedAllergens, item];
  
      setSelectedAllergens(newSelected);
    };
  
    const handleAddCustomAllergen = () => {
        const trimmed = searchText.trim();
        if (trimmed && !allAllergens.includes(trimmed)) {
          const newCustomAllergens = [trimmed, ...customAllergens];
          const newSelectedAllergens = [...selectedAllergens, trimmed];
      
          setCustomAllergens(newCustomAllergens);
          setSelectedAllergens(newSelectedAllergens);
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
    <ProgressBar step={1} />

    <View style={styles.titleContainer}>
      <Text style={styles.title}>I'm allergic to...</Text>
      <Text style={styles.subtitle}>Select your allergies.</Text>
    </View>

      <View style={styles.divider} />

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for specific allergens"
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleAddCustomAllergen}
          returnKeyType="done"
        />
      </View>

      <View style={styles.allergensContainer}>
        <View style={styles.tagsWrapper}>
          {allAllergens.map((item) => (
            <AllergenTag
              key={item}
              label={item}
              selected={selectedAllergens.includes(item)}
              onPress={() => toggleAllergen(item)}
              variant="allergen"
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
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
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
    borderColor: 'none',     
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    width: '100%',
    marginVertical: 16, 
  },
  allergensContainer: {
    display: 'flex',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EFEFF1',
    marginTop: 20,
  },
  tagsWrapper: {
    flexDirection: 'row',
    gap: 10,
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
