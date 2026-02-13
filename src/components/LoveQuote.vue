<template>
  <div class="love-quote">
    <div class="quote-card">
      <div class="quote-icon">"</div>
      <transition name="fade" mode="out-in">
        <p :key="currentQuote" class="quote-text">{{ currentQuote }}</p>
      </transition>
      <div class="quote-author">
        <div class="heart">💕</div>
        <p class="source">{{ quoteSource }}</p>
      </div>
      <button @click="nextQuote" class="refresh-btn">
        <span class="icon">🔄</span>
        <span>next</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const quotes = [
  {
    text: 'kocham cię najmocniej na świecie',
    source: '1'
  },
  {
    text: 'kocham zasypiać i budzić się koło ciebie',
    source: '2'
  },
  {
    text: 'kocham twój śmiech',
    source: '3'
  },
  {
    text: 'kocham gdy patrzysz sie na mnie jakbyś chciała mnie zabić',
    source: '4'
  },
  {
    text: 'kocham twoje nieśmieszne żarty',
    source: '5'
  },
  {
    text: 'kocham patrzeć na ciebie jak gotujesz',
    source: '6'
  },
  {
    text: 'kocham cię mój mały freaku',
    source: '7'
  },
  {
    text: 'kocham kiedy nieświadomie poprawiasz mi humor jak mam zły dzień',
    source: '8'
  },
  {
    text: 'kocham jak się uśmiechasz',
    source: '9'
  },
  {
    text: 'kocham twoją życzliwość',
    source: '10'
  },
  {
    text: 'kocham cię bo jesteś dobrą osobą',
    source: '11'
  },
  {
    text: 'kocham twoją cieprliwość do mnie',
    source: '12'
  },
  {
    text: 'kocham twoje niespodzianki',
    source: '13'
  },
  {
    text: 'kocham cie za nasze wspólne wspomnienia',
    source: '14'
  },
  {
    text: 'kocham cię bo jesteś jednocześnie moją przyjaciółką',
    source: '15'
  },
  {
    text: 'kocham to jak się starasz',
    source: '16'
  },
  {
    text: 'kocham jak pchasz się w gips czasami',
    source: '17'
  },
  {
    text: 'kocham jak z tobą się uczę nowych rzeczy',
    source: '18'
  },
  {
    text: 'kocham cię za to że jesteś ze mną szczera',
    source: '19'
  },
  {
    text: 'kocham myśleć o tobie',
    source: '20'
  },
  {
    text: 'kocham ćwiczyć na tobie masaż',
    source: '21'
  },
  {
    text: 'kocham jak się do mnie przytulasz',
    source: '22'
  },
  {
    text: 'kocham to jak na mnie patrzysz frfr',
    source: '23'
  },
  {
    text: 'kocham cię za twoją pomysłowość',
    source: '24'
  },
  {
    text: 'kocham myśleć o tobie',
    source: '25'
  },
  {
    text: 'kocham cię brudasie<3',
    source: '26'
  },
  {
    text: 'kocham jak nazywasz mnie informatykiem',
    source: '27'
  },
  {
    text: 'kocham to jak sobie dobrze radzisz',
    source: '28'
  },
  {
    text: 'kocham cię i jestem z ciebie dumny',
    source: '29'
  },
  {
    text: 'kocham twoje oczka',
    source: '30'
  },
  {
    text: 'kocham twoje piegi jak się opalisz',
    source: '31'
  },
  {
    text: 'kocham twoje całe 160+3cm wzrostu',
    source: '32'
  },
  {
    text: 'kocham twój charakter',
    source: '33'
  },
  {
    text: 'kocham to jak łatwo się godzimy po kłótni',
    source: '34'
  },
  {
    text: 'kocham dowiadywać się nowych rzeczy o tobie',
    source: '35'
  },
  {
    text: 'kocham jak mi opowiadasz co robiłaś',
    source: '36'
  },
]

const currentQuoteIndex = ref(0)

const currentQuote = ref(quotes[0].text)
const quoteSource = ref(quotes[0].source)

const nextQuote = () => {
  let randomIndex

  // Keep generating random numbers until we get a different quote
  do {
    randomIndex = Math.floor(Math.random() * quotes.length)
  } while (randomIndex === currentQuoteIndex.value && quotes.length > 1)

  currentQuoteIndex.value = randomIndex
  currentQuote.value = quotes[randomIndex].text
  quoteSource.value = quotes[randomIndex].source
}


onMounted(() => {
  // Randomly select initial quote
  const randomIndex = Math.floor(Math.random() * quotes.length)
  currentQuoteIndex.value = randomIndex
  currentQuote.value = quotes[randomIndex].text
  quoteSource.value = quotes[randomIndex].source
})
</script>

<style scoped>
.love-quote {
  margin-bottom: 1.5rem;
  animation: slideUp 0.8s ease-out 0.2s backwards;
}

.quote-card {
  background: linear-gradient(135deg, rgba(255, 107, 157, 0.1), rgba(196, 113, 237, 0.1));
  border-radius: 20px;
  padding: 2rem 1.5rem;
  box-shadow: var(--shadow);
  position: relative;
  overflow: hidden;
}

.quote-card::before {
  content: '❤️';
  position: absolute;
  top: -20px;
  right: -20px;
  font-size: 120px;
  opacity: 0.05;
  transform: rotate(15deg);
}

.quote-icon {
  font-size: 4rem;
  font-family: 'Playfair Display', serif;
  color: var(--primary-light);
  line-height: 1;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.quote-text {
  font-size: 1.2rem;
  line-height: 1.7;
  color: var(--text-primary);
  font-style: italic;
  margin-bottom: 1.5rem;
  min-height: 80px;
  display: flex;
  align-items: center;
}

.quote-author {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.heart {
  font-size: 1.2rem;
}

.source {
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
}

.refresh-btn {
  background: white;
  color: var(--primary);
  border: 2px solid var(--primary-light);
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
}

.refresh-btn:hover {
  background: var(--primary);
  color: white;
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.refresh-btn .icon {
  transition: transform 0.3s ease;
}

.refresh-btn:hover .icon {
  transform: rotate(180deg);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
