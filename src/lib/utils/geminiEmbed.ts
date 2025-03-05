import { ContentEmbedding, GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "~/env";
const genAI = new GoogleGenerativeAI(env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({
  model: "text-embedding-004",
});

export const geminiEmbedSize = 768;

export const embedGameText = async (
  description: string,
): Promise<ContentEmbedding> => {
  const result = await model.embedContent(description);
  return result.embedding;
};
