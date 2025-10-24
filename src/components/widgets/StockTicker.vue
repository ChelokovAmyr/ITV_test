<template>
  <div class="widget stock-ticker">
    <h2 class="widget-title">Котировки акций</h2>

    <div v-if="loading" class="widget-loading">
      <div class="skeleton skeleton-text"></div>
      <div class="skeleton skeleton-text"></div>
      <div class="skeleton skeleton-text short"></div>
    </div>

    <div v-else-if="error" class="widget-error">
      <p>❌ Ошибка загрузки котировок</p>
      <p class="error-message">{{ error.message }}</p>
    </div>

    <div v-else-if="data" class="widget-content">
      <div v-for="stock in data" :key="stock.symbol" class="stock-item">
        <div class="stock-header">
          <span class="stock-symbol">{{ stock.symbol }}</span>
          <span class="stock-price">${{ stock.price.toFixed(2) }}</span>
        </div>
        <div class="stock-change" :class="stock.change >= 0 ? 'positive' : 'negative'">
          <span class="change-icon">{{ stock.change >= 0 ? '▲' : '▼' }}</span>
          <span class="change-value">{{ Math.abs(stock.change).toFixed(2) }} ({{ ((stock.change / stock.price) * 100).toFixed(2) }}%)</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataFetcher } from '@/composables/useDataFetcher';
import type { Stock, StockTickerSettings } from '@/types';

interface Props {
  settings: StockTickerSettings;
}

const props = defineProps<Props>();

const stocksUrl = computed(() => `/api/stocks?symbols=${props.settings.symbols.join(',')}`);
const { data, loading, error } = useDataFetcher<Stock[]>(stocksUrl.value);
</script>

<style scoped>
.stock-ticker {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.widget-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stock-item {
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.stock-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.stock-symbol {
  font-size: 1.25rem;
  font-weight: bold;
  letter-spacing: 0.5px;
}

.stock-price {
  font-size: 1.5rem;
  font-weight: 600;
}

.stock-change {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  font-weight: 500;
}

.stock-change.positive {
  color: #4ade80;
}

.stock-change.negative {
  color: #f87171;
}

.change-icon {
  font-size: 0.75rem;
}

@media (max-width: 768px) {
  .stock-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
}
</style>

