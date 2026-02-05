<template>
  <div class="main-view">
    <HeroCard />
    <DateCounter />
    <LoveQuote />
    <BucketList />
  </div>
</template>

<script setup>
import HeroCard from '../components/HeroCard.vue'
import DateCounter from '../components/DateCounter.vue'
import LoveQuote from '../components/LoveQuote.vue'
import BucketList from '../components/BucketList.vue'
</script>

<style scoped>
.main-view {
  min-height: 100vh;
  padding: 1rem;
  padding-bottom: 3rem;
}

@media (min-width: 768px) {
  .main-view {
    padding: 2rem;
    max-width: 600px;
    margin: 0 auto;
  }
}
</style>
