DROP TABLE IF EXISTS attempts CASCADE;
CREATE TABLE attempts (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  qa_id INTEGER REFERENCES qas(id) ON DELETE CASCADE,
  given_answer SMALLINT NOT NULL
);
