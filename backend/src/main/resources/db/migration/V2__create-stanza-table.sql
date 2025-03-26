
CREATE TABLE stanza(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    poem_id UUID,
    FOREIGN KEY (poem_id) REFERENCES poem(id) ON DELETE CASCADE
);