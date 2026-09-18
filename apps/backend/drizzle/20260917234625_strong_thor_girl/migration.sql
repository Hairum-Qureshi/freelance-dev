CREATE TABLE "chats" (
	"id" bigint PRIMARY KEY,
	"participants" bigint[] DEFAULT '{1}'::bigint[],
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
