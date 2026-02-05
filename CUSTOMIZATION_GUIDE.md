# 🎨 CUSTOMIZATION GUIDE

This guide will help you personalize the app for your girlfriend!

## 🔧 Essential Customizations

### 1. Set Your Special Date (REQUIRED!)

**File:** `src/components/DateCounter.vue`  
**Line:** 91

```javascript
// Change this to YOUR actual date and time!
const START_DATE = new Date('2024-02-14 18:30:00')
```

**Format:** `'YYYY-MM-DD HH:mm:ss'`

**Examples:**
- `'2023-06-15 19:30:00'` - June 15, 2023 at 7:30 PM
- `'2024-01-01 00:00:00'` - January 1, 2024 at midnight
- `'2022-12-24 16:45:00'` - December 24, 2022 at 4:45 PM

### 2. Add Your Names (REQUIRED!)

**File:** `src/components/HeroCard.vue`  
**Lines:** 29-30

```javascript
const coupleName = 'Anna i Piotr' // ← Change to YOUR names!
const tagline = 'Nasza niesamowita historia miłości' // ← Your custom message
```

**Ideas for taglines:**
- "Together Forever"
- "Od pierwszego spojrzenia"
- "Moja druga połówka"
- "My Love Story"
- "Zawsze razem"

### 3. Add Your Personal Quotes (HIGHLY RECOMMENDED!)

**File:** `src/components/LoveQuote.vue`  
**Lines:** 16-35

Replace the default quotes with your own:

```javascript
const quotes = [
  {
    text: 'Twój pierwszy cytat tutaj',
    source: 'Twoje imię'
  },
  {
    text: 'Kolejny romantyczny cytat',
    source: 'Z całego serca'
  },
  // Add as many as you want!
]
```

**Tips for great quotes:**
- Inside jokes between you two
- Memorable things you've said to each other
- Why you love her
- Favorite memories together
- Future dreams

**Example:**
```javascript
{
  text: 'Pamiętasz jak pierwszy raz spojrzeliśmy sobie w oczy? Od tej chwili wiedziałem, że jesteś wyjątkowa.',
  source: 'Nasz pierwszy dzień'
}
```

## 🎨 Optional Customizations

### 4. Change Color Scheme

**File:** `src/style.css`  
**Lines:** 9-17

```css
:root {
  --primary: #ff6b9d;          /* Main pink - change to any color! */
  --primary-light: #ff8cb5;    /* Lighter version */
  --primary-dark: #e5567d;     /* Darker version */
  --secondary: #c471ed;         /* Purple accent */
  --accent: #f8b500;            /* Gold accent */
}
```

**Color ideas:**
- Romantic red: `--primary: #ff1744;`
- Soft purple: `--primary: #9c27b0;`
- Ocean blue: `--primary: #00acc1;`
- Sunset orange: `--primary: #ff6f00;`

Use [coolors.co](https://coolors.co/) to generate color palettes!

### 5. Customize Onboarding Messages

**File:** `src/components/Onboarding.vue`  
**Lines:** 11-55

Edit the onboarding steps to add your personal touch:

```vue
<!-- Step 0 - Change the greeting -->
<h1 class="title">Cześć, kochanie 💕</h1>
<p class="subtitle">Mam dla Ciebie coś wyjątkowego...</p>

<!-- Step 1 -->
<h2 class="message">To jest nasza historia</h2>
<p class="description">Każda chwila z Tobą jest wyjątkowa</p>

<!-- Add your own messages! -->
```

**Ideas:**
- Use her nickname
- Reference your first date
- Mention what you love about her
- Add humor if that's your style

### 6. Pre-fill Bucket List Items

**File:** `src/components/BucketList.vue`  
**Lines:** 27-43

Start with some pre-filled bucket list items:

```javascript
bucketItems.value = [
  {
    id: 1,
    text: 'Zwiedzić Paryż razem',  // ← Your dreams!
    color: 'pink',
    completed: false
  },
  {
    id: 2,
    text: 'Nauczyć się tańczyć walca',
    color: 'blue',
    completed: false
  },
  // Add more...
]
```

### 7. Add More Onboarding Steps

In `src/components/Onboarding.vue`, you can add more steps:

1. Change `v-for="i in 5"` to `v-for="i in 6"` (or more)
2. Add a new step:

```vue
<div v-else-if="currentStep === 5" key="step5" class="step">
  <div class="emoji-large">🎁</div>
  <h2 class="message">Your new message here</h2>
  <p class="description">More text...</p>
  <button @click="nextStep" class="continue-btn">
    <span>Dalej</span>
    <span class="arrow">→</span>
  </button>
</div>
```

3. Update the `nextStep` function limit if needed

## 📸 Adding Your Photos

### Hero Card Photo
The app has a built-in upload button, but if you want to pre-set a photo:

1. Add your photo to `public/` folder (e.g., `couple-photo.jpg`)
2. In `HeroCard.vue`, change the `onMounted` function:

```javascript
onMounted(() => {
  photoUrl.value = '/couple-photo.jpg'
})
```

### App Icons
Create custom icons for when she installs the app:

**Required sizes:**
- 192×192px → `public/icon-192x192.png`
- 512×512px → `public/icon-512x512.png`
- 180×180px → `public/apple-touch-icon.png`

**Free tools to create icons:**
- [Canva](https://www.canva.com/) - Use heart templates
- [Figma](https://www.figma.com/) - Design custom icon
- [RealFaviconGenerator](https://realfavicongenerator.net/) - Generate all sizes

**Icon ideas:**
- Heart with your initials
- Your couple photo (cropped to circle)
- Simple "❤️" emoji on colored background
- Both of your first initials

## 🎯 Advanced Customizations

### Add Background Music (Optional)
Add romantic background music that plays during onboarding:

**File:** `src/components/Onboarding.vue`

```javascript
import { ref, onMounted } from 'vue'

const audio = ref(null)

onMounted(() => {
  audio.value = new Audio('/romantic-music.mp3')
  audio.value.volume = 0.3
  audio.value.play()
})
```

Then add the music file to your `public/` folder.

### Add Photo Gallery
Create a new component for your photos together!

### Add Countdown to Next Anniversary
Add a countdown timer to your next special date!

## ✅ Pre-Deployment Checklist

Before showing her:

- [ ] Set your special date in DateCounter.vue
- [ ] Add your names in HeroCard.vue
- [ ] Write 5+ personal quotes in LoveQuote.vue
- [ ] Add 3+ bucket list items
- [ ] Test the app on your phone
- [ ] Create custom app icons
- [ ] Change the color scheme if desired
- [ ] Proofread all text for typos
- [ ] Add your couple photo
- [ ] Test installation on iPhone

## 💡 Pro Tips

1. **Keep it personal** - The more personal, the better!
2. **Test everything** - Try all features before showing her
3. **Add surprises** - Hidden messages, easter eggs
4. **Update regularly** - Add new quotes and memories
5. **Screenshot reactions** - Capture her reaction when you show her!

## 🎁 Presentation Ideas

1. **On Valentine's Day morning** - Send her the link when she wakes up
2. **In person** - Show her on your phone, then help her install it
3. **Romantic dinner** - After dinner, "I have something for you..."
4. **With other gifts** - Include a card with the app URL/QR code
5. **Surprise element** - "Close your eyes, I need your phone for a sec" → install it

## 📱 After She Installs

The app saves data locally, so:
- Photos stay on her phone
- Bucket list items persist
- She can add her own items
- Works offline after first load

You can both update the bucket list independently!

---

**Need help?** The app is fully commented - read the code for more customization options!

**Remember:** The best gift is showing her you put thought and effort into something special just for her. ❤️
