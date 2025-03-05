CREATE TABLE "games" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"tags" text[],
	"genres" text[],
	"platforms" text[],
	"released" date NOT NULL,
	"rating" double precision NOT NULL,
	"rating_top" double precision NOT NULL,
	"rating_count" integer NOT NULL,
	"playtime" integer NOT NULL,
	"embedding" vector(768) NOT NULL
);
--> statement-breakpoint
DROP TABLE "moods" CASCADE;