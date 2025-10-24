<template>
  <div class="widget weather">
    <h2 class="widget-title">Погода</h2>

    <div v-if="loading" class="widget-loading">
      <div class="skeleton skeleton-circle"></div>
      <div class="skeleton skeleton-text"></div>
      <div class="skeleton skeleton-text short"></div>
    </div>

    <div v-else-if="error" class="widget-error">
      <p>❌ Ошибка загрузки погоды</p>
      <p class="error-message">{{ error.message }}</p>
    </div>

    <div v-else-if="data" class="widget-content">
      <div class="weather-icon">
        {{ getWeatherIcon(data.description) }}
      </div>
      <div class="weather-info">
        <h3 class="weather-city">{{ data.city }}</h3>
        <p class="weather-temp">{{ data.temperature }}°C</p>
        <p class="weather-desc">{{ data.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue';
import { useUserStore } from '@/stores/userStore';
import type { Weather, WeatherSettings } from '@/types';

interface Props {
  settings: WeatherSettings;
}

const props = defineProps<Props>();
const userStore = useUserStore();

const data = ref<Weather | null>(null);
const loading = ref<boolean>(false);
const error = ref<Error | null>(null);

const targetCity = computed(() => {
  return userStore.userCity || props.settings.defaultCity;
});

const fetchWeather = async (city: string) => {
  loading.value = true;
  error.value = null;

  try {
    const response = await fetch(`/api/weather?city=${city}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    data.value = result as Weather;
  } catch (e) {
    error.value = e instanceof Error ? e : new Error('Произошла неизвестная ошибка');
    console.error('Ошибка загрузки данных:', e);
  } finally {
    loading.value = false;
  }
};

fetchWeather(targetCity.value);

watch(targetCity, (newCity) => {
  fetchWeather(newCity);
});

const getWeatherIcon = (description: string): string => {
  const desc = description.toLowerCase();
  if (desc.includes('sunny') || desc.includes('clear')) return '☀️';
  if (desc.includes('cloud')) return '☁️';
  if (desc.includes('rain')) return '🌧️';
  if (desc.includes('snow')) return '❄️';
  return '🌤️';
};
</script>

<style scoped>
.weather {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
}

.widget-content {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.weather-icon {
  font-size: 4rem;
  flex-shrink: 0;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  line-height: 1;
  user-select: none;
}

.weather-info {
  flex: 1;
}

.weather-city {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.weather-temp {
  margin: 0.5rem 0;
  font-size: 2rem;
  font-weight: bold;
}

.weather-desc {
  margin: 0.5rem 0 0 0;
  font-size: 1rem;
  opacity: 0.9;
}

.skeleton-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
</style>

