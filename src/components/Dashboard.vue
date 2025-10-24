<template>
  <div class="dashboard-container">
    <header class="dashboard-header">
      <h1>📊 Панель виджетов</h1>
      <p class="subtitle">Динамическая система виджетов с данными в реальном времени</p>
    </header>

    <div v-if="loading" class="dashboard-loading">
      <div class="spinner"></div>
      <p>Загрузка конфигурации панели...</p>
    </div>

    <div v-else-if="error" class="dashboard-error">
      <p>❌ Ошибка загрузки панели</p>
      <p class="error-message">{{ error.message }}</p>
    </div>

    <div v-else-if="data" class="dashboard-grid">
      <component
        v-for="widget in data"
        :key="widget.id"
        :is="getWidgetComponent(widget.component)"
        :settings="widget.settings"
        class="dashboard-widget"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { useDataFetcher } from '@/composables/useDataFetcher';
import type { WidgetConfig } from '@/types';

const { data, loading, error } = useDataFetcher<WidgetConfig[]>('/api/dashboard');

const widgetComponents = {
  UserProfile: defineAsyncComponent(() => import('./widgets/UserProfile.vue')),
  Weather: defineAsyncComponent(() => import('./widgets/Weather.vue')),
  StockTicker: defineAsyncComponent(() => import('./widgets/StockTicker.vue'))
};

const getWidgetComponent = (componentName: string) => {
  return widgetComponents[componentName as keyof typeof widgetComponents] || null;
};
</script>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  background: linear-gradient(to bottom right, #1a1a2e, #16213e, #0f3460);
  padding: 2rem;
}

.dashboard-header {
  text-align: center;
  color: white;
  margin-bottom: 3rem;
  padding: 2rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.dashboard-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  margin: 0;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 300;
}

.dashboard-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  color: white;
  gap: 1.5rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.dashboard-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  color: white;
  background: rgba(248, 113, 113, 0.1);
  border: 2px solid rgba(248, 113, 113, 0.3);
  border-radius: 16px;
  padding: 2rem;
  margin: 2rem auto;
  max-width: 500px;
}

.error-message {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
}

.dashboard-widget {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .dashboard-container {
    padding: 1rem;
  }

  .dashboard-header h1 {
    font-size: 1.75rem;
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .dashboard-header h1 {
    font-size: 1.5rem;
  }

  .subtitle {
    font-size: 0.875rem;
  }
}
</style>

