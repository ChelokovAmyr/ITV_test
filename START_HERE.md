# 🎯 НАЧНИТЕ ЗДЕСЬ

Добро пожаловать в **Vue Dashboard Widgets** - современное приложение для демонстрации динамической системы виджетов!

---

## 🚀 За 60 секунд до запуска

### Windows пользователи

```batch
cd B:\testovoe
scripts\start-dev.bat
```

Откройте: http://localhost:5173

### Linux/Mac пользователи

```bash
cd /path/to/testovoe
chmod +x scripts/start-dev.sh
./scripts/start-dev.sh
```

Откройте: http://localhost:5173

### Docker пользователи

```bash
docker-compose up --build
```

Откройте: http://localhost:8080

---

## 📋 Что это?

Тестовое задание, демонстрирующее:

✅ **Динамическую загрузку виджетов** через `defineAsyncComponent`
✅ **Универсальный composable** `useDataFetcher<T>` с TypeScript
✅ **Взаимодействие между компонентами** через Pinia Store
✅ **Современный UI** с градиентами и анимациями
✅ **Адаптивный дизайн** для всех устройств
✅ **Docker-ready** развертывание

---

## 🎨 Что вы увидите

### 1️⃣ User Profile (Фиолетовый градиент)
- Показывает: John Doe, ID: 123, City: London
- **Публикует** город в глобальное состояние

### 2️⃣ Weather (Голубой градиент)
- **Подписывается** на город пользователя
- Автоматически меняется с Moscow на London
- **Это демонстрирует обмен данными!**

### 3️⃣ Stock Ticker (Розовый градиент)
- Показывает: AAPL, GOOG
- Индикаторы роста/падения

---

## 🔍 Ключевые файлы для ревью

### 1. useDataFetcher<T> - универсальный composable
```
src/composables/useDataFetcher.ts
```
Типизированная загрузка данных для любого виджета

### 2. Dashboard - динамическая загрузка
```
src/components/Dashboard.vue
```
`defineAsyncComponent` для ленивой загрузки виджетов

### 3. Weather - взаимодействие между компонентами
```
src/components/widgets/Weather.vue
```
Реагирует на изменения города из UserProfile через Pinia

### 4. userStore - обмен данными
```
src/stores/userStore.ts
```
Pinia store для публикации/подписки на данные

### 5. Mock API - реалистичный бэкенд
```
server/index.js
```
Express сервер с задержками для имитации сети

---

## 📚 Документация

| Файл | Описание |
|------|----------|
| [README.md](README.md) | 📖 Полная документация |
| [QUICK_START.md](QUICK_START.md) | ⚡ Быстрый старт |
| [ARCHITECTURE.md](ARCHITECTURE.md) | 🏗️ Техническая архитектура |
| [EXAMPLES.md](EXAMPLES.md) | 💡 Примеры кода |
| [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) | 📁 Структура проекта |
| [DEPLOYMENT.md](DEPLOYMENT.md) | 🚀 Инструкции по деплою |
| [CONTRIBUTING.md](CONTRIBUTING.md) | 🤝 Гайд по разработке |
| [GIT_SETUP.md](GIT_SETUP.md) | 📦 Настройка Git |

---

## 🛠️ Технологии

- **Vue 3** с Composition API
- **TypeScript** для типобезопасности
- **Vite** для быстрой разработки
- **Pinia** для state management
- **Express** для Mock API
- **Docker** для контейнеризации
- **CSS Grid** для адаптивной верстки

---

## 📊 API Endpoints

Mock API на http://localhost:3000

| Endpoint | Описание |
|----------|----------|
| `GET /api/dashboard` | Конфигурация виджетов |
| `GET /api/users/:id` | Данные пользователя |
| `GET /api/weather?city=...` | Погода для города |
| `GET /api/stocks?symbols=...` | Котировки акций |

---

## ✨ Ключевые фичи

### 1. Динамические виджеты
```typescript
// Dashboard.vue
const widgetComponents = {
  UserProfile: defineAsyncComponent(() => import('./widgets/UserProfile.vue')),
  Weather: defineAsyncComponent(() => import('./widgets/Weather.vue')),
  StockTicker: defineAsyncComponent(() => import('./widgets/StockTicker.vue'))
};
```

### 2. Типизированный fetcher
```typescript
// useDataFetcher.ts
export function useDataFetcher<T>(url: string): {
  data: Ref<T | null>;
  loading: Ref<boolean>;
  error: Ref<Error | null>;
}
```

### 3. Взаимодействие виджетов
```typescript
// UserProfile публикует
userStore.setUserData(data);

// Weather подписывается
const targetCity = computed(() => userStore.userCity || defaultCity);
```

---

## 🎯 Выполнение требований

| Требование | Статус | Реализация |
|-----------|--------|------------|
| Динамическая отрисовка | ✅ | `defineAsyncComponent` |
| useDataFetcher<T> | ✅ | Composable с типизацией |
| Взаимодействие виджетов | ✅ | Pinia Store |
| CSS Grid + адаптив | ✅ | Responsive дизайн |
| Skeleton loaders | ✅ | Для всех виджетов |
| Докеризация | ✅ | Docker + compose |

---

## 🐛 Проблемы?

### Порт занят
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5173 | xargs kill -9
```

### npm ошибки
```bash
rm -rf node_modules package-lock.json
npm install
```

### Docker проблемы
```bash
docker-compose down -v
docker-compose up --build
```

---

## 📞 Контакты

Если возникли вопросы по проекту, создайте Issue в репозитории!

---

## 🎓 Что дальше?

1. ✅ Запустите проект (см. выше)
2. 📖 Прочитайте [ARCHITECTURE.md](ARCHITECTURE.md)
3. 💡 Изучите [EXAMPLES.md](EXAMPLES.md)
4. 🔧 Попробуйте добавить свой виджет
5. 🐳 Разверните в Docker

---

**Проект готов к использованию! 🚀**

**Время выполнения:** ~2 часа
**Строк кода:** ~1000
**Документация:** Полная
**Docker:** Готов
**TypeScript:** 100%

---

> 💡 **Подсказка:** Обратите внимание, как Weather виджет автоматически меняет город с Moscow на London после загрузки UserProfile - это демонстрирует работу обмена данными через Pinia!

