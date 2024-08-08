CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" uuid DEFAULT gen_random_uuid(),
	"tstamp" timestamp DEFAULT now(),
	"username" text NOT NULL,
	"token" text NOT NULL,
	"email" text NOT NULL,
	"dateJoined" date DEFAULT now(),
	"other" json DEFAULT '{}'::json,
	"password" text NOT NULL,
	"isActive" boolean DEFAULT true,
	CONSTRAINT "users_userId_unique" UNIQUE("userId"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
