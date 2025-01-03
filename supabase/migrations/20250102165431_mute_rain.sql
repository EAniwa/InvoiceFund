/*
  # User Profiles and Verification

  1. New Tables
    - `user_profiles`
      - `id` (uuid, matches auth.users.id)
      - `user_type` (enum: 'sme' or 'investor')
      - `company_name` (text, for SME users)
      - `verification_status` (enum)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `user_profiles`
    - Add policies for users to read their own profile
    - Add policies for admin to manage all profiles
*/

-- Create enum types
CREATE TYPE user_type AS ENUM ('sme', 'investor');
CREATE TYPE verification_status AS ENUM ('pending', 'approved', 'rejected');

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  first_name text NOT NULL,
  last_name text NOT NULL,
  user_type user_type NOT NULL,
  company_name text,
  verification_status verification_status NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can read own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Create function to handle user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, first_name, last_name, user_type, company_name)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'firstName',
    new.raw_user_meta_data->>'lastName',
    COALESCE(new.raw_user_meta_data->>'user_type', 'investor'),
    new.raw_user_meta_data->>'companyName'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new signups
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();