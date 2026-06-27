
CREATE TABLE IF NOT EXISTS survey_responses (
  id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at    TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  name          TEXT NOT NULL,
  contact_method TEXT NOT NULL CHECK (contact_method IN ('email', 'mobile')),
  contact_value TEXT NOT NULL,
  answers       JSONB DEFAULT '{}'::jsonb
);

-- Add a comment for documentation
COMMENT ON TABLE survey_responses IS 'Stores questionnaire submissions from the Clarity Study landing page.';

-- Enable Row Level Security (required for Supabase anon key access)
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (anyone can submit the form)
CREATE POLICY "Allow anonymous inserts"
  ON survey_responses
  FOR INSERT
  TO anon
  WITH CHECK (true);


