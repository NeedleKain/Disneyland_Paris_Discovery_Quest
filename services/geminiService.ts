

import { GoogleGenAI } from "@google/genai";
import type { Riddle } from '../types.ts';

export const generateMagicImageHint = async (riddle: Riddle): Promise<string | null> => {
  if (!process.env.API_KEY) {
    console.error("Clé API non configurée. Impossible de générer l'indice visuel.");
    return null;
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const prompt = `Generate a beautiful, magical, and artistic image that serves as a visual hint for a riddle in Disneyland Paris. The image must be in the style of a sketch drawing ("croquis").
    The theme is related to: "${riddle.locationName}".
    The riddle is: "${riddle.question}".
    Create an image that hints at the feeling of this location, as if it were a pencil or charcoal sketch on old parchment paper. It should be mysterious and evocative, like a page from an ancient explorer's journal, not a direct representation of the answer. For example, for "Pirates of the Caribbean", you could generate a sketch of an old treasure map with a skull, a ghostly ship in a misty cove, or a talking parrot with a pirate hat.
    Style: sketch drawing, pencil on paper, charcoal sketch, monochrome with sepia tones, mysterious, ancient journal style.
    Do NOT include any text, letters, or numbers. The image must be purely visual.`;

    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '1:1',
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    }
    console.warn("La génération d'image n'a retourné aucune image.");
    return null;
  } catch (error) {
    console.error("Erreur lors de l'appel à l'API Gemini pour la génération d'image:", error);
    return null;
  }
};
