<template>
  <div class="hero-card">
    <div class="photo-container">
      <div class="photo-placeholder">
        <div class="icon">📷</div>
        <p class="upload-text">Dodaj nasze wspólne zdjęcie</p>
        <input 
          type="file" 
          ref="fileInput" 
          @change="handleImageUpload" 
          accept="image/*"
          style="display: none"
        />
        <button @click="$refs.fileInput.click()" class="upload-btn">
          Wybierz zdjęcie
        </button>
      </div>
      <img v-if="photoUrl" :src="photoUrl" alt="Nasze zdjęcie" class="photo" />
    </div>
    
    <div class="card-content">
      <h1 class="couple-names">{{ coupleName }}</h1>
      <div class="heart-divider">💕</div>
      <p class="tagline">{{ tagline }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const photoUrl = ref('')
const fileInput = ref(null)

// CUSTOMIZE THESE VALUES!
const coupleName = 'Ty i Ja'

onMounted(() => {
  const savedPhoto = localStorage.getItem('couplePhoto')
  if (savedPhoto) {
    photoUrl.value = savedPhoto
  }
})

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      photoUrl.value = e.target.result
      localStorage.setItem('couplePhoto', e.target.result)
    }
    reader.readAsDataURL(file)
  }
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

.upload-btn {
  background: var(--primary);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
}

.upload-btn:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
}

.photo {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: fadeIn 0.5s ease-out;
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

@media (max-width: 768px) {
  .couple-names {
    font-size: 1.5rem;
  }
}
</style>
