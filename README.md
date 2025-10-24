# 📊 Vue Dashboard Widgets

Современная панель управления с динамически загружаемыми виджетами, построенная на Vue 3, TypeScript и Vite.

## ✨ Особенности

- **🎯 Динамическая загрузка виджетов** - Виджеты загружаются асинхронно на основе конфигурации с бэкенда
- **🔄 Реактивный обмен данными** - Виджеты могут обмениваться данными между собой через Pinia store
- **📱 Адаптивный дизайн** - Полностью адаптивная верстка для всех устройств
- **⚡ TypeScript** - Полная типизация для надежности кода
- **🎨 Современный UI** - Красивые градиенты, анимации и состояния загрузки
- **🐳 Docker Ready** - Полная поддержка контейнеризации

## 🏗️ Архитектура

### Компоненты

- **Dashboard.vue** - Главный компонент, управляющий отображением виджетов
- **UserProfile.vue** - Виджет профиля пользователя
- **Weather.vue** - Виджет погоды (получает город от UserProfile)
- **StockTicker.vue** - Виджет котировок акций

### Composables

- **useDataFetcher<T>** - Универсальный composable для получения данных с типизацией

### Store

- **userStore** - Pinia store для обмена данными между виджетами (город пользователя)

## 🚀 Быстрый старт

### Локальная разработка

#### Требования

- Node.js 18+
- npm или yarn

#### Установка

```bash
# Клонируйте репозиторий
git clone <repository-url>
cd vue-dashboard-widgets

# Установите зависимости
npm install
```

#### Запуск

```bash
# Терминал 1: Запустите Mock API сервер
npm run server

# Терминал 2: Запустите dev сервер
npm run dev
```

Приложение будет доступно по адресу: `http://localhost:5173`

Mock API сервер: `http://localhost:3000`

### 🐳 Запуск с Docker

#### Docker Compose (рекомендуется)

```bash
# Соберите и запустите все сервисы
docker-compose up --build

# Или в фоновом режиме
docker-compose up -d --build
```

Приложение будет доступно по адресу: `http://localhost:8080`

Mock API: `http://localhost:3000`

#### Остановка

```bash
docker-compose down
```

#### Только Frontend

```bash
docker build -t vue-dashboard .
docker run -p 8080:80 vue-dashboard
```

#### Только Backend API

```bash
docker build -f Dockerfile.api -t vue-dashboard-api .
docker run -p 3000:3000 vue-dashboard-api
```

## 📡 API Endpoints

Mock API предоставляет следующие эндпоинты:

### GET `/api/users/:id`

Получить данные пользователя

**Пример:** `/api/users/123`

**Ответ:**
```json
{
  "id": 123,
  "name": "John Doe",
  "city": "London"
}
```

### GET `/api/weather?city={city}`

Получить погоду для города

**Примеры:**
- `/api/weather?city=Moscow`
- `/api/weather?city=London`

**Ответ:**
```json
{
  "city": "London",
  "temperature": 18,
  "description": "Sunny"
}
```

### GET `/api/stocks?symbols={symbols}`

Получить котировки акций

**Пример:** `/api/stocks?symbols=AAPL,GOOG`

**Ответ:**
```json
[
  { "symbol": "AAPL", "price": 150.25, "change": 1.5 },
  { "symbol": "GOOG", "price": 2750.75, "change": -10.2 }
]
```

### GET `/api/dashboard`

Получить конфигурацию виджетов

**Ответ:**
```json
[
  { "id": 1, "component": "UserProfile", "settings": { "userId": 123 } },
  { "id": 2, "component": "Weather", "settings": { "defaultCity": "Moscow" } },
  { "id": 3, "component": "StockTicker", "settings": { "symbols": ["AAPL", "GOOG"] } }
]
```

## 🔄 Взаимодействие между компонентами

### Механизм обмена данными

Проект использует **Pinia** для обмена данными между виджетами:

1. **UserProfile** загружает данные пользователя и сохраняет город в `userStore`
2. **Weather** подписывается на изменения города в `userStore`
3. При обновлении города Weather автоматически загружает новые данные

```typescript
// В UserProfile.vue
watch(data, (newData) => {
  if (newData) {
    userStore.setUserData(newData);
  }
});

// В Weather.vue
const targetCity = computed(() => {
  return userStore.userCity || props.settings.defaultCity;
});

watch(targetCity, () => {
  fetchData();
});
```

## 🛠️ Технологии

- **Vue 3** - Композиционный API
- **TypeScript** - Статическая типизация
- **Vite** - Быстрая сборка и dev сервер
- **Pinia** - Управление состоянием
- **CSS Grid** - Адаптивная сетка
- **Express** - Mock API сервер
- **Docker** - Контейнеризация
- **Nginx** - Production сервер

## 📁 Структура проекта

```
vue-dashboard-widgets/
├── src/
│   ├── components/
│   │   ├── Dashboard.vue          # Главный компонент
│   │   └── widgets/
│   │       ├── UserProfile.vue    # Виджет профиля
│   │       ├── Weather.vue        # Виджет погоды
│   │       └── StockTicker.vue    # Виджет акций
│   ├── composables/
│   │   └── useDataFetcher.ts      # Composable для fetch
│   ├── stores/
│   │   └── userStore.ts           # Pinia store
│   ├── types/
│   │   └── index.ts               # TypeScript типы
│   ├── App.vue
│   ├── main.ts
│   └── style.css
├── server/
│   └── index.js                   # Mock API сервер
├── Dockerfile                     # Frontend Dockerfile
├── Dockerfile.api                 # Backend Dockerfile
├── docker-compose.yml             # Docker Compose конфиг
├── nginx.conf                     # Nginx конфигурация
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## 🎨 Стилизация

- **Градиентные фоны** для каждого виджета
- **Анимации** при загрузке и hover эффекты
- **Skeleton loaders** для состояния загрузки
- **Responsive design** с CSS Grid
- **Стеклянный эффект** (backdrop-filter) для заголовков

## 📱 Адаптивность

- **Desktop** (> 768px): Сетка 2-3 колонки
- **Tablet** (768px): Сетка 1-2 колонки
- **Mobile** (< 768px): Одна колонка

## 🔧 Скрипты

```bash
# Разработка
npm run dev          # Запустить Vite dev сервер
npm run server       # Запустить Mock API

# Production
npm run build        # Собрать для production
npm run preview      # Предпросмотр production сборки

# Docker
docker-compose up    # Запустить все сервисы
docker-compose down  # Остановить все сервисы
```

## 🎯 Выполненные требования

✅ **Динамическая отрисовка виджетов** - `defineAsyncComponent` для ленивой загрузки
✅ **Универсальная логика получения данных** - `useDataFetcher<T>` с типизацией
✅ **Взаимодействие между компонентами** - Pinia store для обмена данными
✅ **Стилизация и вёрстка** - CSS Grid, skeleton loaders, адаптивный дизайн
✅ **Докеризация** - Docker и docker-compose готовы к использованию

## 📝 Лицензия

MIT

## 👨‍💻 Автор

Создано для тестового задания

---

**Примечание:** Mock API имитирует задержки сети для демонстрации состояний загрузки виджетов.

