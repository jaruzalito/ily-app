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
    text: 'kocham jak mi opowiadasz różne historie',
    source: '36'
  },
  {
    text: 'kocham cię słuchać',
    source: '37'
  },
  {
    text: 'kocham jak dzwonisz podpita',
    source: '38'
  },
  {
    text: 'kocham jak na mnie czekasz aż wrócę',
    source: '39'
  },
  {
    text: 'kocham każdy spędzony z tobą dzień',
    source: '40'
  },
  {
    text: 'kocham to że mamy podobne podejście do wielu tematów',
    source: '41'
  },
  {
    text: 'kocham cię bo jesteś moją kicią',
    source: '42'
  },
  {
    text: 'kocham jak się zawstydzasz',
    source: '43'
  },
  {
    text: 'kocham moją żone',
    source: '44'
  },
  {
    text: 'kocham gangstera?',
    source: '45'
  },
  {
    text: 'kocham twoje wszystkie osobowości',
    source: '46'
  },
  {
    text: 'kocham cię za to że zwracasz uwagę na małe szczegóły',
    source: '47'
  },
  {
    text: 'kocham jak do mnie gadasz przez sen',
    source: '48'
  },
  {
    text: 'kocham pić z tobą wino',
    source: '49'
  },
  {
    text: 'kocham cię bo mi stale imponujesz czymś nowym',
    source: '50'
  },
  {
    text: 'kocham cię nawet jak nie masz humoru',
    source: '51'
  },
  {
    text: 'kocham cię za to że mnie wspierasz',
    source: '52'
  },
  {
    text: 'kocham jak się odklejasz i wtedy ja się odklejam',
    source: '53'
  },
  {
    text: 'kocham jak używasz moich słówek',
    source: '54'
  },
  {
    text: 'kocham myśleć o naszej przyszłości',
    source: '55'
  },
  {
    text: 'kocham moją czarną kicie',
    source: '56'
  },
  {
    text: 'kocham cię nawet jak cię wkurwiam',
    source: '57'
  },
  {
    text: 'kocham cię nawet jak nie rozmawiamy zbyt dużo',
    source: '58'
  },
  {
    text: 'kochamm trzymać za ciebie kciuki',
    source: '59'
  },
  {
    text: 'kocham różnice między naszymi charakterami',
    source: '60'
  },
  {
    text: 'kocham cię za to że mnie motywujesz do pracy',
    source: '61'
  },
  {
    text: 'kocham fakt, że i tak na siebie trafiliśmy',
    source: '62'
  },
  {
    text: 'kocham cię od dnia w którym się poznaliśmy',
    source: '63'
  },
  {
    text: 'kocham się do ciebie przytulać',
    source: '64'
  },
  {
    text: 'kocham twoje głupiutkie pomysły',
    source: '65'
  },
  {
    text: 'kocham fakt, że będe musiał farbować siwe włosy przed 30stka ',
    source: '66'
  },
  {
    text: 'kocham cie wkurwiać',
    source: '67'
  },
  {
    text: 'kocham cię za to jaka wytrzymała jesteś',
    source: '68'
  },
  {
    text: 'kocham twoje śliczne włosy',
    source: '69'
  },
  {
    text: 'kocham każdy milimetr twojego ciała',
    source: '70'
  },
  {
    text: 'kocham to jak inteligentną osobą jesteś',
    source: '71'
  },
  {
    text: 'kocham z tobą pisać jak mi się oczy kleją do spania',
    source: '72'
  },
  {
    text: 'kocham dowiadywać się jak coś wygląda z twojej perspektywy',
    source: '73'
  },
  {
    text: 'kocham smiać się z tobą',
    source: '74'
  },
  {
    text: 'kocham jak zapodajesz jakies girly ploty',
    source: '75'
  },
  {
    text: 'kocham jak wysyłasz mi swoje fotki',
    source: '76'
  },
  {
    text: 'kocham się z tobą zakładać żeby mieć motywację',
    source: '77'
  },
  {
    text: 'kocham to jak zabawna czasami jesteś',
    source: '78'
  },
  {
    text: 'kocham twój styl ubierania się',
    source: '79'
  },
  {
    text: 'kocham patrzeć jak się nad czymś skupiasz',
    source: '80'
  },
  {
    text: 'kocham jak miłą osobą potrafisz być',
    source: '81'
  },
  {
    text: 'kocham twój british accent brzmi cool',
    source: '82'
  },
  {
    text: 'kocham to jak zaradna potrafisz być',
    source: '83'
  },
  {
    text: 'kocham jak troszczysz się o swoich przyjaciół',
    source: '84'
  },
  {
    text: 'kocham jak powstrzymujesz się żeby nie wybuchnąć wkurwem',
    source: '85'
  },
  {
    text: 'kocham cię nawet jak masz problem bo i tak wiem, że sobie poradzisz',
    source: '86'
  },
  {
    text: 'kocham jak śpiewasz(nawet mendesa :pp)',
    source: '87'
  },
  {
    text: 'kocham jak dbasz o nasze wspólne fotki',
    source: '88'
  },
  {
    text: 'kocham brać z tobą snusa',
    source: '89'
  },
  {
    text: 'kocham cię i zrobiłbym wszystko dla ciebie',
    source: '90'
  },
  {
    text: 'kocham jak ci sie czasami uda uświadomić mnie, że nie mam racji',
    source: '91'
  },
  {
    text: 'kocham cię bo mimo, że masz dużo na głowie, to sobie ze wszystkim radzisz',
    source: '92'
  },
  {
    text: 'kocham kłaść sie spać po twoim dobranoc',
    source: '93'
  },
  {
    text: 'kocham cię i wiem, że sobie poradzisz w życiu',
    source: '94'
  },
  {
    text: 'kocham jak masz humor i ci uśmiech nie schodzi z twarzy',
    source: '95'
  },
  {
    text: 'kocham myć się z tobą',
    source: '96'
  },
  {
    text: 'kocham jak się zgadzasz na moje głupie pomysły',
    source: '97'
  },
  {
    text: 'kocham nasze wspólne plany',
    source: '98'
  },
  {
    text: 'kocham cię wika bo po prostu jesteś sobą',
    source: '99'
  },
  {
    text: 'kocham cię! kocham cię! kocham cię! I to się nigdy nie zmieni',
    source: '100'
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
