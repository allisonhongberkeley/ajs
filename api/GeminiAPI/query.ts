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
        const prompt = 
            `What are the ingredients of the food in the image?
            Each ingredient should easy-to-read and no more than two words.
            Do not include ingredients that are contained in parantheses or brackets.
            Please ignore any other text in the image besides the ingredients list.
            Please ignore any text that is not related to the ingredients.
            If the ingredients label is not visible, don't return anything.
            If the image is not a food, don't return anything.
            Please return the ingredients in comma-separated format.
            Please return at most 10 ingredients.
            Please capitalize the first letter of every word.
            Do not include any other text or explanation.
            Do not include any periods or other punctuation marks.
            Do not include duplicates.
            Please keep ingredient names simple and consistent. For example, Peanuts should not be 
            rewritten as Roasted Peanuts or another form.`
            .trim();
    
        const geminiResponse = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: [
            createUserContent([
              prompt,
              createPartFromUri(image.uri ?? "", image.mimeType ?? ""),
            ]),
          ],
        });
    
        //console.log(geminiResponse.text);
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
        Answer Yes or No. If no, give me a list of the ingredients I cannot consume.
        Please also list the allergies and dietary restrictions that are violated.
        All allergies must be from the ingredients list.
        All output dietary restrictions must be from the dietary restrictions list.
        Please format the answer as a in comma-separated format, with the first element
        being Yes or No, and the rest being the ingredients I cannot consume, 
        the allergies that are violated, and the dietary restrictions that are violated.
        Please capitalize the first letter of every word.
        Do not include any other text or explanation.
        Do not include any periods or other punctuation marks.
        Do not include duplicates.
        Please keep ingredient names simple and consistent. For example, Peanuts should not be 
        rewritten as Roasted Peanuts or another form.`
        .trim();
    
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
    });
    // console.log(response.text);
    return response.text;
}

export async function queryFoodName(photoUri: string) {
  try {
      const response = await fetch(photoUri);
      const blob = await response.blob();
      const image = await ai.files.upload({ file: blob });
      const prompt = 
          `Based on the ingredients in the image, what is the name of the food?
          Please return the name of the food.
          Please capitalize the first letter of every word.
          Do not include any other text or explanation.
          Do not include any periods or other punctuation marks.
          Do not include duplicates.`
          .trim();

      const geminiResponse = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [
          createUserContent([
            prompt,
            createPartFromUri(image.uri ?? "", image.mimeType ?? ""),
          ]),
        ],
      });

      console.log(geminiResponse.text);
      return geminiResponse.text ?? "";
    } catch (error) {
      console.error('Error uploading to Gemini:', error);
      throw error;
  };
}

export async function queryRecommendations({foodName, allergies, dietaryRestrictions} : {foodName: string, allergies: string[], dietaryRestrictions: string[]}) {
    const prompt = 
        `I have the following allergies/dietary restrictions: ${[...allergies, ...dietaryRestrictions].join(', ')}.
        I want to eat ${foodName}.
        Please give me two alternatives that are similar to ${foodName} and are safe for me to eat.
        Please format the answer as in comma-separated format.
        Please capitalize the first letter of every word.
        Do not include any other text or explanation.
        Do not include any periods or other punctuation marks.
        Do not include duplicates.`
        .trim();
    
    console.log(prompt);

    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
    });
    console.log(response.text);
    return response.text ?? "";
}
