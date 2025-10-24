# 📦 Инициализация Git репозитория

## Шаг 1: Инициализация

```bash
# Перейдите в корневую папку проекта
cd vue-dashboard-widgets

# Инициализируйте git репозиторий
git init

# Добавьте все файлы
git add .

# Создайте первый коммит
git commit -m "feat: initial commit - Vue dashboard with dynamic widgets"
```

## Шаг 2: Подключение к удаленному репозиторию

### GitHub

```bash
# Создайте новый репозиторий на GitHub (без README, .gitignore, license)
# Затем выполните:

git remote add origin https://github.com/your-username/vue-dashboard-widgets.git
git branch -M main
git push -u origin main
```

### GitLab

```bash
git remote add origin https://gitlab.com/your-username/vue-dashboard-widgets.git
git branch -M main
git push -u origin main
```

### BitBucket

```bash
git remote add origin https://bitbucket.org/your-username/vue-dashboard-widgets.git
git branch -M main
git push -u origin main
```

## Шаг 3: Проверка

```bash
# Проверьте статус
git status

# Проверьте удаленный репозиторий
git remote -v
```

## Структура коммитов

Используйте conventional commits:

```bash
git commit -m "feat: добавить новый виджет"
git commit -m "fix: исправить ошибку загрузки"
git commit -m "docs: обновить документацию"
git commit -m "style: улучшить стили"
git commit -m "refactor: оптимизировать код"
git commit -m "test: добавить тесты"
```

## .gitignore

Проект уже содержит `.gitignore` файл, который исключает:
- `node_modules/`
- `dist/`
- `.env` файлы
- IDE настройки (кроме `.vscode/extensions.json`)
- Логи

## Рекомендации

### Branch Strategy

```bash
# Создайте ветки для разработки
git checkout -b develop
git checkout -b feature/new-widget
git checkout -b fix/bug-name
```

### .gitattributes (опционально)

Создайте `.gitattributes` для нормализации line endings:

```
* text=auto
*.js text eol=lf
*.vue text eol=lf
*.ts text eol=lf
*.json text eol=lf
*.md text eol=lf
*.sh text eol=lf
*.bat text eol=crlf
```

## GitHub Actions (CI/CD)

Создайте `.github/workflows/deploy.yml` для автоматического деплоя:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## README Badge

Добавьте бейджи в README.md:

```markdown
![Vue](https://img.shields.io/badge/Vue-3.4-4FC08D?logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)
```

## Готово! 🎉

Теперь ваш проект готов к публикации и совместной разработке!

