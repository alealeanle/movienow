# \#MOVIENOW Documentation

## Features

- **Two Pages:**
  - Movie List: Displays a list of movies with basic information in cards.
  - Movie Details: Displays detailed information about a selected movie.
- **Movie Card:**
  - Displays poster, title, release year, duration, genre, directors, actors, and description.
  - The movie title is a link leading to the detailed view.
  - Hover effect: the card lifts by 8px and gains a shadow (applies only on the list page).
- **Navigation:**
  - "Back to List" link on the movie details page.
  - List is cleared upon returning to the list page.
- **API:**
  - Fetch list: `GET https://mashroom-movies-api.netlify.app/api/movies`
  - Fetch single movie: `GET https://mashroom-movies-api.netlify.app/api/movie/{id}`
- **Error Handling:**
  - Displays a message if no data is returned: _"Unfortunately, nothing was found for your request..."_
- **Performance:**
  - PWA with Service Worker caching data for 24 hours.
  - Pinia store caching.
  - Custom hook for sorting functionality.
  - Unit tests using Vitest.

## Installation

1. Clone the repository:

```
git clone git@github.com:alealeanle/movienow.git
cd movienow
```

2. Install dependencies:

```
yarn install
```

3. Start the development server:

```
yarn dev
```

4. Build the production version:

```
yarn build
```

5. Run tests:

```
yarn test
```

## Usage

- Open the app in your browser.
- Navigate between the movie list and movie details pages.
- Use the back link to return to the list.
- Enjoy offline access due to PWA capabilities.

---

# Документация \#MOVIENOW

## Возможности

- **Две страницы:**
  - Список фильмов: отображает карточки с информацией о фильмах.
  - Детальная информация о фильме: подробная информация о выбранном фильме.
- **Карточка фильма:**
  - Показывает постер, название, год выпуска, длительность, жанр, режиссёров, актёров и описание.
  - Название фильма — это ссылка на страницу с деталями.
  - Эффект наведения: карточка поднимается на 8px и добавляется тень (только на странице списка).
- **Навигация:**
  - Ссылка "Назад к списку" на странице фильма.
  - При возврате на список, данные очищаются.
- **API:**
  - Получение списка: `GET https://mashroom-movies-api.netlify.app/api/movies`
  - Получение фильма: `GET https://mashroom-movies-api.netlify.app/api/movie/{id}`
- **Обработка ошибок:**
  - Если данные не пришли: _"К сожалению, по вашему запросу ничего не найдено..."_
- **Производительность:**
  - PWA с Service Worker, кеширующим данные на 24 часа.
  - Кеширование в Pinia Store.
  - Кастомный хук для сортировки.
  - Тесты с использованием Vitest.

## Установка

1. Клонируйте репозиторий:

```
git clone git@github.com:alealeanle/movienow.git
cd movienow
```

2. Установите зависимости:

```
yarn install
```

3. Запустите dev-сервер:

```
yarn dev
```

4. Соберите проект для production:

```
yarn build
```

5. Запустите тесты:

```
yarn test
```

## Использование

- Откройте приложение в браузере.
- Переключайтесь между списком фильмов и страницей деталей.
- Используйте ссылку "Назад к списку" для возврата.
- Наслаждайтесь оффлайн-доступом благодаря PWA.

# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).
