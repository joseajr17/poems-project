CREATE TABLE photo(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255),
    url TEXT NOT NULL
);