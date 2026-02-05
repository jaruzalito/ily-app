<template>
  <div class="app">
    <Onboarding v-if="!onboardingComplete" @complete="completeOnboarding" />
    <MainView v-else />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Onboarding from './components/Onboarding.vue'
import MainView from './views/MainView.vue'

const onboardingComplete = ref(false)

onMounted(() => {
  // Onboarding will show every time - no localStorage check
  onboardingComplete.value = false
})

const completeOnboarding = () => {
  // Don't save to localStorage - just complete this session
  onboardingComplete.value = true
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  width: 100%;
}
</style>
