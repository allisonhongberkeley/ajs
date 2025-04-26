import {
    GoogleGenAI,
    createUserContent,
    createPartFromUri,
} from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY });

export async function queryIngredients() {
    const image = await ai.files.upload({
        file: "/Users/jjunseol04/Desktop/ajs/cheetos.png",
    });
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [
        createUserContent([
            "What are the ingredients of the food in the image?",
            createPartFromUri(image.uri ?? "", image.mimeType ?? ""),
        ]),
        ],
    });
    console.log(response.text);
}

export async function querySafety({ingredients} : {ingredients: string}) {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: "Using these ingredients, is it safe to eat? " + ingredients,
    });
    console.log(response.text);
}
