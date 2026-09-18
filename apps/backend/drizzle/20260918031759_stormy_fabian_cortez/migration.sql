CREATE TABLE "messages" (
	"id" bigint PRIMARY KEY,
	"chat_id" bigint NOT NULL,
	"sender_id" bigint NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
