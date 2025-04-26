import { Image, StyleSheet, Platform, Button, Alert } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import * as ImagePicker from 'expo-image-picker';

import {
    GoogleGenAI,
} from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY });

export default function ImageOpener() {
    const pickImage = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Camera permission needed');
            return;
        }
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: false,
            quality: 1,
            base64: true,
        });
        
        if (!result.canceled) {
            console.log("hello")
            const base64Image = result.assets[0].base64;
            // Send this image to OCR or Gemini
            let response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: [
                {
                inlineData: {
                    mimeType: 'image/png',
                    data: base64Image,
                },
                },
                { text: "Return the ingredients of the food in the image" }
            ],
            });
            const ingredientsList = response.text
            const prompt = `
                You are a food safety and nutrition expert.

                Given:
                - A list of food ingredients.
                - A list of user allergies and/or dietary restrictions.

                Task:
                1. Identify which ingredients are unsafe based on the user's allergies or restrictions.
                2. For each unsafe ingredient, suggest safe substitutes that the user could consider.

                Be cautious: if an ingredient might possibly trigger an allergy or conflict with a restriction, treat it as unsafe.

                Output Format:
                - Unsafe Ingredients: [list with reason]
                - Suggested Substitutes: [list with explanations]

                Ingredients:
                ${ingredientsList}

                User Allergies/Restrictions:
                peanuts, dairy
            `;
            console.log(response.text);

            response = await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: prompt,
            });
            console.log(response.text);
        }
    };
    return (
        <Button title="Pick an image" />
    )
}