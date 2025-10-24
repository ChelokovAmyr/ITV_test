# ⚡ Быстрый старт

## 🎯 За 3 минуты до запуска

### Вариант 1: Docker (рекомендуется) 🐳

**Требования:** Docker и Docker Compose

```bash
# 1. Клонируйте репозиторий
git clone <repository-url>
cd vue-dashboard-widgets

# 2. Запустите
docker-compose up --build
```

✅ **Готово!** Откройте http://localhost:8080

---

### Вариант 2: Локально 💻

**Требования:** Node.js 18+

```bash
# 1. Клонируйте репозиторий
git clone <repository-url>
cd vue-dashboard-widgets

# 2. Установите зависимости
npm install

# 3. Запустите (используйте один из вариантов)
```

**Windows:**
```bash
# Запустить оба сервера одной командой
scripts\start-dev.bat
```

**Linux/Mac:**
```bash
# Сделайте скрипт исполняемым
chmod +x scripts/start-dev.sh

# Запустите
./scripts/start-dev.sh
```

**Вручную (2 терминала):**
```bash
# Терминал 1: API сервер
npm run server

# Терминал 2: Frontend
npm run dev
```

✅ **Готово!** Откройте http://localhost:5173

---

## 🎨 Что вы увидите

После запуска откроется дашборд с тремя виджетами:

1. **👤 User Profile** - Профиль пользователя (John Doe из London)
2. **🌤️ Weather** - Погода (автоматически для города пользователя)
3. **📈 Stock Ticker** - Котировки акций (AAPL, GOOG)

### Магия взаимодействия

Обратите внимание: **Weather виджет автоматически показывает погоду для города пользователя** (London), хотя изначально в настройках указана Moscow! Это демонстрирует работу обмена данными между виджетами через Pinia store.

---

## 🛠️ Разработка

### Структура проекта

```
vue-dashboard-widgets/
├── src/
│   ├── components/
│   │   ├── Dashboard.vue          # Главный компонент
│   │   └── widgets/               # Виджеты
│   │       ├── UserProfile.vue
│   │       ├── Weather.vue
│   │       └── StockTicker.vue
│   ├── composables/
│   │   └── useDataFetcher.ts      # Универсальный fetcher
│   ├── stores/
│   │   └── userStore.ts           # State management
│   └── types/
│       └── index.ts               # TypeScript типы
└── server/
    └── index.js                   # Mock API
```

### Добавить свой виджет

1. Создайте `src/components/widgets/MyWidget.vue`
2. Зарегистрируйте в `Dashboard.vue`
3. Добавьте API endpoint в `server/index.js`

Подробнее: [EXAMPLES.md](EXAMPLES.md)

---

## 📝 API Endpoints

Mock API на http://localhost:3000:

- `GET /api/dashboard` - конфигурация виджетов
- `GET /api/users/:id` - данные пользователя
- `GET /api/weather?city=...` - погода
- `GET /api/stocks?symbols=...` - котировки

---

## 🐛 Проблемы?

### Порт уже занят

**Windows:**
```powershell
# Найти процесс на порту 5173
netstat -ano | findstr :5173

# Завершить процесс (замените PID)
taskkill /PID <PID> /F
```

**Linux/Mac:**
```bash
# Найти и завершить процесс на порту 5173
lsof -ti:5173 | xargs kill -9
```

### Docker проблемы

```bash
# Пересобрать контейнеры
docker-compose down -v
docker-compose up --build

# Просмотреть логи
docker-compose logs -f
```

### Node modules ошибки

```bash
# Очистить и переустановить
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Документация

- [README.md](README.md) - Полная документация
- [ARCHITECTURE.md](ARCHITECTURE.md) - Архитектура проекта
- [EXAMPLES.md](EXAMPLES.md) - Примеры кода
- [DEPLOYMENT.md](DEPLOYMENT.md) - Деплой и CI/CD
- [CONTRIBUTING.md](CONTRIBUTING.md) - Гайд по разработке

---

## ✨ Фичи проекта

✅ Динамическая загрузка виджетов (defineAsyncComponent)
✅ TypeScript с полной типизацией
✅ Универсальный useDataFetcher<T>
✅ Pinia store для обмена данными
✅ Адаптивный дизайн (CSS Grid)
✅ Skeleton loaders
✅ Error handling
✅ Docker ready

---

## 🚀 Production сборка

```bash
# Собрать для production
npm run build

# Предпросмотр
npm run preview
```

Результат в папке `dist/`

---

**Приятной разработки! 🎉**

