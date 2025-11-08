# 🌐 INVENTURE Website Preview Guide

## Quick Access

**Local Development URL**: `http://localhost:8080`

## 📸 What You'll See

### 1. **Registration/Login Page** (`/auth`)

When you first visit the website, you'll see:

#### Visual Design:
- **Animated Background**: Dark gradient (indigo → purple → orange) with floating particles
- **Glassmorphism Cards**: Two large translucent cards side-by-side
  - **Left Card**: "INTRO VIDEO" section with "LIKE HARRY POTTER NEWS PAPER" text
  - **Right Card**: "FEATURES" section
- **Buttons**:
  - **"Click To Register With VOICE"** - Black button with yellow border, blue "VOICE" text
  - **"Register Now"** - Dark gray button on the right
- **Center Microphone Icon**: 
  - Large circular icon with rainbow gradient border (red → orange → green → blue → purple)
  - Yellow border inside
  - White microphone icon
- **Footer**: "National Forensic Sciences University (Delhi Campus)"
- **Header**: INVENTURE logo with "Guest User" button

#### Animations:
- Floating particles moving across the screen
- Fade-in and zoom-in animations on page load
- Smooth transitions

---

### 2. **Dashboard** (After Login)

Once logged in, you'll see:

#### Header Features:
- **Update Button** - Rounded button with refresh icon
- **Create Button** - Rounded button with pencil icon
- **Search Bar** - Rounded input with:
  - Search icon on the left
  - Purple-pink gradient search button on the right
  - Functional search with toast notifications
- **Language Selector** - Dropdown with 6 languages:
  - English 🇺🇸
  - Hindi 🇮🇳
  - Japanese 🇯🇵
  - Spanish 🇪🇸
  - French 🇫🇷
  - German 🇩🇪
- **XyroAi Button** - Yellow button with rainbow text "XyroAi" and microphone icon
- **Background Selector** - Palette icon button
- **Theme Switcher** - Dark/Light theme toggle
- **User Menu** - Profile dropdown with logout option

#### Sidebar Navigation:
- **INVENTURE Logo** - Circular gradient logo (red-blue-yellow) with "I" inside
- **Radio Button Navigation**:
  - Each menu item has a circular radio button indicator
  - Active item shows filled radio button with pulse animation
  - Hover effects with scale animations
- **Menu Items**:
  - Dashboard
  - Inventory
  - Sales
  - Purchase
  - Channels
  - Analytics
  - Collaborators
  - Documents

#### Dashboard Content:

**AI Based Summary Card**:
- Animated statistics that count up on page load:
  - Total Sales: $124,567 (+12.5%)
  - Items Sold: 2,345 (+8.2%)
  - Revenue: $89,234 (+15.3%)
- AI Insights section with recommendations
- Hover effects and transitions

**Pie Chart Card**:
- Animated pie chart with 3 segments
- Purple, green, and orange colors
- Hover scale effects

**Top Selling Product Card**:
- Green gradient background
- Phone icons with pulse animation
- Hover scale effects

**Overview Card**:
- Purple-blue gradient background
- Bouncing chevron icon
- Interactive hover effects

**Action Buttons**:
- UPI (BHIM) button
- Access & Controls button
- WhatsApp Business button
- All with hover animations

---

### 3. **Voice Call Interface** (`/voice-call`)

When you click the XyroAi button, you'll see:

#### Header:
- INVENTURE logo on the left
- User name and avatar on the right
- Dark gray background

#### Main Chat Area:
- **Black background** with orange-pink border
- **XyroBotAi** indicator (top right) with rainbow text
- **AI Messages** (left side):
  - White message bubbles
  - Play button (blue circle)
  - Microphone icon (purple circle)
  - "Agora" label with rainbow text
- **User Messages** (right side):
  - Blue message bubbles
  - Play button
  - Microphone icon
  - "You" label
- **Speaking Indicator**: Pulsing dots when AI is processing

#### Control Panel (Bottom):
- **Plus Button** (left) - Gray square button
- **Japanese Text** - "श्री さん" in white
- **Microphone Button** (center) - Large purple circle
  - Click to start/stop recording
  - Pulses when active
- **Leave Button** (right) - Red button with phone icon

---

## 🎨 Visual Features

### Glassmorphism Effects:
- Translucent backgrounds with backdrop blur
- Subtle borders with transparency
- Layered depth effect

### Animations:
- ✅ Fade-in on page load
- ✅ Slide-in for cards
- ✅ Number counting animations
- ✅ Hover scale effects
- ✅ Pulse animations
- ✅ Floating particles
- ✅ Bouncing icons
- ✅ Smooth transitions

### Rainbow Text:
- Animated gradient text on:
  - "agora" in sidebar
  - "XyroAi" in header
  - "Agora" and "XyroBotAi" in voice call

### Interactive Elements:
- All buttons have hover effects
- Cards scale on hover
- Smooth transitions
- Color changes on interaction

---

## 🚀 How to View

1. **Start the Server**:
   ```bash
   cd image-intent-builder-main
   npm run dev
   ```

2. **Open Browser**:
   - Navigate to `http://localhost:8080`
   - You'll see the registration page first

3. **Login/Register**:
   - Enter any email and password (demo mode)
   - Click "Click To Register With VOICE" or use regular registration
   - You'll be redirected to the dashboard

4. **Test Features**:
   - Click **XyroAi** button → Opens voice call interface
   - Click **Language Selector** → See dropdown menu
   - Click **Background Selector** → Change website background
   - Try **Search** → See toast notification
   - Hover over **cards** → See animations
   - Navigate **sidebar** → See radio button indicators

---

## 📱 Key Pages

1. **`/auth`** - Registration page with voice option
2. **`/`** - Dashboard with AI summary
3. **`/voice-call`** - Voice assistant interface
4. **`/inventory`** - Inventory management
5. **`/sales`** - Sales tracking
6. **`/purchase`** - Purchase management
7. **`/channels`** - Channel management
8. **`/analytics`** - Analytics dashboard
9. **`/collaborators`** - Team management
10. **`/documents`** - Document management

---

## 🎯 Testing Checklist

- [ ] Registration page loads with animations
- [ ] Two large glassmorphic cards visible
- [ ] Rainbow microphone icon displays correctly
- [ ] Dashboard shows AI Summary with animated numbers
- [ ] Language selector dropdown works
- [ ] Voice call interface opens from XyroAi button
- [ ] Search bar shows toast notifications
- [ ] Background selector changes background
- [ ] Cards have hover animations
- [ ] Sidebar navigation works with radio buttons
- [ ] User menu dropdown works
- [ ] Logout redirects to auth page

---

## 💡 Tips

- **Hard Refresh**: If you don't see changes, press `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- **Browser**: Works best in Chrome, Edge, or Firefox
- **Voice Recognition**: Requires Chrome or Edge for speech recognition
- **Responsive**: Try resizing the browser to see responsive design

---

**Enjoy exploring your INVENTURE inventory management system!** 🎉

