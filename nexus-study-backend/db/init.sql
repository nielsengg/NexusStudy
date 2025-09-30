CREATE TABLE IF NOT EXISTS users (
  id serial PRIMARY KEY,
  name text,
  email text UNIQUE NOT NULL,
  password_hash text,
  total_points bigint DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS tasks (
  id serial PRIMARY KEY,
  user_id int REFERENCES users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  goal_minutes int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sessions (
  id serial PRIMARY KEY,
  user_id int REFERENCES users(id) ON DELETE CASCADE,
  task_id int REFERENCES tasks(id) ON DELETE SET NULL,
  start_time timestamptz,
  end_time timestamptz,
  focused_minutes int DEFAULT 0,
  pauses jsonb DEFAULT '[]'::jsonb,
  points_awarded int DEFAULT 0,
  completed boolean DEFAULT false
);
