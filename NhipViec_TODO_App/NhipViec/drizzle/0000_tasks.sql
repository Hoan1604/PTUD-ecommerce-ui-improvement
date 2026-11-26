CREATE TABLE IF NOT EXISTS tasks (
  id TEXT PRIMARY KEY NOT NULL,
  title TEXT NOT NULL CHECK (length(trim(title)) BETWEEN 1 AND 120),
  description TEXT NOT NULL DEFAULT '' CHECK (length(description) <= 1200),
  category TEXT NOT NULL CHECK (category IN ('study','work','personal')),
  status TEXT NOT NULL CHECK (status IN ('todo','doing','done')),
  due_date TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS app_settings (
  name TEXT PRIMARY KEY NOT NULL,
  value TEXT NOT NULL
);
