<template>
  <div class="hero-card">
    <div class="photo-container">
      <!-- Galeria zdjęć -->
      <div v-if="photos.length > 0" class="photo-gallery">
        <img :src="photos[currentPhotoIndex]" alt="Nasze zdjęcie" class="photo" />

        <button
            v-if="photos.length > 1"
            @click="previousPhoto"
            class="nav-arrow left-arrow"
        >
          ←
        </button>
        <button
            v-if="photos.length > 1"
            @click="nextPhoto"
            class="nav-arrow right-arrow"
        >
          →
        </button>

        <div v-if="photos.length > 1" class="photo-indicators">
          <div
              v-for="(photo, index) in photos"
              :key="index"
              class="indicator"
              :class="{ active: index === currentPhotoIndex }"
              @click="currentPhotoIndex = index"
          ></div>
        </div>

        <!-- Licznik zdjęć -->
        <div class="photo-counter">{{ currentPhotoIndex + 1 }} / {{ photos.length }}</div>

        <!-- Przycisk usuwania zdjęcia -->
        <button @click="deleteCurrentPhoto" class="delete-photo-btn" title="Usuń to zdjęcie">
          🗑️
        </button>
      </div>

      <!-- Placeholder gdy brak zdjęć -->
      <div v-else class="photo-placeholder">
        <div class="icon">📷</div>
        <p class="upload-text">Dodajmy wspólne zdjęcia here</p>
      </div>

      <!-- Przycisk dodawania zdjęć (zawsze widoczny) -->
      <button @click="$refs.fileInput.click()" class="add-photo-btn" :class="{ 'has-photos': photos.length > 0 }">
        <span class="plus-icon">+</span>
      </button>

      <input
          type="file"
          ref="fileInput"
          @change="handleImageUpload"
          accept="image/*"
          multiple
          style="display: none"
      />
    </div>

    <div class="card-content">
      <h1 class="couple-names">{{ coupleName }}</h1>
      <div class="heart-divider">💕</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted} from 'vue'

const photos = ref([])
const currentPhotoIndex = ref(0)
const fileInput = ref(null)
const autoPlayInterval = ref(null) // ← DODAJ TO
const isAutoPlaying = ref(true)
// CUSTOMIZE THESE VALUES!
const coupleName = 'Ty i Ja'
const startAutoPlay = () => {
  if (photos.value.length > 1) {
    stopAutoPlay() // Zatrzymaj poprzedni interval jeśli istnieje
    autoPlayInterval.value = setInterval(() => {
      if (isAutoPlaying.value) {
        nextPhoto()
      }
    }, 10000) // 10000ms = 10 sekund
  }
}

const stopAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value)
    autoPlayInterval.value = null
  }
}

const toggleAutoPlay = () => {
  isAutoPlaying.value = !isAutoPlaying.value
  if (isAutoPlaying.value) {
    startAutoPlay()
  }
}
onMounted(() => {
  const savedPhotos = localStorage.getItem('couplePhotos')
  if (savedPhotos) {
    photos.value = JSON.parse(savedPhotos)
  }
  startAutoPlay()
})


onUnmounted(() => {
  stopAutoPlay() // Wyczyść interval gdy komponent jest niszczony
})


const handleImageUpload = (event) => {
  const files = event.target.files
  if (files.length > 0) {
    // Przetwórz wszystkie wybrane pliki
    Array.from(files).forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        photos.value.push(e.target.result)
        saveToLocalStorage()
        startAutoPlay()
      }
      reader.readAsDataURL(file)
    })

    // Reset input, żeby można było dodać te same zdjęcia ponownie
    event.target.value = ''
  }
}

const nextPhoto = () => {
  currentPhotoIndex.value = (currentPhotoIndex.value + 1) % photos.value.length
  // Zrestartuj timer po manualnej zmianie
  if (isAutoPlaying.value) {
    startAutoPlay()
  }
}

const previousPhoto = () => {
  currentPhotoIndex.value = currentPhotoIndex.value === 0
      ? photos.value.length - 1
      : currentPhotoIndex.value - 1
  // Zrestartuj timer po manualnej zmianie
  if (isAutoPlaying.value) {
    startAutoPlay()
  }
}

const deleteCurrentPhoto = () => {
  if (confirm('Czy na pewno chcesz usunąć to zdjęcie?')) {
    photos.value.splice(currentPhotoIndex.value, 1)

    // Dostosuj indeks jeśli to było ostatnie zdjęcie
    if (currentPhotoIndex.value >= photos.value.length && photos.value.length > 0) {
      currentPhotoIndex.value = photos.value.length - 1
    }

    saveToLocalStorage()
  }
}

const saveToLocalStorage = () => {
  localStorage.setItem('couplePhotos', JSON.stringify(photos.value))
}
</script>

<style scoped>
.hero-card {
  background: var(--card-bg);
  border-radius: 24px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: var(--shadow);
  animation: slideUp 0.8s ease-out;
}

.photo-container {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, rgba(255, 107, 157, 0.1), rgba(196, 113, 237, 0.1));
}

.photo-gallery {
  width: 100%;
  height: 100%;
  position: relative;
}

.photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: fadeIn 0.3s ease-out;
}

.photo-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.icon {
  font-size: 4rem;
  opacity: 0.5;
}

.upload-text {
  color: var(--text-light);
  font-size: 0.9rem;
  text-align: center;
  padding: 0 1rem;
}

/* Przycisk dodawania zdjęć */
.add-photo-btn {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--primary-light));
  color: white;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
  z-index: 10;
}

.add-photo-btn.has-photos {
  width: 50px;
  height: 50px;
  font-size: 1.8rem;
}

.add-photo-btn:hover {
  transform: scale(1.1) rotate(90deg);
  box-shadow: var(--shadow-hover);
}

.add-photo-btn:active {
  transform: scale(1.05) rotate(90deg);
}

.plus-icon {
  line-height: 1;
  font-weight: 300;
}

.btn-text {
  font-size: 0.7rem;
  font-weight: 500;
  margin-top: 0.25rem;
  font-family: 'Poppins', sans-serif;
}

/* Strzałki nawigacji */
.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  font-size: 1.5rem;
  color: var(--primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 5;
}

.left-arrow {
  left: 1rem;
}

.right-arrow {
  right: 1rem;
}

.nav-arrow:hover {
  background: white;
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.nav-arrow:active {
  transform: translateY(-50%) scale(0.95);
}

/* Wskaźniki (kropki) */
.photo-indicators {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 5;
}

.indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background: white;
  width: 24px;
  border-radius: 4px;
}

.indicator:hover {
  background: rgba(255, 255, 255, 0.8);
}

/* Licznik zdjęć */
.photo-counter {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  z-index: 5;
  backdrop-filter: blur(4px);
}

/* Przycisk usuwania */
.delete-photo-btn {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.3rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 5;
}

.delete-photo-btn:hover {
  background: #ff4444;
  transform: scale(1.1);
}

.delete-photo-btn:active {
  transform: scale(0.95);
}

.card-content {
  text-align: center;
}

.couple-names {
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.heart-divider {
  font-size: 1.5rem;
  margin: 0.5rem 0;
  animation: heartbeat 2s ease-in-out infinite;
}

.tagline {
  color: var(--text-secondary);
  font-size: 1rem;
  font-style: italic;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .couple-names {
    font-size: 1.5rem;
  }

  .nav-arrow {
    width: 40px;
    height: 40px;
    font-size: 1.3rem;
  }

  .left-arrow {
    left: 0.5rem;
  }

  .right-arrow {
    right: 0.5rem;
  }

  .add-photo-btn {
    width: 55px;
    height: 55px;
  }

  .add-photo-btn.has-photos {
    width: 45px;
    height: 45px;
  }
}
</style>