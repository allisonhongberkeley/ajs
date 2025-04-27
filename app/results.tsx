import { ThemedView } from "@/components/ThemedView";
import { ImageBackground, StyleSheet, Image, Text, View } from "react-native";
import WarningTag from "@/components/WarningTag";
import { AllergenTag } from '@/components/AllergenTag'; 
import { ScrollView } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useMemo, useRef, useState } from "react";
import { Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useUserPreferences } from '@/utils/preferencesContext';

export default function ResultsScreen( { isSafe, foodImage, foodName} : { isSafe: boolean, foodImage: string, foodName: string}) {
    const { selectedAllergens, selectedRestrictions } = useUserPreferences();
    const [warningIsOpen, setWarningIsOpen] = useState(false);
    const { ingredients, safety, recommendations } = useLocalSearchParams();
    const bottomSheetRef = useRef(null);
    const router = useRouter();

    // const defaultRestrictions = [
    //     'Gluten-Free',
    //     'Keto',
    //     'Vegan',
    //     'Vegetarian',
    //     'Dairy-Free',
    //     'Nut-Free',
    //     'Soy-Free',
    //     'Egg-Free',
    //     'Pescatarian',
    //     'Paleo',
    //     'Halal',
    //     'Kosher',
    //     'Shellfish-Free',
    //     'Sugar-Free',
    //     'Low-Carb',
    //   ];

    // Define snap points (e.g., 25% and 100% of screen)
    const snapPoints = useMemo(() => [warningIsOpen ? '34%' : '300%', '50%'], [warningIsOpen]);

    /* Parse ingredients into list */
    const ingredientList = ingredients
        ? (ingredients as string).split(',').map(item => item.trim())
        : [];
    
    /* Parse non-safe items into list*/
    let nonSafeItems = safety
        ? (safety as string).split(',').map(item => item.trim())
        : [];
    
    const recommendationsList = recommendations
        ? (recommendations as string).split(',').map(item => item.trim())
        : [];

    // Filter out dietary restrictions
    // nonSafeItems = [...new Set(nonSafeItems.filter(item => !defaultRestrictions.includes(item)))];


     /* Separate into allergens vs diets */
    const violatedAllergies = [...new Set((safety as string).split(',').map(item => item.trim()).filter(ingredient => 
        selectedAllergens.some(allergen => 
        ingredient.toLowerCase().includes(allergen.toLowerCase())
        )
    ))];
    
    const violatedDiets = [...new Set(nonSafeItems.filter(ingredient => 
        selectedRestrictions.some(restriction => 
        ingredient.toLowerCase().includes(restriction.toLowerCase())
        )
    ))];

    console.log(nonSafeItems);
    console.log(recommendationsList);

    return (
        <GestureHandlerRootView>
            <ImageBackground source={require('@/assets/images/camera-background.png')} style={styles.container}>
                <WarningTag warningIsOpen={warningIsOpen} setWarningIsOpen={setWarningIsOpen} allergenRestrictions={violatedAllergies} 
  dietaryRestrictions={violatedDiets}/>
                <BottomSheet 
                    ref={bottomSheetRef}
                    index={0} // Initial snap point index (0 = 25%)
                    snapPoints={snapPoints}
                    enablePanDownToClose={true}
                    onClose={() => router.replace('/camera')}
                >
                    <BottomSheetView style={styles.foodInfoContainer}>
                        <ScrollView>
                            <Image source={require('@/assets/images/strawberry.png')} style={styles.foodImage}/>
                            <Text style={styles.foodName}>Food Name</Text>
                        {violatedDiets.map((diet, index) => (
                                <View style={styles.card} key={`violated-diet-${index}`}>
                                <View style={styles.cardHeader}>
                                    <Image
                                    source={require('@/assets/images/glutenfree.png')}
                                    style={styles.dietIcon}
                                    resizeMode="contain"
                                    />
                                    <Text style={styles.cardTitle}>Is Not {diet}</Text>
                                </View>
                                </View>
                        ))}
                            <View style={styles.card}>
                                <View style={styles.cardHeader}>
                                    <Image
                                    source={require('@/assets/images/ingredient.png')} 
                                    style={styles.cardIcon}
                                    />
                                    <Text style={styles.cardTitle}>Ingredients</Text>
                                </View>

                                <View style={styles.tagsWrapper}>
                                    {ingredientList.map((ingredient, index) => {
                                        const isNotSafe = nonSafeItems.includes(ingredient);
                                        return (
                                            <AllergenTag
                                                key={index}
                                                label={ingredient}
                                                selected={isNotSafe} // <--- Selected if NOT in safetyList
                                                variant="allergen"
                                                border={false}
                                            />
                                        );
                                    })}
                                </View>
                            </View>

                            <View style={styles.card}>
                                <View style={styles.cardTop}>
                                    <View style={styles.cardHeader}>
                                        <Image
                                        source={require('@/assets/images/star.png')} 
                                        style={styles.cardIcon}
                                        />
                                        <Text style={styles.cardTitle}>Recommended Items</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.subheaderText}>
                                            Some similar items we recommend instead.
                                        </Text>
                                    </View>
                                </View>
                                
                                <View style={styles.recommendationsContainer}>
                                    <View style={styles.recommendation}>
                                        <Image
                                            source={require('@/assets/images/strawberry.png')}
                                            style={styles.recImage}
                                        />
                                        <Text style={styles.recText}>{recommendationsList[0]}</Text>
                                    </View>
                                    <View style={styles.recommendation}>
                                        <Image
                                            source={require('@/assets/images/strawberry.png')}
                                            style={styles.recImage}
                                        />
                                        <Text style={styles.recText}>{recommendationsList[1]}</Text>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                        
                       
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
    tagsWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 20,
      },
      safetyText: {
        marginTop: 20,
        fontSize: 16,
        fontFamily: 'Space Mono',
        textAlign: 'center',
      },
      card: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#EAEAEE',
        padding: 20,
        marginTop: 24,
      },
      cardTop: {
        flexDirection: 'column',
        gap: 8,
      },
      cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      cardIcon: {
        width: 16,
        height: 16,
        marginRight: 8,
      },
      dietIcon: {
        width: 36,
        height: 36,
        marginRight: 8,
      },
      cardTitle: {
        fontFamily: 'Space Mono',
        fontSize: 16,
        color: '#333',
      },
      subheaderText: {
        color: '#49494A',
        fontFamily: "SF Pro",
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 22,
      },
      recommendationsContainer: {
        flexDirection: 'row',
        gap: 8,
      },
      recommendation: {
        gap: 4,
      },
      recImage: {
        width: 156,
        height: 156,
        flexShrink: 0,
        aspectRatio: 1,
        borderRadius: 12,
        backgroundColor: '#F9F9FB',
        marginTop: 20,
      },
      recText: {
        width: 156,
        color: '#000',
        fontFamily: "Space Mono",
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 22,
        flexWrap: 'wrap',
      },
  });