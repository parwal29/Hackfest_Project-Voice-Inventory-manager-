# Troubleshooting: Can't Access Website

## ❌ Problem: Site Not Opening

### Issue 1: Using HTTPS instead of HTTP

**Problem:** You're using `https://192.168.1.8:8080/` but the dev server runs on HTTP.

**Solution:** Use `http://` (not `https://`):

✅ **Correct URL:**
```
http://192.168.1.8:8080
```

❌ **Wrong URL:**
```
https://192.168.1.8:8080  ← This won't work!
```

---

### Issue 2: Firewall Blocking Port 8080

**Solution:** Allow port 8080 through Windows Firewall

1. **Open Windows Defender Firewall:**
   - Press `Win + R`
   - Type: `wf.msc`
   - Press Enter

2. **Create Inbound Rule:**
   - Click "Inbound Rules" → "New Rule"
   - Select "Port" → Next
   - Select "TCP"
   - Enter port: `8080`
   - Select "Allow the connection"
   - Apply to all profiles
   - Name it: "Vite Dev Server"
   - Finish

3. **Or temporarily disable firewall** (for testing only):
   - Windows Security → Firewall & network protection
   - Turn off for private network (temporarily)

---

### Issue 3: Server Not Accessible on Network

**Check if server is listening on all interfaces:**

The server should show:
```
➜  Local:   http://localhost:8080/
➜  Network: http://192.168.1.8:8080/
```

If you only see "Local", restart the server.

---

### Issue 4: Browser Security Warning

If you see "Not Secure" or certificate warning:
- This is normal for HTTP (not HTTPS)
- Click "Advanced" → "Proceed to site"
- Or use `http://localhost:8080` on the same computer

---

## ✅ Step-by-Step Fix

### Step 1: Use Correct URL
```
http://192.168.1.8:8080
```
(Note: `http://` not `https://`)

### Step 2: Check Server is Running
Look at your terminal/command prompt. You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:8080/
  ➜  Network: http://192.168.1.8:8080/
```

### Step 3: Test Locally First
Try on the same computer:
```
http://localhost:8080
```

If this works, the server is fine. The issue is network access.

### Step 4: Check Firewall
- Windows Firewall might be blocking
- Follow firewall steps above

### Step 5: Restart Server
Stop the server (Ctrl+C) and restart:
```bash
cd image-intent-builder-main
npm run dev
```

---

## 🔍 Quick Tests

### Test 1: Local Access
```
http://localhost:8080
```
✅ Should work if server is running

### Test 2: Network Access (Same Computer)
```
http://192.168.1.8:8080
```
✅ Should work if firewall allows

### Test 3: Network Access (Other Device)
```
http://192.168.1.8:8080
```
✅ Should work if:
- Same WiFi network
- Firewall allows
- Using `http://` (not `https://`)

---

## 🚨 Common Errors

### "This site can't be reached"
- Check server is running
- Use `http://` not `https://`
- Check firewall

### "Connection refused"
- Server not running
- Wrong IP address
- Port blocked

### "ERR_CONNECTION_TIMED_OUT"
- Firewall blocking
- Wrong network
- Server crashed

### "Not Secure" Warning
- Normal for HTTP
- Click "Advanced" → "Proceed"

---

## 📱 Accessing from Mobile/Other Device

1. **Make sure:**
   - Both devices on same WiFi
   - Server shows "Network" URL
   - Firewall allows port 8080

2. **On mobile/other device:**
   - Open browser
   - Type: `http://192.168.1.8:8080`
   - (Use `http://` not `https://`)

3. **If still not working:**
   - Check mobile is on same WiFi
   - Try `http://localhost:8080` on server computer first
   - Check Windows Firewall settings

---

## 🔧 Advanced: Change Port

If port 8080 is problematic, change it:

1. Edit `vite.config.ts`:
```typescript
server: {
  port: 3000, // or any other port
}
```

2. Restart server
3. Access at: `http://192.168.1.8:3000`

---

## ✅ Quick Checklist

- [ ] Using `http://` (not `https://`)
- [ ] Server is running (check terminal)
- [ ] Correct IP address (192.168.1.8)
- [ ] Port 8080 is correct
- [ ] Firewall allows port 8080
- [ ] Both devices on same network
- [ ] Browser not blocking (try incognito)

---

## 🆘 Still Not Working?

1. **Check server terminal for errors**
2. **Try `http://localhost:8080` on server computer**
3. **Check Windows Firewall logs**
4. **Restart the server**
5. **Try different browser**
6. **Check if antivirus is blocking**

The most common issue is using `https://` instead of `http://`!

