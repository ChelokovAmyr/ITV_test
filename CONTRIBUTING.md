# 🤝 Руководство по внесению вклада

## Добро пожаловать!

Спасибо за интерес к проекту! Это руководство поможет вам внести свой вклад.

## Структура проекта

```
src/
├── components/          # Vue компоненты
│   ├── Dashboard.vue   # Главный компонент
│   └── widgets/        # Виджеты
├── composables/        # Переиспользуемая логика
├── stores/             # Pinia stores
├── types/              # TypeScript типы
└── main.ts            # Точка входа
```

## Добавление нового виджета

### Шаг 1: Создайте компонент виджета

Создайте файл в `src/components/widgets/YourWidget.vue`:

```vue
<template>
  <div class="widget your-widget">
    <h2 class="widget-title">Your Widget</h2>

    <div v-if="loading" class="widget-loading">
      <div class="skeleton skeleton-text"></div>
    </div>

    <div v-else-if="error" class="widget-error">
      <p>❌ Error loading data</p>
      <p class="error-message">{{ error.message }}</p>
    </div>

    <div v-else-if="data" class="widget-content">
      <!-- Your widget content -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataFetcher } from '@/composables/useDataFetcher';
import type { YourDataType, YourWidgetSettings } from '@/types';

interface Props {
  settings: YourWidgetSettings;
}

const props = defineProps<Props>();

const { data, loading, error } = useDataFetcher<YourDataType>(
  `/api/your-endpoint`
);
</script>

<style scoped>
.your-widget {
  background: linear-gradient(135deg, #color1 0%, #color2 100%);
  color: white;
}
</style>
```

### Шаг 2: Добавьте типы

В `src/types/index.ts`:

```typescript
export interface YourDataType {
  // ... ваши поля
}

export interface YourWidgetSettings {
  // ... настройки виджета
}
```

### Шаг 3: Зарегистрируйте виджет

В `src/components/Dashboard.vue` добавьте:

```typescript
const widgetComponents = {
  // ... существующие
  YourWidget: defineAsyncComponent(() => import('./widgets/YourWidget.vue'))
};
```

### Шаг 4: Добавьте API endpoint

В `server/index.js`:

```javascript
app.get('/api/your-endpoint', (req, res) => {
  setTimeout(() => {
    res.json({ /* ваши данные */ });
  }, 500);
});
```

## Стандарты кодирования

### TypeScript

- Всегда используйте типизацию
- Избегайте `any`
- Используйте интерфейсы для объектов

### Vue

- Используйте Composition API
- Используйте `<script setup>`
- Именуйте компоненты в PascalCase

### CSS

- Используйте scoped стили
- Следуйте BEM методологии для классов
- Используйте CSS переменные для цветов

### Именование

- Компоненты: `PascalCase.vue`
- Composables: `useCamelCase.ts`
- Типы: `PascalCase`
- Переменные: `camelCase`

## Commit сообщения

Используйте conventional commits:

```
feat: добавить новый виджет погоды
fix: исправить ошибку загрузки данных
docs: обновить README
style: улучшить стилизацию виджетов
refactor: оптимизировать useDataFetcher
test: добавить тесты для Dashboard
```

## Pull Request процесс

1. Создайте fork репозитория
2. Создайте ветку: `git checkout -b feature/your-feature`
3. Сделайте изменения
4. Закоммитьте: `git commit -m "feat: your feature"`
5. Запушьте: `git push origin feature/your-feature`
6. Создайте Pull Request

## Тестирование

Перед отправкой PR убедитесь, что:

- [ ] Приложение запускается без ошибок
- [ ] Все виджеты корректно отображаются
- [ ] Нет TypeScript ошибок: `npm run build`
- [ ] Код отформатирован

## Вопросы?

Если у вас есть вопросы, создайте Issue в репозитории!

