<template>
  <div class="date-counter" @click="toggleDateMode">
    <div class="counter-card">
      <transition name="flip" mode="out-in">
        <div v-if="!showCalendar" key="time" class="counter-content">
          <div class="label">jak długo jestem najszczęśliwszym chłopakiem na świecie:</div>
          <div class="time-grid">
            <div class="time-unit">
              <div class="number">{{ timeElapsed.days }}</div>
              <div class="unit-label">dni</div>
            </div>
            <div class="separator">:</div>
            <div class="time-unit">
              <div class="number">{{ timeElapsed.hours }}</div>
              <div class="unit-label">godzin</div>
            </div>
            <div class="separator">:</div>
            <div class="time-unit">
              <div class="number">{{ timeElapsed.minutes }}</div>
              <div class="unit-label">minut</div>
            </div>
            <div class="separator">:</div>
            <div class="time-unit">
              <div class="number">{{ timeElapsed.seconds }}</div>
              <div class="unit-label">sekund</div>
            </div>
          </div>
        </div>

        <div v-else key="calendar" class="counter-content calendar-view">
          <div class="label">czyli inaczej mówiąc:</div>
          <div class="calendar-stats">
            <div class="stat-item">
              <div class="stat-icon">📅</div>
              <div class="stat-content">
                <div class="stat-value">{{ formattedStartDate }}</div>
                <div class="stat-label">Data rozpoczęcia</div>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">⏱️</div>
              <div class="stat-content">
                <div class="stat-value">{{ totalTime }}</div>
                <div class="stat-label">Łączny czas razem</div>
              </div>
            </div>
            <div class="stat-item highlight">
              <div class="stat-icon">❤️</div>
              <div class="stat-content">
                <div class="stat-value">{{ timeElapsed.days }}</div>
                <div class="stat-label">Szczęśliwych dni</div>
              </div>
            </div>
            <div class="calendar-stats">
              <div class="stat-item">
                <div class="stat-icon">✨</div>
                <div class="stat-content">
                  <div class="stat-value">{{ formattedFavDate }}</div>
                  <div class="stat-label">od mojego ulubionego dnia tez troche minęło...<br> {{timeElapsed2.days}} dni {{timeElapsed2.hours}} godzin</div>
                </div>
              </div>
          </div>
        </div>
        </div>
      </transition>

      <div class="tap-hint">
        <span>👆 Dotknij, żeby zmienić widok</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

//  (format: YYYY-MM-DD HH:mm:ss)
const START_DATE = new Date('2025-10-03 18:30:00')
const FAV_DATE = new Date('2023-05-06 15:27:00')
const showCalendar = ref(false)
const currentTime = ref(new Date())
let intervalId = null

const timeElapsed = computed(() => {
  const diff = currentTime.value - START_DATE
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  
  return {
    days: String(days).padStart(3, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0')
  }
})
const timeElapsed2 = computed(() => {
  const diff = currentTime.value - FAV_DATE

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  return {
    days: String(days).padStart(3, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0')
  }
})

const formattedStartDate = computed(() => {
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  }
  return START_DATE.toLocaleDateString('pl-PL', options)
})
const formattedFavDate = computed(() => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  return FAV_DATE.toLocaleDateString('pl-PL', options)
})

const totalTime = computed(() => {
  const diff = currentTime.value - START_DATE
  const totalHours = Math.floor(diff / (1000 * 60 * 60))
  const totalMinutes = Math.floor(diff / (1000 * 60))
  
  return `${totalHours.toLocaleString('pl-PL')} godzin`
})

const toggleDateMode = () => {
  showCalendar.value = !showCalendar.value
}

onMounted(() => {
  intervalId = setInterval(() => {
    currentTime.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<style scoped>
.date-counter {
  margin-bottom: 1.5rem;
  animation: slideUp 0.8s ease-out 0.1s backwards;
}

.counter-card {
  background: var(--card-bg);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: var(--shadow);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.counter-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
}

.counter-card:active {
  transform: translateY(-2px);
}

.counter-content {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.label {
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  line-height: 1.5;
  max-width: 90%;
}

.time-grid {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.time-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.number {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: 'Playfair Display', serif;
  min-width: 60px;
  text-align: center;
}

.unit-label {
  font-size: 0.75rem;
  color: var(--text-light);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.separator {
  font-size: 2rem;
  color: var(--primary);
  font-weight: 700;
  margin: 0 0.25rem;
}

.calendar-view {
  padding: 1rem 0;
}

.calendar-stats {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 107, 157, 0.05);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.stat-item.highlight {
  background: linear-gradient(135deg, rgba(255, 107, 157, 0.1), rgba(196, 113, 237, 0.1));
  border: 2px solid var(--primary-light);
}

.stat-icon {
  font-size: 2rem;
  min-width: 50px;
  text-align: center;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.85rem;
  color: var(--text-light);
}

.tap-hint {
  text-align: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 107, 157, 0.1);
  color: var(--text-light);
  font-size: 0.85rem;
}

.flip-enter-active,
.flip-leave-active {
  transition: all 0.4s ease;
}

.flip-enter-from {
  opacity: 0;
  transform: rotateY(90deg);
}

.flip-leave-to {
  opacity: 0;
  transform: rotateY(-90deg);
}

@media (max-width: 768px) {
  .number {
    font-size: 2rem;
    min-width: 50px;
  }

  .separator {
    font-size: 1.5rem;
    margin: 0;
  }

  .time-grid {
    gap: 0.25rem;
  }

  .stat-value {
    font-size: 1rem;
  }
}
</style>
