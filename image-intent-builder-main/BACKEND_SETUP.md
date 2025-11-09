# Complete Backend & Frontend Setup Guide

This guide will help you set up the **full backend integration** for INVENTURE.

## 🚀 Quick Start (5 minutes)

### Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Sign up/Login
3. Click **"New Project"**
4. Fill in project details
5. Wait 2-3 minutes for setup

### Step 2: Get Credentials

1. In Supabase dashboard → **Settings** → **API**
2. Copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public key** → `VITE_SUPABASE_PUBLISHABLE_KEY`

### Step 3: Run Database Migration

1. In Supabase dashboard → **SQL Editor**
2. Click **"New Query"**
3. Open `supabase/migrations/001_initial_schema.sql`
4. Copy entire file content
5. Paste and click **"Run"**

### Step 4: Configure Environment

Create `.env` file in root:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Step 5: Restart Server

```bash
npm run dev
```

✅ **Done!** Your app now has full backend integration.

---

## 📋 Detailed Setup

### Database Schema

The migration creates:

- ✅ **profiles** table - User profiles
- ✅ **inventory_items** table - All inventory data
- ✅ **alerts** table - System alerts
- ✅ **Row Level Security** - Users can only see their data
- ✅ **Auto-triggers** - Profile creation, timestamps

### Features Enabled

1. **Real Authentication**
   - Supabase Auth integration
   - Email/password login
   - Google OAuth support
   - Session management

2. **Data Persistence**
   - All inventory stored in database
   - Alerts synced to database
   - Automatic backups

3. **Multi-user Support**
   - Each user sees only their data
   - Secure data isolation
   - Scalable architecture

---

## 🔧 Optional: Google OAuth Setup

### 1. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project or select existing
3. Enable **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure:
   - Application type: **Web application**
   - Authorized redirect URIs:
     - `https://your-project.supabase.co/auth/v1/callback`
     - `http://localhost:5173/auth` (for development)

### 2. Enable in Supabase

1. Supabase dashboard → **Authentication** → **Providers**
2. Enable **Google**
3. Paste:
   - Client ID
   - Client Secret
4. Save

### 3. Add to .env

```env
VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
```

---

## 🎤 Optional: Agora Voice Setup

### 1. Create Agora Account

1. Go to https://www.agora.io
2. Sign up for free account
3. Create new project

### 2. Get Credentials

1. In Agora console → **Project Management**
2. Copy:
   - **App ID**
   - Generate **Temporary Token** (for testing)

### 3. Add to .env

```env
VITE_AGORA_APP_ID=your-app-id
VITE_AGORA_TEMP_TOKEN=your-temp-token
```

**Note:** For production, use Agora token server instead of temp tokens.

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Can register new user
- [ ] Can login with email/password
- [ ] Inventory items persist after refresh
- [ ] Alerts are created and stored
- [ ] Data is user-specific (test with 2 accounts)
- [ ] Google OAuth works (if configured)
- [ ] Voice calls work (if Agora configured)

---

## 🔍 Testing the Backend

### Test 1: User Registration
1. Go to `/auth`
2. Click "Sign Up"
3. Fill in details
4. Submit
5. Check Supabase dashboard → **Authentication** → **Users**
6. Verify user created

### Test 2: Data Persistence
1. Login
2. Add inventory item
3. Refresh page
4. Item should still be there
5. Check Supabase dashboard → **Table Editor** → **inventory_items**
6. Verify data in database

### Test 3: Multi-user Isolation
1. Create 2 test accounts
2. Login as User 1, add items
3. Logout, login as User 2
4. User 2 should not see User 1's items

---

## 🐛 Troubleshooting

### Issue: "Failed to load from Supabase"

**Solution:**
- Check `.env` file has correct values
- Verify Supabase project is active
- Check browser console for specific errors
- Ensure migration SQL ran successfully

### Issue: "new row violates row-level security policy"

**Solution:**
- Verify RLS policies were created
- Check user is authenticated
- Verify `user_id` matches authenticated user

### Issue: "relation does not exist"

**Solution:**
- Run migration SQL again
- Check Supabase dashboard → **Table Editor** for tables
- Verify table names match exactly

### Issue: Data not syncing

**Solution:**
- Check network tab for API errors
- Verify Supabase credentials
- Check Supabase logs in dashboard
- App falls back to localStorage if Supabase fails

---

## 📊 Monitoring

### Supabase Dashboard

Monitor your backend:
- **Database** → View tables and data
- **Authentication** → View users and sessions
- **Logs** → View API requests and errors
- **Storage** → View file uploads (if using)

### Application Logs

Check browser console for:
- Supabase connection status
- Data sync errors
- Fallback mode warnings

---

## 🔄 Migration from localStorage

If you have existing data in localStorage:

1. Export data:
   ```javascript
   // In browser console
   JSON.parse(localStorage.getItem('inventory-items'))
   ```

2. The app automatically syncs localStorage → Supabase on first login

3. Or manually import via Supabase dashboard → **Table Editor**

---

## 🚀 Production Deployment

### Before Going Live:

1. **Enable Email Confirmation** (Supabase → Authentication → Settings)
2. **Set up SMTP** for emails
3. **Configure CORS** in Supabase
4. **Set up backups** (Supabase → Database → Backups)
5. **Monitor usage** and set up alerts
6. **Use production Agora tokens** (not temp tokens)

### Environment Variables for Production:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
VITE_GOOGLE_CLIENT_ID=your-production-client-id
VITE_AGORA_APP_ID=your-agora-app-id
# Use token server for production, not temp tokens
```

---

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Agora Documentation](https://docs.agora.io)

---

## ✨ What You Get

With full backend setup:

✅ **Real user authentication**
✅ **Persistent data storage**
✅ **Multi-user support**
✅ **Automatic backups**
✅ **Scalable architecture**
✅ **Secure data isolation**
✅ **Production-ready**

Your application is now a **fully functional, production-ready** inventory management system!

