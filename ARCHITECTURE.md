# 🏗️ Архитектура проекта

## Общий обзор

Приложение построено на принципах модульности, переиспользования кода и реактивности Vue 3.

## Диаграмма архитектуры

```
┌─────────────────────────────────────────────────────────┐
│                     Dashboard.vue                        │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Получает конфигурацию из /api/dashboard       │   │
│  │  Динамически загружает виджеты                  │   │
│  └─────────────────────────────────────────────────┘   │
│                          │                              │
│          ┌───────────────┼───────────────┐             │
│          │               │               │             │
│    ┌─────▼─────┐  ┌─────▼─────┐  ┌─────▼─────┐       │
│    │ UserProfile│  │  Weather  │  │StockTicker│       │
│    └─────┬─────┘  └─────┬─────┘  └─────┬─────┘       │
│          │               │               │             │
│          │   ┌───────────▼───────────┐   │             │
│          └──►│   useDataFetcher<T>   │◄──┘             │
│              └───────────────────────┘                 │
│                          │                              │
│          ┌───────────────┼───────────────┐             │
│          │               │               │             │
│    ┌─────▼─────┐  ┌─────▼─────┐  ┌─────▼─────┐       │
│    │/api/users │  │/api/weather│  │/api/stocks│       │
│    └───────────┘  └───────────┘  └───────────┘       │
└─────────────────────────────────────────────────────────┘

            ┌─────────────────────────┐
            │     Pinia Store         │
            │  (userStore)            │
            │  • userCity             │
            │  • userData             │
            │  • setUserData()        │
            └─────────────────────────┘
                     ▲
                     │
        ┌────────────┴────────────┐
        │                         │
   UserProfile              Weather
   (producer)             (consumer)
```

## Ключевые компоненты

### 1. Dashboard.vue

**Назначение:** Главный контейнер для всех виджетов

**Ответственности:**
- Загрузка конфигурации виджетов из API
- Динамическая загрузка компонентов виджетов
- Управление состояниями загрузки и ошибок
- Рендеринг виджетов в CSS Grid

**Особенности:**
- Использует `defineAsyncComponent` для ленивой загрузки
- Поддерживает любое количество виджетов
- Автоматически адаптируется к новым типам виджетов

### 2. Виджеты

#### UserProfile.vue
- Загружает данные пользователя
- Публикует город в `userStore`
- Отображает аватар, имя, ID и город

#### Weather.vue
- Подписывается на изменения города из `userStore`
- Загружает погоду для города пользователя
- Fallback на defaultCity из настроек

#### StockTicker.vue
- Загружает данные о акциях
- Отображает цену и изменение
- Визуальная индикация роста/падения

### 3. useDataFetcher<T>

**Назначение:** Универсальный composable для загрузки данных

**Сигнатура:**
```typescript
function useDataFetcher<T>(url: string): {
  data: Ref<T | null>;
  loading: Ref<boolean>;
  error: Ref<Error | null>;
  fetchData: () => Promise<void>;
}
```

**Преимущества:**
- Типобезопасность с TypeScript generics
- Автоматическое управление состояниями
- Переиспользуемость
- Обработка ошибок

**Использование:**
```typescript
const { data, loading, error } = useDataFetcher<User>('/api/users/123');
```

### 4. Pinia Store (userStore)

**Назначение:** Централизованное хранилище для обмена данными между виджетами

**State:**
- `userCity: string | null` - Город пользователя
- `userData: User | null` - Полные данные пользователя

**Actions:**
- `setUserCity(city: string)` - Установить город
- `setUserData(user: User)` - Установить данные пользователя

**Паттерн взаимодействия:**
```
UserProfile загружает данные
        │
        ▼
setUserData() в store
        │
        ▼
Watch в Weather обнаруживает изменение
        │
        ▼
Weather загружает новые данные
```

## Поток данных

### 1. Инициализация приложения

```
main.ts
  └─► createApp(App)
       ├─► createPinia()
       └─► mount('#app')
            └─► App.vue
                 └─► Dashboard.vue
```

### 2. Загрузка Dashboard

```
Dashboard.vue монтируется
        │
        ▼
useDataFetcher('/api/dashboard')
        │
        ▼
Получает массив конфигураций
        │
        ▼
Для каждой конфигурации:
  ├─► Динамически загружает компонент
  └─► Передает settings как props
```

### 3. Загрузка виджета

```
Widget монтируется
        │
        ▼
useDataFetcher(widgetUrl)
        │
        ▼
Отображает skeleton loader
        │
        ▼
Получает данные
        │
        ├─► Success: отображает данные
        └─► Error: отображает ошибку
```

### 4. Взаимодействие виджетов

```
UserProfile получает данные
        │
        ▼
watch(data) срабатывает
        │
        ▼
userStore.setUserData(data)
        │
        ▼
userCity обновляется
        │
        ▼
Weather.targetCity (computed) реагирует
        │
        ▼
watch(targetCity) срабатывает
        │
        ▼
Weather перезагружает данные
```

## Паттерны и принципы

### 1. Composition API

Все компоненты используют Composition API для:
- Лучшей организации кода
- Переиспользования логики
- Типизации TypeScript

### 2. Reactive Programming

- Использование `ref`, `computed`, `watch`
- Автоматическое обновление UI при изменении данных
- Декларативный подход

### 3. Dependency Injection

- Pinia для state management
- Props для передачи настроек
- Composables для логики

### 4. Dynamic Components

- `defineAsyncComponent` для code splitting
- Ленивая загрузка виджетов
- Меньший начальный bundle size

### 5. Error Handling

Трехуровневая система обработки ошибок:
1. **Composable уровень** - ловит и сохраняет ошибки
2. **Widget уровень** - отображает ошибки
3. **Dashboard уровень** - общие ошибки загрузки

### 6. Loading States

Три состояния для каждого виджета:
- **Loading** - skeleton loaders
- **Success** - данные
- **Error** - сообщение об ошибке

## TypeScript типизация

### Иерархия типов

```typescript
// Базовые типы данных
interface User { ... }
interface Weather { ... }
interface Stock { ... }

// Типы настроек виджетов
interface UserProfileSettings { ... }
interface WeatherSettings { ... }
interface StockTickerSettings { ... }

// Конфигурация виджета
interface WidgetConfig {
  id: number;
  component: string;
  settings: Record<string, any>;
}
```

### Generic типизация

```typescript
// useDataFetcher принимает тип данных
useDataFetcher<User>(url)      // Вернет Ref<User | null>
useDataFetcher<Weather>(url)   // Вернет Ref<Weather | null>
useDataFetcher<Stock[]>(url)   // Вернет Ref<Stock[] | null>
```

## Расширяемость

### Добавление нового виджета

1. Создать компонент в `src/components/widgets/`
2. Добавить типы в `src/types/index.ts`
3. Зарегистрировать в `Dashboard.vue`
4. Добавить API endpoint в `server/index.js`

### Добавление нового API

1. Добавить endpoint в `server/index.js`
2. Создать типы для данных
3. Использовать `useDataFetcher<T>` в компоненте

### Добавление глобального состояния

1. Создать новый store в `src/stores/`
2. Использовать в компонентах через `useYourStore()`

## Performance оптимизации

### 1. Code Splitting

- Динамическая загрузка виджетов
- Уменьшение начального bundle

### 2. Lazy Loading

- `defineAsyncComponent` для виджетов
- Загрузка по требованию

### 3. Computed Properties

- Кэширование вычислений
- Минимизация ре-рендеров

### 4. CSS

- Scoped стили для изоляции
- CSS Grid для эффективной разметки
- CSS animations через GPU

## Безопасность

- TypeScript для предотвращения ошибок типов
- CORS настроен на backend
- Nginx security headers в production
- No sensitive data в frontend

## Тестирование (рекомендации)

### Unit тесты
- Тестировать composables
- Тестировать store actions
- Тестировать utility функции

### Component тесты
- Тестировать виджеты изолированно
- Мокировать API вызовы
- Проверять loading/error состояния

### E2E тесты
- Полный flow от загрузки до отображения
- Взаимодействие между виджетами
- Responsive behavior

## Будущие улучшения

1. **Virtualization** для большого количества виджетов
2. **Drag & Drop** для изменения порядка виджетов
3. **Настройки** для кастомизации виджетов
4. **Темы** - светлая/темная тема
5. **i18n** - мультиязычность
6. **WebSocket** - real-time обновления
7. **Service Worker** - offline support

