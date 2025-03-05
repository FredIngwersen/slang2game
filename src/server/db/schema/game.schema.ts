import { sql } from "drizzle-orm";
import {
  pgTable,
  varchar,
  text,
  vector,
  integer,
  date,
  doublePrecision,
  index,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { geminiEmbedSize } from "~/lib/utils/geminiEmbed";

export const games = pgTable(
  "games",
  {
    id: integer("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description").notNull(),
    tags: text("tags").array(),
    genres: text("genres").array(),
    platforms: text("platforms")
      .array()
      .notNull()
      .default(sql`'{}'::text[]`),
    released: date("released").notNull(),
    rating: doublePrecision("rating").notNull(),
    ratingTop: doublePrecision("rating_top").notNull(),
    ratingCount: integer("rating_count").notNull(),
    playtime: integer("playtime").notNull(),
    backgroundImage: text("background_image").notNull(),
    embedding: vector("embedding", { dimensions: geminiEmbedSize }).notNull(),
  },
  (table) => [
    index("embeddingIndex").using(
      "hnsw",
      table.embedding.op("vector_cosine_ops"),
    ),
  ],
);

export const gamesInsertSchema = createInsertSchema(games);
export const gamesSelectSchema = createSelectSchema(games);

export type GameModel = z.infer<typeof gamesSelectSchema>;
