import { Pinecone } from "@pinecone-database/pinecone";
import { env } from "~/env";

const pc = new Pinecone({
  apiKey: env.PINECONE_API_KEY,
});

const indexName = "games";

export const index = pc.Index(indexName);
