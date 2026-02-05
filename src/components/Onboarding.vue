<template>
  <div class="onboarding">
    <div class="hearts-background">
      <div v-for="i in 20" :key="i" class="heart" :style="getHeartStyle(i)">❤️</div>
    </div>
    
    <div class="content">
      <transition name="fade-slide" mode="out-in">
        <div v-if="currentStep === 0" key="step0" class="step">
          <h1 class="title">Cześć, kochanie 💕</h1>
          <p class="subtitle">Mam dla Ciebie coś wyjątkowego...</p>
          <button @click="nextStep" class="continue-btn">
            <span>Dotknij, żeby kontynuować</span>
            <span class="arrow">→</span>
          </button>
        </div>

        <div v-else-if="currentStep === 1" key="step1" class="step">
          <div class="emoji-large">🌟</div>
          <h2 class="message">To jest nasza historia</h2>
          <p class="description">
            Każda chwila z Tobą jest wyjątkowa
          </p>
          <button @click="nextStep" class="continue-btn">
            <span>Dalej</span>
            <span class="arrow">→</span>
          </button>
        </div>

        <div v-else-if="currentStep === 2" key="step2" class="step">
          <div class="emoji-large">💝</div>
          <h2 class="message">Od naszego pierwszego spotkania...</h2>
          <p class="description">
            Każdy dzień z Tobą jest jak prezent
          </p>
          <button @click="nextStep" class="continue-btn">
            <span>Dalej</span>
            <span class="arrow">→</span>
          </button>
        </div>

        <div v-else-if="currentStep === 3" key="step3" class="step">
          <div class="emoji-large">✨</div>
          <h2 class="message">Stworzyłem to specjalnie dla Ciebie</h2>
          <p class="description">
            Miejsce, gdzie możemy śledzić naszą wspólną drogę
          </p>
          <button @click="nextStep" class="continue-btn">
            <span>Dalej</span>
            <span class="arrow">→</span>
          </button>
        </div>

        <div v-else-if="currentStep === 4" key="step4" class="step">
          <div class="emoji-large animated-heart">💗</div>
          <h2 class="message">Bo kocham Cię najbardziej na świecie</h2>
          <p class="description">
            I chcę dzielić z Tobą każdą chwilę
          </p>
          <button @click="finish" class="continue-btn final-btn">
            <span>Zobacz naszą historię</span>
            <span class="arrow">❤️</span>
          </button>
        </div>
      </transition>
    </div>

    <div class="progress-dots">
      <div 
        v-for="i in 5" 
        :key="i" 
        class="dot" 
        :class="{ active: i - 1 === currentStep }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['complete'])
const currentStep = ref(0)

const nextStep = () => {
  if (currentStep.value < 4) {
    currentStep.value++
  }
}

const finish = () => {
  emit('complete')
}

const getHeartStyle = (i) => {
  const delay = Math.random() * 5
  const duration = 3 + Math.random() * 4
  const left = Math.random() * 100
  const size = 10 + Math.random() * 20
  
  return {
    left: `${left}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    fontSize: `${size}px`,
    opacity: 0.1 + Math.random() * 0.2
  }
}
</script>

<style scoped>
.onboarding {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  overflow: hidden;
}

.hearts-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.heart {
  position: absolute;
  animation: float 6s ease-in-out infinite;
}

.content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 500px;
  text-align: center;
}

.step {
  animation: fadeIn 0.8s ease-out;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  animation: pulse 2s ease-in-out infinite;
}

.subtitle {
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 3rem;
}

.emoji-large {
  font-size: 5rem;
  margin-bottom: 1.5rem;
  animation: float 3s ease-in-out infinite;
}

.animated-heart {
  animation: heartbeat 1.5s ease-in-out infinite;
}

.message {
  font-size: 1.8rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
  line-height: 1.4;
}

.description {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 3rem;
  line-height: 1.6;
}

.continue-btn {
  background: linear-gradient(135deg, var(--primary), var(--primary-light));
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 500;
  border-radius: 50px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
}

.continue-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover);
}

.continue-btn:active {
  transform: translateY(0);
}

.arrow {
  transition: transform 0.3s ease;
  font-size: 1.3rem;
}

.continue-btn:hover .arrow {
  transform: translateX(5px);
}

.final-btn {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  animation: pulse 2s ease-in-out infinite;
}

.progress-dots {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.8rem;
  z-index: 1;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 107, 157, 0.3);
  transition: all 0.3s ease;
}

.dot.active {
  width: 24px;
  border-radius: 4px;
  background: var(--primary);
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.6s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }

  .message {
    font-size: 1.5rem;
  }

  .emoji-large {
    font-size: 4rem;
  }
}
</style>
