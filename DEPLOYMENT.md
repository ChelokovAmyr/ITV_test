# 🚀 Инструкция по развертыванию

## Локальная разработка

### Шаг 1: Установка зависимостей

```bash
npm install
```

### Шаг 2: Запуск Mock API сервера

Откройте первый терминал и запустите:

```bash
npm run server
```

Сервер запустится на `http://localhost:3000`

### Шаг 3: Запуск приложения

Откройте второй терминал и запустите:

```bash
npm run dev
```

Приложение откроется на `http://localhost:5173`

## Docker развертывание

### Вариант 1: Docker Compose (рекомендуется)

Это самый простой способ запустить все сервисы сразу:

```bash
# Сборка и запуск
docker-compose up --build

# Или в фоновом режиме
docker-compose up -d --build

# Просмотр логов
docker-compose logs -f

# Остановка
docker-compose down

# Остановка с удалением volumes
docker-compose down -v
```

После запуска:
- Frontend: `http://localhost:8080`
- Backend API: `http://localhost:3000`

### Вариант 2: Отдельные контейнеры

#### Frontend

```bash
# Сборка образа
docker build -t vue-dashboard-frontend .

# Запуск контейнера
docker run -p 8080:80 vue-dashboard-frontend
```

#### Backend API

```bash
# Сборка образа
docker build -f Dockerfile.api -t vue-dashboard-api .

# Запуск контейнера
docker run -p 3000:3000 vue-dashboard-api
```

## Production сборка

### Сборка приложения

```bash
npm run build
```

Результат сборки будет в папке `dist/`

### Предпросмотр production сборки

```bash
npm run preview
```

## Проблемы и решения

### Проблема: API недоступен

**Решение:** Убедитесь, что Mock API сервер запущен на порту 3000

```bash
# Проверьте, занят ли порт
# Windows
netstat -ano | findstr :3000

# Linux/Mac
lsof -i :3000
```

### Проблема: Docker контейнеры не запускаются

**Решение:** Убедитесь, что Docker daemon запущен

```bash
docker ps
docker-compose ps
```

### Проблема: Порт уже занят

**Решение:** Измените порты в `docker-compose.yml` или остановите процессы на портах 3000 и 8080

## Переменные окружения

Для production можно создать файл `.env`:

```env
VITE_API_URL=http://localhost:3000
```

И использовать в коде:

```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
```

## Nginx конфигурация для production

Файл `nginx.conf` уже настроен для production с:
- Gzip сжатием
- Кэшированием статических файлов
- SPA routing (fallback на index.html)

## CI/CD

Для настройки CI/CD можно использовать:

### GitHub Actions

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: docker-compose up -d --build
```

## Мониторинг

Для мониторинга в production можно добавить:
- Sentry для отслеживания ошибок
- Google Analytics для аналитики
- Prometheus + Grafana для метрик

## Обновление приложения

```bash
# Остановить контейнеры
docker-compose down

# Получить новый код
git pull

# Пересобрать и запустить
docker-compose up --build -d
```

