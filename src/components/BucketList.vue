<template>
  <div class="bucket-list">
    <div class="bucket-header">
      <h2 class="bucket-title">Rzeczy które musimy razem zrobić</h2>
      <div v-if="loading" class="sync-status loading">
        ⏳ Synchronizacja...
      </div>
      <div v-else class="sync-status synced">
        ✓ Zsynchronizowane
      </div>
    </div>

    <!-- NOWY LAYOUT - 2 wiersze dla mobile -->
    <div class="add-item-section">
      <!-- Wiersz 1: Input + przycisk dodaj -->
      <div class="input-row">
        <input
            v-model="newItemText"
            @keyup.enter="addItem"
            type="text"
            placeholder="Dodaj nowy cel..."
            class="item-input"
            :disabled="loading"
        />
        <button
            @click="addItem"
            class="add-btn"
            :disabled="loading || !newItemText.trim()"
        >
          <span>{{ loading ? '⏳' : '+' }}</span>
        </button>
      </div>

      <!-- Wiersz 2: Wybór koloru (kto dodaje) -->
      <div class="color-row">
        <span class="color-label">Kto dodaje:</span>
        <div class="color-selector">
          <button
              @click="selectedColor = 'pink'"
              class="color-btn pink"
              :class="{ active: selectedColor === 'pink' }"
              :disabled="loading"
          >
            <span class="emoji">💕</span>
            <span class="label">Ona</span>
          </button>
          <button
              @click="selectedColor = 'blue'"
              class="color-btn blue"
              :class="{ active: selectedColor === 'blue' }"
              :disabled="loading"
          >
            <span class="emoji">💙</span>
            <span class="label">Ja</span>
          </button>
        </div>
      </div>
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
        <button
            @click="removeItem(item.id)"
            class="delete-btn"
            :disabled="loading"
        >
          <span>×</span>
        </button>
      </div>
    </transition-group>

    <div v-if="bucketItems.length === 0 && !loading" class="empty-state">
      <div class="empty-icon">📝</div>
      <p>Wspólne marzenia tutaj!</p>
      <p class="sync-info">✨ Wszystko będzie synchronizowane między Wami!</p>
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
import { ref, onMounted, onUnmounted } from 'vue'
import { useBucketList } from '../composables/useSupabase'

const newItemText = ref('')
const selectedColor = ref('pink')

// Supabase composable
const {
  bucketItems,
  loading,
  error,
  fetchBucketItems,
  addBucketItem,
  updateBucketItem,
  deleteBucketItem,
  subscribeToBucketList
} = useBucketList()

let unsubscribe = null

onMounted(async () => {
  console.log('🚀 Inicjalizacja BucketList...')

  // Pobierz bucket items z bazy danych
  await fetchBucketItems()

  // Jeśli baza jest pusta, dodaj domyślne items
  if (bucketItems.value.length === 0) {
    await addDefaultItems()
  }

  // Włącz realtime synchronizację
  unsubscribe = subscribeToBucketList((payload) => {
    console.log('📝 Bucket list zaktualizowana przez partnera!', payload)
  })
})

onUnmounted(() => {
  // Odsubskrybuj od realtime
  if (unsubscribe) {
    unsubscribe()
  }
})

const addDefaultItems = async () => {
  const defaultItems = [
    {
      id: Date.now(),
      text: 'Sex?',
      color: 'blue',
      completed: false
    },
    {
      id: Date.now() + 1,
      text: 'Włochy!',
      color: 'pink',
      completed: true
    },
    {
      id: Date.now() + 2,
      text: 'Nowy rok razem',
      color: 'pink',
      completed: true
    }
  ]

  for (const item of defaultItems) {
    try {
      await addBucketItem(item)
    } catch (err) {
      console.error('Błąd podczas dodawania domyślnego item:', err)
    }
  }
}

const addItem = async () => {
  if (newItemText.value.trim()) {
    try {
      const newItem = {
        id: Date.now(),
        text: newItemText.value.trim(),
        color: selectedColor.value,
        completed: false
      }

      await addBucketItem(newItem)

      newItemText.value = ''
      console.log('✅ Dodano nowy bucket item!')
    } catch (err) {
      console.error('❌ Błąd podczas dodawania bucket item:', err)
      alert('Wystąpił błąd podczas dodawania. Spróbuj ponownie.')
    }
  }
}

const toggleItem = async (id) => {
  try {
    const item = bucketItems.value.find(i => i.id === id)
    if (item) {
      await updateBucketItem(id, { completed: !item.completed })
      console.log('✅ Zaktualizowano bucket item!')
    }
  } catch (err) {
    console.error('❌ Błąd podczas aktualizacji bucket item:', err)
    alert('Wystąpił błąd podczas aktualizacji. Spróbuj ponownie.')
  }
}

const removeItem = async (id) => {
  if (confirm('Czy na pewno chcesz usunąć ten cel? Zostanie usunięty dla Was obojga.')) {
    try {
      await deleteBucketItem(id)
      console.log('✅ Usunięto bucket item!')
    } catch (err) {
      console.error('❌ Błąd podczas usuwania bucket item:', err)
      alert('Wystąpił błąd podczas usuwania. Spróbuj ponownie.')
    }
  }
}
</script>

<style scoped>
.bucket-list {
  animation: slideUp 0.8s ease-out 0.3s backwards;
  padding-bottom: env(safe-area-inset-bottom, 0px); /* iOS notch support */
}

.bucket-header {
  background: var(--card-bg);
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: var(--shadow);
  position: relative;
}

.bucket-title {
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  padding-right: 6rem; /* Miejsce na sync status */
}

.sync-status {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 0.7rem;
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
  font-weight: 500;
  white-space: nowrap;
}

.sync-status.loading {
  background: rgba(255, 184, 0, 0.2);
  color: #f39c12;
}

.sync-status.synced {
  background: rgba(46, 213, 115, 0.2);
  color: #2ed573;
}

.sync-info {
  color: var(--primary);
  font-size: 0.8rem;
  margin-top: 0.5rem;
}

/* NOWY LAYOUT - 2 wiersze dla lepszej responsywności */
.add-item-section {
  background: var(--card-bg);
  border-radius: 20px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* Wiersz 1: Input + przycisk dodaj */
.input-row {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  width: 100%;
}

.item-input {
  flex: 1;
  border: 2px solid rgba(255, 107, 157, 0.2);
  border-radius: 12px;
  padding: 0.875rem 1rem;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
  background: white;
  transition: all 0.3s ease;
  min-width: 0; /* Zapobiega overflow */
}

.item-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.item-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(255, 107, 157, 0.1);
}

.add-btn {
  width: 48px;
  height: 48px;
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
  flex-shrink: 0;
}

.add-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.add-btn:active:not(:disabled) {
  transform: scale(0.95);
}

/* Wiersz 2: Wybór koloru */
.color-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
}

.color-label {
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-weight: 500;
  white-space: nowrap;
}

.color-selector {
  display: flex;
  gap: 0.5rem;
  flex: 1;
}

.color-btn {
  flex: 1;
  min-width: 0; /* Zapobiega overflow */
  max-width: 120px; /* Ograniczenie maksymalnej szerokości */
  height: 44px;
  border-radius: 12px;
  border: 2px solid transparent;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  transition: all 0.3s ease;
  padding: 0 0.75rem;
}

.color-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.color-btn .emoji {
  font-size: 1.2rem;
  flex-shrink: 0;
}

.color-btn .label {
  font-size: 0.9rem;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
}

.color-btn.pink {
  border-color: #ff6b9d;
  color: #ff6b9d;
}

.color-btn.blue {
  border-color: #6bb6ff;
  color: #6bb6ff;
}

.color-btn.active {
  transform: scale(1.02);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.color-btn.pink.active {
  background: rgba(255, 107, 157, 0.15);
  border-color: #ff6b9d;
}

.color-btn.blue.active {
  background: rgba(107, 182, 255, 0.15);
  border-color: #6bb6ff;
}

.color-btn:active:not(:disabled) {
  transform: scale(0.98);
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-bottom: 1rem;
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
  min-width: 0; /* Zapobiega overflow */
  -webkit-tap-highlight-color: transparent; /* Usuwa highlight na iOS */
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
  word-wrap: break-word;
  overflow-wrap: break-word;
  min-width: 0; /* Zapobiega overflow */
}

.item-indicator {
  font-size: 1.2rem;
  flex-shrink: 0;
}

.delete-btn {
  width: 36px;
  height: 36px;
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
  -webkit-tap-highlight-color: transparent;
}

.delete-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.delete-btn:active:not(:disabled) {
  background: var(--primary);
  color: white;
  transform: scale(0.95);
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
  padding: 1rem 1rem 1.5rem;
  flex-wrap: wrap;
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
  flex-shrink: 0;
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
  white-space: nowrap;
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

/* Responsive breakpoints */
@media (max-width: 380px) {
  /* Dla małych ekranów - jeszcze kompaktowniejszy */
  .bucket-title {
    font-size: 1.25rem;
  }

  .color-label {
    font-size: 0.8rem;
  }

  .color-btn {
    padding: 0 0.5rem;
  }

  .color-btn .label {
    font-size: 0.85rem;
  }

  .add-btn {
    width: 44px;
    height: 44px;
  }
}

@media (min-width: 480px) {
  /* Dla większych ekranów - input row może być w jednym rzędzie */
  .add-item-section {
    padding: 1.25rem;
  }

  .color-btn {
    max-width: 150px;
  }
}

@media (min-width: 768px) {
  /* Tablet i desktop - wszystko w jednym rzędzie */
  .add-item-section {
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }

  .input-row {
    flex: 1;
  }

  .color-row {
    width: auto;
    flex: 0 0 auto;
  }

  .color-label {
    display: inline;
  }

  .bucket-title {
    font-size: 1.75rem;
  }
}

/* iOS Safari specific fixes */
@supports (-webkit-touch-callout: none) {
  .item-input {
    font-size: 16px; /* Zapobiega zoom na iOS */
  }

  .color-btn {
    -webkit-tap-highlight-color: transparent;
  }
}

/* Android Chrome specific fixes */
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  input[type="text"] {
    font-size: 16px; /* Zapobiega zoom na Android */
  }
}
</style>