# ⚡ QUICK START - Get Running in 5 Minutes!

**Too excited to read the full guides? Here's the fastest way to get started!**

## 🏃‍♂️ Super Quick Setup

### 1️⃣ Install & Run (30 seconds)
```bash
npm install
npm run dev
```

Open browser to: `http://localhost:5173`

### 2️⃣ Customize (2 minutes)

**Your Special Date** - `src/components/DateCounter.vue` Line 91:
```javascript
const START_DATE = new Date('2024-02-14 18:30:00') // ← CHANGE THIS!
```

**Your Names** - `src/components/HeroCard.vue` Lines 29-30:
```javascript
const coupleName = 'Anna i Piotr' // ← CHANGE THIS!
const tagline = 'Nasza niesamowita historia miłości'
```

**Your Quotes** - `src/components/LoveQuote.vue` Lines 16+:
```javascript
const quotes = [
  {
    text: 'Your personal love quote here',
    source: 'Your name'
  },
  // Add more...
]
```

### 3️⃣ Deploy to Vercel (2 minutes)

**Option A - Easiest:**
1. Create GitHub repo
2. Push code: `git push`
3. Go to [vercel.com](https://vercel.com)
4. Import your repo
5. Click Deploy
6. Done! You get a URL like: `your-app.vercel.app`

**Option B - Fastest:**
```bash
npm install -g vercel
vercel login
vercel
```

### 4️⃣ Install on iPhone
1. Open URL in **Safari** (not Chrome!)
2. Tap Share button (square with arrow)
3. Tap "Add to Home Screen"
4. Done! ✨

## 🎯 That's It!

**Full guides available:**
- `README.md` - Complete documentation
- `CUSTOMIZATION_GUIDE.md` - All customization options
- `DEPLOYMENT_GUIDE.md` - Detailed deployment steps

**Now go make her smile! 💕**
