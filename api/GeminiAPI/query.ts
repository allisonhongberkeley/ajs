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
                Give me a list of the most important (at most 10) ingredients in command separated form. 
                Please do not include random chemicals, only the most important ingredients.
                Each ingredient should easy-to-read and no more than 2 words.
                Please keep ingredient names simple and consistent. For example, Peanuts should not be 
                rewritten as Roasted Peanuts or another form. 
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
      
      1. Based on the ingredients, list the subset of ingredients that trigger allergies. 
      All output allergies must be from the ingredients list. 
      2. Also list the dietary restrictions that are violated (e.g., Gluten-Free, Vegan, etc).
      All output dietary restrictions must be from the dietary restrictions list.
      
      Please format your output in one comma-separated list sections:
      The comma-separated list should contain both triggered allergies
      and violated dietary restrictions. 

      Please keep ingredient names simple and consistent. For example, Peanuts should not be 
      rewritten as Roasted Peanuts or another form. 

      If there are none, return an empty string.
    `.trim();

    
    console.log(prompt);
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
    });
    console.log(response.text);
    return response.text ?? "";
}
