# Google OAuth Setup Guide

## ❌ Current Error: 400 Bad Request

You're seeing this error because Google OAuth is not properly configured. The app will work fine without it - you can use email/password login instead.

## ✅ Quick Fix: Use Email/Password Login

**For now, just use the email/password form below the Google button.** The app works perfectly without Google OAuth!

---

## 🔧 Optional: Set Up Google OAuth (If You Want It)

If you want to enable Google sign-in, follow these steps:

### Step 1: Create Google OAuth Credentials

1. **Go to Google Cloud Console:**
   - Visit: https://console.cloud.google.com
   - Sign in with your Google account

2. **Create or Select Project:**
   - Click project dropdown at top
   - Click "New Project"
   - Name it: "INVENTURE" (or any name)
   - Click "Create"

3. **Enable Google+ API:**
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click "Enable"

4. **Create OAuth Credentials:**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - If prompted, configure OAuth consent screen first:
     - User Type: External
     - App name: "INVENTURE"
     - User support email: Your email
     - Developer contact: Your email
     - Click "Save and Continue"
     - Scopes: Click "Save and Continue"
     - Test users: Add your email, click "Save and Continue"
     - Click "Back to Dashboard"

5. **Create OAuth Client ID:**
   - Application type: **Web application**
   - Name: "INVENTURE Web Client"
   - **Authorized JavaScript origins:**
     - `http://localhost:8080`
     - `http://192.168.1.8:8080`
     - `http://127.0.0.1:8080`
   - **Authorized redirect URIs:**
     - `http://localhost:8080/auth`
     - `http://192.168.1.8:8080/auth`
     - `http://127.0.0.1:8080/auth`
   - Click "Create"
   - **Copy the Client ID** (looks like: `xxxxx.apps.googleusercontent.com`)

### Step 2: Add to Environment Variables

1. **Create or edit `.env` file** in project root:
   ```env
   VITE_GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
   ```

2. **Replace `your-client-id-here`** with the actual Client ID from Step 1

### Step 3: Restart Development Server

```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 4: Test

1. Refresh the page
2. You should see the Google sign-in button
3. Click it and sign in with your Google account

---

## 🚨 Common Issues

### Issue: "400 Bad Request" Error

**Causes:**
- Client ID not set in `.env`
- Redirect URI not added to Google Console
- Wrong origin URL

**Solutions:**
1. Check `.env` file has correct Client ID
2. Verify redirect URIs in Google Console match your URLs
3. Make sure you're using `http://` not `https://` for local dev

### Issue: "redirect_uri_mismatch"

**Solution:**
- Add exact URL to "Authorized redirect URIs" in Google Console
- Must match exactly: `http://192.168.1.8:8080/auth`

### Issue: Google Button Not Showing

**Solution:**
- Check `.env` file exists
- Verify `VITE_GOOGLE_CLIENT_ID` is set
- Restart dev server after adding `.env`

---

## ✅ For Production

When deploying to production:

1. **Add production URLs to Google Console:**
   - Authorized origins: `https://yourdomain.com`
   - Redirect URIs: `https://yourdomain.com/auth`

2. **Update `.env` for production:**
   ```env
   VITE_GOOGLE_CLIENT_ID=your-production-client-id
   ```

---

## 📝 Summary

**You don't need Google OAuth to use the app!**

- ✅ Email/password login works perfectly
- ✅ All features work without Google OAuth
- ✅ Google OAuth is optional

The app is fully functional with just email/password authentication. Google OAuth is just a convenience feature.

