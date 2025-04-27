import {
    GoogleGenAI,
    createUserContent,
    createPartFromUri,
} from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY });

export async function queryIngredients(photoUri: string) {
    try {
        const response = await fetch(photoUri);
        const blob = await response.blob();
        const image = await ai.files.upload({ file: blob });
    
        const geminiResponse = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: [
            createUserContent([
                `What are the ingredients of the food in the image? 
                Give me a list of the most importamt ingredients in command separated form. 
                Please do not include random chemicals, only the most important ingredients.
                Each ingredient should easy-to-read and no more than two words.
                If the ingredients label is not visible, don't return anything.`,
              createPartFromUri(image.uri ?? "", image.mimeType ?? ""),
            ]),
          ],
        });
    
        return geminiResponse.text ?? "";
      } catch (error) {
        console.error('Error uploading to Gemini:', error);
        throw error;
    };
}

export async function querySafety({ingredients, allergies, dietaryRestrictions} : {ingredients: string, allergies: string[], dietaryRestrictions: string[]}) {
    const prompt = 
        `I have the following allergies: ${allergies.join(', ')}.
        I follow these dietary restrictions: ${dietaryRestrictions.join(', ')}.
        Here are the product ingredients: ${ingredients}.
        Based on this, is it safe for me to eat this product? 
        Answer Yes or No. If no, give me a list of the ingredients I cannot consume`
        .trim();
    
    console.log(prompt);
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
    });
    console.log(response.text);
    return response.text;
}
