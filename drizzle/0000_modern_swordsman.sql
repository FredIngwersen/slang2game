CREATE TABLE IF NOT EXISTS "moods" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	"name" varchar(255) NOT NULL,
	"description" text NOT NULL
);
