# Weather App (Angular 21)

A simple weather app built with Angular 21, featuring **Signals** for state management and a **Node.js proxy** for API handling.

## 🛠 Stack
- **Angular 22** (Standalone, Signals, OnPush)
- **Node.js / Express** (Proxy server)
- **OpenWeatherMap API**

## 🏗 Architecture
- **Core**: Global `ErrorInterceptor`.
- **Shared**: Reusable UI components, pipes, and HTTP services (bridge to API).
- **Features**: `Homepage` feature with `weather` and `localities` services (business logic, no direct `HttpClient`).
- **Cache**: Generic `CacheService` (using `sessionStorage` with `unknown` types, cast at business layer).

## 🚀 Run
1.  Add `.env` in `server/` with `API_KEY`.
2.  `npm install`
3.  `npm start` (Builds Angular + Starts Proxy)

## 📝 Notes
- Uses `OnPush` strategy for performance.
- Proxy handles rate limiting (900/day) and caching.
- No lazy loading (single page app).
- Errors logged to console (no UI toast yet).
