# Supabase Database Setup Guide

This guide will help you set up the full backend for the INVENTURE application.

## Prerequisites

1. A Supabase account (sign up at https://supabase.com)
2. A new Supabase project created

## Step 1: Create Supabase Project

1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Fill in:
   - Project name: `inventure` (or your choice)
   - Database password: (save this securely)
   - Region: Choose closest to your users
4. Wait for project to be created (2-3 minutes)

## Step 2: Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy:
   - **Project URL** (this is your `VITE_SUPABASE_URL`)
   - **anon/public key** (this is your `VITE_SUPABASE_PUBLISHABLE_KEY`)

## Step 3: Run Database Migrations

### Option A: Using Supabase Dashboard (Recommended)

1. Go to **SQL Editor** in your Supabase dashboard
2. Click **New Query**
3. Copy the entire contents of `supabase/migrations/001_initial_schema.sql`
4. Paste into the SQL editor
5. Click **Run** (or press Ctrl+Enter)
6. Verify success message

### Option B: Using Supabase CLI

```bash
# Install Supabase CLI (if not installed)
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

## Step 4: Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key-here

# Google OAuth (Optional)
VITE_GOOGLE_CLIENT_ID=your-google-client-id

# Agora Voice (Optional)
VITE_AGORA_APP_ID=your-agora-app-id
VITE_AGORA_TEMP_TOKEN=your-agora-token
```

## Step 5: Enable Google OAuth in Supabase (Optional)

1. Go to **Authentication** → **Providers** in Supabase dashboard
2. Find **Google** and click to enable
3. You'll need:
   - Google OAuth Client ID
   - Google OAuth Client Secret
4. Get these from [Google Cloud Console](https://console.cloud.google.com)
5. Add authorized redirect URL: `https://your-project.supabase.co/auth/v1/callback`

## Step 6: Verify Setup

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Test the application:
   - Try registering a new user
   - Add inventory items
   - Check if data persists after refresh

## Database Schema Overview

### Tables Created:

1. **profiles** - User profile information
   - Linked to `auth.users` table
   - Stores name, email, business type, avatar

2. **inventory_items** - Inventory items
   - Stores all inventory data
   - Linked to user via `user_id`

3. **alerts** - System alerts
   - Low stock alerts
   - Out of stock alerts
   - Linked to items and users

### Security:

- **Row Level Security (RLS)** enabled on all tables
- Users can only access their own data
- Policies automatically created

### Features:

- Automatic profile creation on signup
- Timestamp tracking (created_at, updated_at)
- Cascade deletes (deleting user deletes their data)

## Troubleshooting

### "relation does not exist" error
- Make sure you ran the migration SQL
- Check that tables were created in Supabase dashboard

### "new row violates row-level security policy" error
- Verify RLS policies were created
- Check that user is authenticated

### Data not persisting
- Check browser console for errors
- Verify Supabase credentials in `.env`
- Check Supabase logs in dashboard

### Can't sign up users
- Check Supabase Auth settings
- Verify email confirmation is disabled (for testing) or configure SMTP

## Next Steps

1. Configure email templates in Supabase
2. Set up backup strategies
3. Monitor usage in Supabase dashboard
4. Set up database backups

## Support

For issues:
1. Check Supabase logs in dashboard
2. Check browser console for errors
3. Verify all environment variables are set
4. Ensure migrations ran successfully

