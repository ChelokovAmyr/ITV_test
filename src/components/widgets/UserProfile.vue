<template>
  <div class="widget user-profile">
    <h2 class="widget-title">Профиль пользователя</h2>

    <div v-if="loading" class="widget-loading">
      <div class="skeleton skeleton-avatar"></div>
      <div class="skeleton skeleton-text"></div>
      <div class="skeleton skeleton-text short"></div>
    </div>

    <div v-else-if="error" class="widget-error">
      <p>❌ Ошибка загрузки данных пользователя</p>
      <p class="error-message">{{ error.message }}</p>
    </div>

    <div v-else-if="data" class="widget-content">
      <div class="user-avatar">
        {{ data.name.charAt(0) }}
      </div>
      <div class="user-info">
        <h3 class="user-name">{{ data.name }}</h3>
        <p class="user-detail">
          <span class="label">ID:</span> {{ data.id }}
        </p>
        <p class="user-detail">
          <span class="label">Город:</span> {{ data.city }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useDataFetcher } from '@/composables/useDataFetcher';
import { useUserStore } from '@/stores/userStore';
import type { User, UserProfileSettings } from '@/types';

interface Props {
  settings: UserProfileSettings;
}

const props = defineProps<Props>();
const userStore = useUserStore();

const { data, loading, error } = useDataFetcher<User>(`/api/users/${props.settings.userId}`);

watch(data, (newData) => {
  if (newData) {
    userStore.setUserData(newData);
  }
});
</script>

<style scoped>
.user-profile {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.widget-content {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.user-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  flex-shrink: 0;
  border: 3px solid rgba(255, 255, 255, 0.3);
}

.user-info {
  flex: 1;
}

.user-name {
  margin: 0 0 0.75rem 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.user-detail {
  margin: 0.5rem 0;
  font-size: 0.95rem;
  opacity: 0.95;
}

.label {
  opacity: 0.7;
  font-size: 0.85rem;
  margin-right: 0.25rem;
}

.skeleton-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
</style>

