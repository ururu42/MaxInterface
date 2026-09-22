# Веб-клиент Green API

Лёгкая веб-панель для работы с [Green API](https://green-api.com) (Max): авторизация по instance и token, ввод номера собеседника и чат с отправкой и получением сообщений.

## Технологический стек

| Технология | Назначение |
| --- | --- |
| [React 19](https://react.dev) | интерфейс |
| [Vite 6](https://vite.dev) + [SWC](https://swc.rs) | сборка, HMR |
| [Tailwind CSS 4](https://tailwindcss.com) | стили |
| [@iconify/react](https://iconify.design/docs/react/react-components.html) | иконки |
| [vite-plugin-svgr](https://github.com/pistock/vite-plugin-svgr) | импорт SVG как React-компонентов |

## Требования

- Node.js **18+** (рекомендуется 20 или 22)
- npm (идёт в комплекте с Node.js)
- Аккаунт [Green API](https://green-api.com) — instance и token для работы с WhatsApp (вводятся в самом приложении, см. ниже)

## Установка и локальный запуск

```bash
# 1. Перейдите в каталог проекта
cd templateReactVite

# 2. Установите зависимости
npm install

# 3. Запустите dev-сервер
npm run dev
```

После старта приложение будет доступно по адресу **http://localhost:5173**.
Если порт 5173 занят, Vite автоматически выберет следующий свободный и покажет его в терминале.

## Сборка и предпросмотр

```bash
# Production-сборка в каталог dist/
npm run build

# Локальный предпросмотр собранного production-варианта
npm run preview
```

## Прочие команды

| Команда | Описание |
| --- | --- |
| `npm run lint` | Проверка кода ESLint |
| `npm run format` | Форматирование кода Prettier (каталог `src/`) |

## Работа с Green API

- Приложение **не требует локального бэкенда и env-файлов**: запросы отправляются из браузера напрямую к API Green API.
- Для входа укажите в форме авторизации **Instance** (имя инстанса) и **Token** — приложение проверит их через `https://api.green-api.com/waInstance{instance}/getStateInstance/{token}`.
- Далее введите **номер телефона** собеседника в международном формате и переписывайтесь в чате: отправка, получение и удаление уведомлений идут через `https://{префикс-инстанса}.api.green-api.com/waInstance{instance}/...`.

> ⚠️ Поскольку браузер обращается к API напрямую, возможны ошибки CORS в некоторых окружениях. Если вход не проходит — откройте консоль браузера и проверьте детали ошибки.

## Структура проекта

```
templateReactVite/
├── index.html                     # HTML-шаблон, точка входа Vite
├── vite.config.js                 # плагины: react-swc, svgr, tailwindcss
├── public/                        # статические файлы (vite.svg)
├── img/                           # изображения
└── src/
    ├── main.jsx                   # монтирование приложения
    ├── App.jsx                    # переключение экранов: Auth → номер → чат
    ├── index.css                  # Tailwind и глобальные стили
    ├── components/
    │   ├── index.jsx
    │   ├── Header/Header.jsx      # шапка
    │   └── Form/Form.jsx          # форма ввода
    └── pages/
        ├── Auth/Auth.jsx                         # вход: instance + token
        ├── NumberPhonePage/NumberPhonePage.jsx   # ввод номера собеседника
        ├── Chat/
        │   ├── Chat.jsx
        │   └── ChatWindow/ChatWindow.jsx         # окно чата (отправка/получение)
        └── Sidebar/
            ├── Sidebar.jsx
            └── SidebarItem/SidebarItem.jsx
```
