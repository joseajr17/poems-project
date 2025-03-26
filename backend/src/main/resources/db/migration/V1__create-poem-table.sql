CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE poem(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL,
    date TIMESTAMP NOT NULL
);