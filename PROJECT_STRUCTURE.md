# 📁 Структура проекта

## Дерево файлов

```
vue-dashboard-widgets/
│
├── 📄 Configuration Files
│   ├── .dockerignore              # Docker ignore файл
│   ├── .editorconfig              # Настройки редактора
│   ├── .gitignore                 # Git ignore файл
│   ├── .prettierrc                # Prettier конфигурация
│   ├── docker-compose.yml         # Docker compose конфигурация
│   ├── Dockerfile                 # Frontend Dockerfile
│   ├── Dockerfile.api             # Backend API Dockerfile
│   ├── index.html                 # HTML точка входа
│   ├── nginx.conf                 # Nginx конфигурация для production
│   ├── package.json               # NPM зависимости
│   ├── package-lock.json          # NPM lock файл
│   ├── tsconfig.json              # TypeScript конфигурация
│   ├── tsconfig.node.json         # TypeScript Node конфигурация
│   └── vite.config.ts             # Vite конфигурация
│
├── 📚 Documentation
│   ├── README.md                  # Главная документация
│   ├── QUICK_START.md             # Быстрый старт
│   ├── ARCHITECTURE.md            # Архитектура проекта
│   ├── EXAMPLES.md                # Примеры кода
│   ├── DEPLOYMENT.md              # Инструкции по деплою
│   ├── CONTRIBUTING.md            # Гайд по разработке
│   ├── GIT_SETUP.md               # Настройка Git
│   ├── CHANGELOG.md               # История изменений
│   ├── PROJECT_STRUCTURE.md       # Этот файл
│   └── LICENSE                    # MIT лицензия
│
├── 🔧 Scripts
│   ├── start-dev.bat              # Windows скрипт запуска
│   ├── start-dev.sh               # Linux/Mac скрипт запуска
│   ├── docker-start.bat           # Windows Docker скрипт
│   └── docker-start.sh            # Linux/Mac Docker скрипт
│
├── 🖼️ Public
│   └── vite.svg                   # Vite иконка
│
├── 🎨 Source Code (src/)
│   │
│   ├── 🧩 Components
│   │   ├── App.vue                # Корневой компонент
│   │   ├── Dashboard.vue          # Главный компонент дашборда
│   │   └── widgets/
│   │       ├── UserProfile.vue    # Виджет профиля пользователя
│   │       ├── Weather.vue        # Виджет погоды
│   │       └── StockTicker.vue    # Виджет котировок
│   │
│   ├── 🎣 Composables
│   │   └── useDataFetcher.ts      # Универсальный composable
│   │
│   ├── 🗄️ Stores
│   │   └── userStore.ts           # Pinia store для пользователя
│   │
│   ├── 📝 Types
│   │   └── index.ts               # TypeScript типы
│   │
│   ├── 🎨 Styles
│   │   └── style.css              # Глобальные стили
│   │
│   ├── main.ts                    # Точка входа приложения
│   └── vite-env.d.ts              # Vite типы
│
├── 🔌 Backend (server/)
│   └── index.js                   # Mock API сервер
│
└── ⚙️ IDE Settings (.vscode/)
    └── extensions.json            # Рекомендуемые расширения

```

## Описание директорий

### `/src` - Исходный код

#### `/src/components`
Все Vue компоненты приложения
- **App.vue** - Корневой компонент
- **Dashboard.vue** - Управляет загрузкой и отображением виджетов
- **widgets/** - Папка с виджетами

#### `/src/composables`
Переиспользуемая композиционная логика
- **useDataFetcher.ts** - Универсальная функция для загрузки данных с типизацией

#### `/src/stores`
Pinia stores для управления состоянием
- **userStore.ts** - Хранилище данных пользователя и обмен между виджетами

#### `/src/types`
TypeScript определения типов
- **index.ts** - Все интерфейсы и типы проекта

### `/server` - Backend API

Mock API сервер на Express с имитацией задержек сети

### `/scripts` - Утилиты

Скрипты для упрощения разработки

### `/public` - Статические файлы

Файлы, копируемые в dist при сборке

## Размер файлов (примерно)

| Категория | Размер |
|-----------|--------|
| Source Code | ~15 KB |
| Documentation | ~50 KB |
| Config Files | ~5 KB |
| **Total (без node_modules)** | **~70 KB** |

## Ключевые файлы

### Для разработки
- `src/main.ts` - Точка входа
- `src/components/Dashboard.vue` - Главный компонент
- `src/composables/useDataFetcher.ts` - Логика загрузки данных
- `server/index.js` - Mock API

### Для конфигурации
- `vite.config.ts` - Настройки сборки
- `tsconfig.json` - TypeScript настройки
- `package.json` - Зависимости
- `docker-compose.yml` - Docker orchestration

### Для документации
- `README.md` - Основная документация
- `QUICK_START.md` - Быстрый старт
- `ARCHITECTURE.md` - Архитектура

## Зависимости

### Production
```json
{
  "vue": "^3.4.21",
  "pinia": "^2.1.7"
}
```

### Development
```json
{
  "@vitejs/plugin-vue": "^5.0.4",
  "@types/node": "^20.11.24",
  "typescript": "^5.3.3",
  "vite": "^5.1.5",
  "vue-tsc": "^1.8.27",
  "express": "^4.18.3",
  "cors": "^2.8.5"
}
```

## Точки расширения

### Добавить новый виджет
1. Создать `src/components/widgets/YourWidget.vue`
2. Добавить типы в `src/types/index.ts`
3. Зарегистрировать в `Dashboard.vue`
4. Добавить endpoint в `server/index.js`

### Добавить новый store
1. Создать `src/stores/yourStore.ts`
2. Использовать `defineStore` от Pinia
3. Импортировать в компонентах

### Добавить новый composable
1. Создать `src/composables/useYourLogic.ts`
2. Экспортировать функцию
3. Импортировать в компонентах

## Build артефакты

После `npm run build`:

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [динамические чанки]
└── vite.svg
```

## Gitignored файлы

- `node_modules/` - NPM зависимости (~300 MB)
- `dist/` - Production сборка
- `.env*` - Переменные окружения
- `*.log` - Логи
- `.DS_Store` - macOS файлы

## Общая статистика

| Метрика | Значение |
|---------|----------|
| Total Files | ~35 |
| Vue Components | 4 |
| TypeScript Files | 4 |
| Config Files | 10 |
| Documentation Files | 10 |
| Scripts | 4 |
| Lines of Code | ~1000 |

---

**Проект полностью готов к разработке и деплою! 🚀**

