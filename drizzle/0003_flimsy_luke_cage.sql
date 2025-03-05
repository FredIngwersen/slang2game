ALTER TABLE "games" ADD COLUMN "background_image" text NOT NULL;--> statement-breakpoint
CREATE INDEX "embeddingIndex" ON "games" USING hnsw ("embedding" vector_cosine_ops);