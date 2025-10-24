# 📚 Примеры использования

## Создание нового виджета

### Пример: Виджет новостей

#### 1. Создайте тип данных

```typescript
// src/types/index.ts

export interface News {
  id: number;
  title: string;
  content: string;
  publishedAt: string;
}

export interface NewsSettings {
  category: string;
  limit: number;
}
```

#### 2. Создайте компонент виджета

```vue
<!-- src/components/widgets/News.vue -->
<template>
  <div class="widget news-widget">
    <h2 class="widget-title">📰 News</h2>

    <div v-if="loading" class="widget-loading">
      <div class="skeleton skeleton-text"></div>
      <div class="skeleton skeleton-text"></div>
      <div class="skeleton skeleton-text short"></div>
    </div>

    <div v-else-if="error" class="widget-error">
      <p>❌ Error loading news</p>
      <p class="error-message">{{ error.message }}</p>
    </div>

    <div v-else-if="data" class="widget-content">
      <div v-for="article in data.slice(0, settings.limit)" :key="article.id" class="news-item">
        <h3>{{ article.title }}</h3>
        <p>{{ article.content }}</p>
        <span class="date">{{ formatDate(article.publishedAt) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataFetcher } from '@/composables/useDataFetcher';
import type { News, NewsSettings } from '@/types';

interface Props {
  settings: NewsSettings;
}

const props = defineProps<Props>();

const newsUrl = computed(() => `/api/news?category=${props.settings.category}`);
const { data, loading, error } = useDataFetcher<News[]>(newsUrl.value);

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};
</script>

<style scoped>
.news-widget {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
  color: white;
}

.news-item {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.news-item:last-child {
  border-bottom: none;
}

.news-item h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

.news-item p {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  opacity: 0.9;
}

.date {
  font-size: 0.8rem;
  opacity: 0.7;
}
</style>
```

#### 3. Зарегистрируйте в Dashboard

```typescript
// src/components/Dashboard.vue

const widgetComponents = {
  UserProfile: defineAsyncComponent(() => import('./widgets/UserProfile.vue')),
  Weather: defineAsyncComponent(() => import('./widgets/Weather.vue')),
  StockTicker: defineAsyncComponent(() => import('./widgets/StockTicker.vue')),
  News: defineAsyncComponent(() => import('./widgets/News.vue')) // ← добавить
};
```

#### 4. Добавьте API endpoint

```javascript
// server/index.js

const mockNews = [
  { id: 1, title: 'Breaking News 1', content: 'Content...', publishedAt: '2025-10-24T10:00:00Z' },
  { id: 2, title: 'Breaking News 2', content: 'Content...', publishedAt: '2025-10-24T11:00:00Z' }
];

app.get('/api/news', (req, res) => {
  const category = req.query.category;
  setTimeout(() => {
    res.json(mockNews);
  }, 500);
});
```

#### 5. Обновите конфигурацию dashboard

```javascript
// server/index.js

dashboard: [
  { id: 1, component: 'UserProfile', settings: { userId: 123 } },
  { id: 2, component: 'Weather', settings: { defaultCity: 'Moscow' } },
  { id: 3, component: 'StockTicker', settings: { symbols: ['AAPL', 'GOOG'] } },
  { id: 4, component: 'News', settings: { category: 'tech', limit: 3 } } // ← добавить
]
```

## Обмен данными между виджетами

### Пример: Виджет валюты использует страну пользователя

#### 1. Расширьте userStore

```typescript
// src/stores/userStore.ts

export const useUserStore = defineStore('user', () => {
  const userCity = ref<string | null>(null);
  const userData = ref<User | null>(null);
  const userCountry = ref<string | null>(null); // ← добавить

  const setUserData = (user: User) => {
    userData.value = user;
    userCity.value = user.city;
    // Можно определить страну по городу
    userCountry.value = getCurrencyByCity(user.city);
  };

  return {
    userCity,
    userData,
    userCountry, // ← добавить
    setUserData
  };
});
```

#### 2. Используйте в виджете

```vue
<!-- src/components/widgets/Currency.vue -->
<script setup lang="ts">
import { computed, watch, ref } from 'vue';
import { useDataFetcher } from '@/composables/useDataFetcher';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();

const targetCountry = computed(() => {
  return userStore.userCountry || props.settings.defaultCountry;
});

const currencyUrl = computed(() => `/api/currency?country=${targetCountry.value}`);

// Re-fetch when country changes
watch(targetCountry, () => {
  // Reload data
});
</script>
```

## Использование composables

### Пример: Кастомный usePolling для автообновления

```typescript
// src/composables/usePolling.ts

import { ref, onMounted, onUnmounted } from 'vue';

export function usePolling(callback: () => void, interval: number) {
  const isActive = ref(true);
  let timerId: number | null = null;

  const startPolling = () => {
    if (!isActive.value) return;

    callback();
    timerId = window.setInterval(() => {
      if (isActive.value) {
        callback();
      }
    }, interval);
  };

  const stopPolling = () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  };

  onMounted(startPolling);
  onUnmounted(stopPolling);

  return {
    isActive,
    startPolling,
    stopPolling
  };
}
```

### Использование в виджете

```vue
<script setup lang="ts">
import { useDataFetcher } from '@/composables/useDataFetcher';
import { usePolling } from '@/composables/usePolling';

const { data, loading, error, fetchData } = useDataFetcher<Stock[]>('/api/stocks');

// Обновлять данные каждые 5 секунд
usePolling(fetchData, 5000);
</script>
```

## Условный рендеринг виджетов

### Пример: Показывать виджет только для админов

```vue
<!-- src/components/Dashboard.vue -->
<template>
  <div class="dashboard-grid">
    <component
      v-for="widget in filteredWidgets"
      :key="widget.id"
      :is="getWidgetComponent(widget.component)"
      :settings="widget.settings"
      class="dashboard-widget"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const userRole = ref('user'); // Получить из auth

const filteredWidgets = computed(() => {
  if (!data.value) return [];

  return data.value.filter(widget => {
    // Скрыть админские виджеты для обычных пользователей
    if (widget.component === 'AdminPanel' && userRole.value !== 'admin') {
      return false;
    }
    return true;
  });
});
</script>
```

## Кастомные стили для виджетов

### Пример: Виджет с темной темой

```vue
<style scoped>
.dark-widget {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: #ecf0f1;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.dark-widget .widget-title {
  color: #3498db;
  border-bottom: 2px solid #3498db;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

.dark-widget .widget-content {
  background: rgba(0, 0, 0, 0.2);
  padding: 1rem;
  border-radius: 8px;
}
</style>
```

## Обработка ошибок

### Пример: Retry логика

```typescript
// src/composables/useDataFetcherWithRetry.ts

import { ref, Ref } from 'vue';

interface Options {
  maxRetries?: number;
  retryDelay?: number;
}

export function useDataFetcherWithRetry<T>(
  url: string,
  options: Options = {}
) {
  const { maxRetries = 3, retryDelay = 1000 } = options;

  const data = ref<T | null>(null) as Ref<T | null>;
  const loading = ref<boolean>(false);
  const error = ref<Error | null>(null);
  const retryCount = ref(0);

  const fetchData = async () => {
    loading.value = true;
    error.value = null;

    for (let i = 0; i <= maxRetries; i++) {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        data.value = await response.json();
        retryCount.value = 0;
        break;
      } catch (e) {
        retryCount.value = i + 1;

        if (i === maxRetries) {
          error.value = e instanceof Error ? e : new Error('Failed after retries');
        } else {
          await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
      }
    }

    loading.value = false;
  };

  fetchData();

  return { data, loading, error, retryCount, fetchData };
}
```

## WebSocket интеграция

### Пример: Real-time обновления

```typescript
// src/composables/useWebSocket.ts

import { ref, onMounted, onUnmounted } from 'vue';

export function useWebSocket<T>(url: string) {
  const data = ref<T | null>(null);
  const isConnected = ref(false);
  let ws: WebSocket | null = null;

  const connect = () => {
    ws = new WebSocket(url);

    ws.onopen = () => {
      isConnected.value = true;
    };

    ws.onmessage = (event) => {
      data.value = JSON.parse(event.data);
    };

    ws.onclose = () => {
      isConnected.value = false;
    };
  };

  const disconnect = () => {
    ws?.close();
  };

  onMounted(connect);
  onUnmounted(disconnect);

  return { data, isConnected, connect, disconnect };
}
```

### Использование в виджете

```vue
<script setup lang="ts">
import { useWebSocket } from '@/composables/useWebSocket';

const { data, isConnected } = useWebSocket<Stock[]>('ws://localhost:3000/stocks');
</script>

<template>
  <div class="connection-status">
    <span v-if="isConnected" class="connected">● Live</span>
    <span v-else class="disconnected">○ Offline</span>
  </div>
</template>
```

## Динамическая конфигурация

### Пример: Пользовательские настройки виджетов

```vue
<!-- src/components/widgets/ConfigurableWidget.vue -->
<template>
  <div class="widget" :style="widgetStyle">
    <div class="widget-settings">
      <button @click="showSettings = !showSettings">⚙️</button>
    </div>

    <div v-if="showSettings" class="settings-panel">
      <input v-model="localSettings.refreshRate" type="number" />
      <button @click="saveSettings">Save</button>
    </div>

    <!-- Widget content -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const showSettings = ref(false);
const localSettings = ref({ ...props.settings });

const widgetStyle = computed(() => ({
  background: localSettings.value.backgroundColor,
  color: localSettings.value.textColor
}));

const saveSettings = () => {
  // Save to localStorage or API
  localStorage.setItem('widgetSettings', JSON.stringify(localSettings.value));
  showSettings.value = false;
};
</script>
```

## Тестирование

### Пример: Unit тест для composable

```typescript
// src/composables/__tests__/useDataFetcher.spec.ts

import { describe, it, expect, vi } from 'vitest';
import { useDataFetcher } from '../useDataFetcher';

describe('useDataFetcher', () => {
  it('should fetch data successfully', async () => {
    const mockData = { id: 1, name: 'Test' };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData)
      })
    );

    const { data, loading, error } = useDataFetcher('/api/test');

    expect(loading.value).toBe(true);

    await new Promise(resolve => setTimeout(resolve, 100));

    expect(data.value).toEqual(mockData);
    expect(loading.value).toBe(false);
    expect(error.value).toBeNull();
  });
});
```

Эти примеры помогут вам расширить функциональность приложения и адаптировать его под свои нужды!

