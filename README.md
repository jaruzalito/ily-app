# 💕 Ily App - Valentine's Day PWA

A beautiful, romantic Progressive Web App created with love for Valentine's Day. This app can be installed on iPhone as a standalone app!

## ✨ Features

- 🎬 **Romantic Animated Onboarding** - Beautiful interactive introduction
- 📸 **Hero Card with Photo** - Add your couple photo
- ⏱️ **Real-time Date Counter** - Shows time together in multiple formats
- 💭 **Love Quotes** - Rotating personal quotes
- 📝 **Bucket List** - Shared goals with color coding (pink for her, blue for you)
- 📱 **PWA Ready** - Installable on iPhone home screen
- 💾 **Offline Support** - Works without internet after installation

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Customize Your Data

**Important: Update these files with your personal information!**

#### Set Your Special Date
Edit `src/components/DateCounter.vue`:
```javascript
// Line 91 - Change this to your actual date!
const START_DATE = new Date('2024-02-14 18:30:00')
```

#### Add Your Names
Edit `src/components/HeroCard.vue`:
```javascript
// Lines 29-30
const coupleName = 'Anna i Piotr' // Your names
const tagline = 'Nasza niesamowita historia miłości' // Your tagline
```

#### Add Your Personal Quotes
Edit `src/components/LoveQuote.vue`:
```javascript
// Starting from line 16, replace with your own quotes
const quotes = [
  {
    text: 'Your personal quote here',
    source: 'Your name'
  },
  // Add more quotes...
]
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

## 📱 Deploy to Vercel

### Option 1: Using Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option 2: Using Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Vite and deploy!

### Option 3: Connect GitHub (Recommended)
1. Push your code to GitHub
2. Go to Vercel and import your repository
3. Every push to main branch will auto-deploy

## 📲 Installing on iPhone

After deploying to Vercel:

1. Open the deployed URL in Safari on iPhone
2. Tap the Share button (box with arrow)
3. Scroll down and tap "Add to Home Screen"
4. Name it "Ily" or whatever you prefer
5. Tap "Add"

The app will now appear on her home screen like a native app! 🎉

## 🎨 Customization Ideas

### Colors
Edit `src/style.css` to change the color scheme:
```css
:root {
  --primary: #ff6b9d;        /* Main pink color */
  --secondary: #c471ed;       /* Purple accent */
  --accent: #f8b500;          /* Gold accent */
}
```

### Add More Onboarding Steps
Edit `src/components/Onboarding.vue` and add more steps to the onboarding sequence.

### Add More Features
Create new components in `src/components/` and import them in `src/views/MainView.vue`.

## 🖼️ Adding App Icons

Replace these files in the `public/` folder:
- `icon-192x192.png` - 192x192px icon
- `icon-512x512.png` - 512x512px icon
- `apple-touch-icon.png` - 180x180px icon for iOS
- `favicon.ico` - 32x32px favicon

You can create these using:
- [Favicon Generator](https://realfavicongenerator.net/)
- Canva or Figma
- Any image editor

## 💡 Tips

- **Test on actual iPhone** - Simulator doesn't show PWA features correctly
- **Use HTTPS** - PWA requires secure connection (Vercel provides this)
- **Keep it personal** - Add inside jokes, your photos, special dates
- **Update regularly** - Add new bucket list items, quotes, memories

## 🛠️ Tech Stack

- Vue 3 (Composition API)
- Vite
- PWA Plugin
- Vercel (deployment)

## 📝 File Structure

```
ily-app/
├── src/
│   ├── components/
│   │   ├── Onboarding.vue      # Animated intro
│   │   ├── HeroCard.vue         # Photo & names
│   │   ├── DateCounter.vue      # Time together
│   │   ├── LoveQuote.vue        # Quotes carousel
│   │   └── BucketList.vue       # Shared goals
│   ├── views/
│   │   └── MainView.vue         # Main layout
│   ├── App.vue                  # Root component
│   ├── main.js                  # Entry point
│   └── style.css                # Global styles
├── public/                      # Static assets & icons
├── index.html
├── vite.config.js              # Vite + PWA config
└── package.json
```

## ❤️ Made with Love

Created for Valentine's Day 2026. May your love story be as beautiful as this app! 💕

## 📄 License

This is a personal project - feel free to fork and customize for your own relationship! 

---

**Happy Valentine's Day! 🌹**
