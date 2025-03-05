import { pgTable, varchar, text } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { type z } from "zod";
import { defaultRows } from "~/server/db/schema/shared";

export const moods = pgTable("moods", {
  ...defaultRows,
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
});

export const moodsInsertSchema = createInsertSchema(moods);
export const moodsSelectSchema = createSelectSchema(moods);

export type MoodModel = z.infer<typeof moodsSelectSchema>;
