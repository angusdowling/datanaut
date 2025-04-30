--! Previous: sha1:83728acb8caf6aa3845908cb44ff42e3177e2f2f
--! Hash: sha1:4995433776ae0b4028d4aae3bbba3b4a310ce0cc

drop table if exists refresh_tokens cascade;
CREATE TABLE refresh_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token TEXT NOT NULL UNIQUE,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    revoked BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    revoked_at TIMESTAMP WITH TIME ZONE,
    replaced_by_token TEXT,
    reason_revoked TEXT
);

-- Create index on user_id for faster lookups
CREATE INDEX idx_refresh_tokens_user_id ON refresh_tokens(user_id);

-- Create index on token for faster lookups
CREATE INDEX idx_refresh_tokens_token ON refresh_tokens(token);

-- Create index on replaced_by_token for faster lookups when revoking descendants
CREATE INDEX idx_refresh_tokens_replaced_by_token ON refresh_tokens(replaced_by_token);
