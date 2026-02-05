<template>
  <div class="bucket-list">
    <div class="bucket-header">
      <h2 class="bucket-title">Rzeczy które musimy razem zrobić</h2>
      <p class="bucket-subtitle">

      </p>
    </div>

    <div class="add-item-section">
      <input 
        v-model="newItemText" 
        @keyup.enter="addItem"
        type="text" 
        placeholder="Dodaj nowy cel..." 
        class="item-input"
      />
      <div class="color-selector">
        <button 
          @click="selectedColor = 'pink'" 
          class="color-btn pink"
          :class="{ active: selectedColor === 'pink' }"
        >
          💕
        </button>
        <button 
          @click="selectedColor = 'blue'" 
          class="color-btn blue"
          :class="{ active: selectedColor === 'blue' }"
        >
          💙
        </button>
      </div>
      <button @click="addItem" class="add-btn">
        <span>+</span>
      </button>
    </div>

    <transition-group name="list" tag="div" class="items-list">
      <div 
        v-for="item in bucketItems" 
        :key="item.id"
        class="bucket-item"
        :class="[item.color, { completed: item.completed }]"
      >
        <div class="item-content" @click="toggleItem(item.id)">
          <div class="checkbox">
            <span v-if="item.completed" class="check">✓</span>
          </div>
          <div class="item-text">{{ item.text }}</div>
          <div class="item-indicator" :class="item.color">
            {{ item.color === 'pink' ? '💕' : '💙' }}
          </div>
        </div>
        <button @click="removeItem(item.id)" class="delete-btn">
          <span>×</span>
        </button>
      </div>
    </transition-group>

    <div v-if="bucketItems.length === 0" class="empty-state">
      <div class="empty-icon">📝</div>
      <p>Wspólne marzenia here!</p>
    </div>

    <div class="legend">
      <div class="legend-item">
        <span class="legend-color pink"></span>
        <span class="legend-text">Ona dodała</span>
      </div>
      <div class="legend-item">
        <span class="legend-color blue"></span>
        <span class="legend-text">Ja dodałem</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const bucketItems = ref([])
const newItemText = ref('')
const selectedColor = ref('pink')

// Load items from localStorage on mount
onMounted(() => {
  const saved = localStorage.getItem('bucketList')
  if (saved) {
    bucketItems.value = JSON.parse(saved)
  } else {
    // Default items to start with
    bucketItems.value = [
      {
        id: 1,
        text: 'Sex?',
        color: 'blue',
        completed: false
      },
      {
        id: 2,
        text: 'Włochy!',
        color: 'pink',
        completed: true
      },
      {
        id: 3,
        text: 'Nowy rok razem',
        color: 'pink',
        completed: true
      }
    ]
    saveToLocalStorage()
  }
})

const addItem = () => {
  if (newItemText.value.trim()) {
    const newItem = {
      id: Date.now(),
      text: newItemText.value.trim(),
      color: selectedColor.value,
      completed: false
    }
    bucketItems.value.push(newItem)
    newItemText.value = ''
    saveToLocalStorage()
  }
}

const toggleItem = (id) => {
  const item = bucketItems.value.find(i => i.id === id)
  if (item) {
    item.completed = !item.completed
    saveToLocalStorage()
  }
}

const removeItem = (id) => {
  bucketItems.value = bucketItems.value.filter(i => i.id !== id)
  saveToLocalStorage()
}

const saveToLocalStorage = () => {
  localStorage.setItem('bucketList', JSON.stringify(bucketItems.value))
}
</script>

<style scoped>
.bucket-list {
  animation: slideUp 0.8s ease-out 0.3s backwards;
}

.bucket-header {
  background: var(--card-bg);
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: var(--shadow);
}

.bucket-title {
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.bucket-subtitle {
  font-size: 0.9rem;
  color: var(--text-light);
  line-height: 1.5;
}

.add-item-section {
  background: var(--card-bg);
  border-radius: 20px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: var(--shadow);
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.item-input {
  flex: 1;
  border: 2px solid rgba(255, 107, 157, 0.2);
  border-radius: 12px;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  font-family: 'Poppins', sans-serif;
  background: white;
  transition: all 0.3s ease;
}

.item-input:focus {
  outline: none;
  border-color: var(--primary);
}

.color-selector {
  display: flex;
  gap: 0.5rem;
}

.color-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid transparent;
  background: white;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.color-btn.pink {
  border-color: #ff6b9d;
}

.color-btn.blue {
  border-color: #6bb6ff;
}

.color-btn.active {
  transform: scale(1.1);
  box-shadow: 0 0 0 3px rgba(255, 107, 157, 0.2);
}

.color-btn.pink.active {
  background: rgba(255, 107, 157, 0.1);
}

.color-btn.blue.active {
  background: rgba(107, 182, 255, 0.1);
}

.add-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, var(--primary), var(--primary-light));
  color: white;
  font-size: 1.5rem;
  font-weight: 300;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  line-height: 1;
}

.add-btn:hover {
  transform: rotate(90deg) scale(1.1);
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.bucket-item {
  background: var(--card-bg);
  border-radius: 16px;
  padding: 1rem;
  box-shadow: var(--shadow);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
}

.bucket-item.pink {
  border-left-color: #ff6b9d;
}

.bucket-item.blue {
  border-left-color: #6bb6ff;
}

.bucket-item.completed {
  opacity: 0.6;
}

.bucket-item.completed .item-text {
  text-decoration: line-through;
  color: var(--text-light);
}

.item-content {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
}

.checkbox {
  width: 24px;
  height: 24px;
  border: 2px solid var(--primary-light);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.bucket-item.completed .checkbox {
  background: var(--primary);
  border-color: var(--primary);
}

.check {
  color: white;
  font-weight: bold;
  font-size: 1rem;
}

.item-text {
  flex: 1;
  font-size: 0.95rem;
  color: var(--text-primary);
  line-height: 1.4;
}

.item-indicator {
  font-size: 1.2rem;
  flex-shrink: 0;
}

.delete-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 107, 157, 0.1);
  color: var(--primary);
  font-size: 1.5rem;
  font-weight: 300;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  line-height: 1;
  flex-shrink: 0;
}

.delete-btn:hover {
  background: var(--primary);
  color: white;
  transform: scale(1.1);
}

.empty-state {
  background: var(--card-bg);
  border-radius: 16px;
  padding: 3rem 1.5rem;
  text-align: center;
  box-shadow: var(--shadow);
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-state p {
  color: var(--text-light);
  font-size: 0.95rem;
}

.legend {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 1.5rem;
  padding: 1rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.legend-color {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.legend-color.pink {
  background: #ff6b9d;
}

.legend-color.blue {
  background: #6bb6ff;
}

.legend-text {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

/* List transitions */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-move {
  transition: transform 0.3s ease;
}
</style>
