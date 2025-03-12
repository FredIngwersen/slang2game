import { ContentEmbedding, GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "~/env";
const genAI = new GoogleGenerativeAI(env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({
  model: "text-embedding-004",
});

export const geminiEmbedSize = 768;

export const embedGameText = async (
  description: string,
  genres?: string[],
  tags?: string[],
): Promise<ContentEmbedding> => {
  // Construct a string that includes description, genres and tags
  let textToEmbed = description;

  if (genres && genres.length > 0) {
    textToEmbed += "\n\nGenres: " + genres.join(", ");
  }

  if (tags && tags.length > 0) {
    textToEmbed += "\n\nTags: " + tags.join(", ");
  }

  const result = await model.embedContent(textToEmbed);
  return result.embedding;
};
