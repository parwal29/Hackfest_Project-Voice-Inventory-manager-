# How to Visit/Run the Website

## 🚀 Quick Start

### Step 1: Install Dependencies (if not done)
```bash
cd image-intent-builder-main
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
The server will start and show you a URL like:
```
➜  Local:   http://localhost:8080/
➜  Network: http://192.168.x.x:8080/
```

**Open your browser and visit:**
- **Local:** http://localhost:8080
- **Or:** http://127.0.0.1:8080

---

## 📍 Access URLs

### Development Mode
- **Local Access:** http://localhost:8080
- **Network Access:** http://[your-ip]:8080 (for other devices on same network)

### Default Port
The application runs on **port 8080** by default (configured in `vite.config.ts`)

---

## 🎯 First Time Setup

1. **Navigate to project folder:**
   ```bash
   cd image-intent-builder-main
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm run dev
   ```

4. **Open browser:**
   - Go to: http://localhost:8080
   - You'll see the authentication page

5. **Login/Register:**
   - Click "Sign Up" to create account
   - Or use any email/password (works in demo mode)
   - Or use Google OAuth (if configured)

---

## 🔧 Troubleshooting

### Port Already in Use?
If port 8080 is busy, you can:
1. **Change port in `vite.config.ts`:**
   ```typescript
   server: {
     port: 3000, // or any other port
   }
   ```

2. **Or kill the process using port 8080:**
   ```bash
   # Windows
   netstat -ano | findstr :8080
   taskkill /PID <PID> /F
   
   # Mac/Linux
   lsof -ti:8080 | xargs kill
   ```

### Server Not Starting?
1. Make sure Node.js is installed: `node --version`
2. Make sure dependencies are installed: `npm install`
3. Check for errors in terminal

### Can't Access from Other Devices?
1. Make sure firewall allows port 8080
2. Use the Network URL shown in terminal (not localhost)
3. Ensure devices are on same network

---

## 📱 Access from Mobile/Other Devices

1. Find your computer's IP address:
   ```bash
   # Windows
   ipconfig
   
   # Mac/Linux
   ifconfig
   ```

2. Use the Network URL from terminal output:
   ```
   http://192.168.1.100:8080
   ```
   (Replace with your actual IP)

3. Open on mobile/other device browser

---

## 🏗️ Production Build

To build for production:

```bash
npm run build
```

Then serve the `dist` folder using any web server:
- **Preview:** `npm run preview` (runs on port 4173)
- **Deploy to:** Vercel, Netlify, GitHub Pages, etc.

---

## ✅ What You'll See

When you visit http://localhost:8080:

1. **Landing Page** (if not logged in) → `/auth`
   - Login/Register form
   - Google OAuth button
   - Voice assistant link

2. **Dashboard** (after login) → `/`
   - Welcome page with features
   - Navigation to dashboard

3. **Main Dashboard** → `/dashboard`
   - Inventory stats
   - Charts and analytics

4. **Inventory** → `/inventory`
   - Add/Edit/Delete items
   - View alerts
   - Search and filter

---

## 🎉 You're Ready!

Once the server is running, just open:
**http://localhost:8080** in your browser!

The site will work immediately in demo mode (localStorage).
For full backend features, follow `BACKEND_SETUP.md` to configure Supabase.

