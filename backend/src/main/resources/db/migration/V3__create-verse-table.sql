CREATE TABLE verse(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    line VARCHAR(100) NOT NULL,
    stanza_id UUID,
    FOREIGN KEY (stanza_id) REFERENCES stanza(id) ON DELETE CASCADE
);