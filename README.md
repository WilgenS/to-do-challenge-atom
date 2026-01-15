# 🚀 Task Management System (Challenge Full Stack)

Aplicación full‑stack de gestión de tareas con tablero Kanban, roles
(supervisor) y API segura, construida con **Angular 17+** y **Firebase Cloud
Functions (Express)** dentro de un monorepo.

## 🔗 Demo en vivo

- **Web**: [Abrir aplicación](https://to-do-challenge-atom.web.app)

## 🧭 Estructura del monorepo

- **`frontend/`**: Angular (standalone components)
- **`functions/`**: API (Clean Architecture + Express + Firestore)
- **`firebase.json`**: configuración de Hosting + Functions (deploy unificado)

## 🏗 Arquitectura (Backend)

El backend está organizado siguiendo Clean Architecture / DDD:

- **Domain**: modelos (`Task`, `User`) + contratos (interfaces), sin
  dependencias externas.
- **Application**: casos de uso (`CreateTaskUseCase`, `CheckUserUseCase`, etc.),
  lógica de negocio pura.
- **Infrastructure**: repositorios Firestore, rutas, controllers Express y
  middleware.

### Seguridad / middleware

- **CORS**: allowlist de orígenes (ver
  `functions/src/infrastructure/http/cors.config.ts`).
- **Helmet**: headers de seguridad.
- **Rate limit**: 200 req/min, ignorando preflight `OPTIONS`.
- **Body parsing**: JSON hasta 10MB.

## 🛠 Stack

### Frontend

- Angular 17.x
- Angular Material + Bootstrap 5
- Karma/Jasmine (tests)

### Backend

- Node.js 20
- Firebase Cloud Functions + Express
- Firestore
- Jest + ts-jest (tests unitarios)

## 🚀 Quickstart (local)

### Prerrequisitos

- Node.js **18+** (recomendado **20**)
- Java JDK **21+** (emuladores Firebase)
- Firebase CLI: `npm i -g firebase-tools`

### Instalar dependencias

```bash
npm install
cd functions && npm install
cd ../frontend && npm install
```

### Levantar emuladores + backend

```bash
cd functions
npm run serve
```

### Levantar frontend

```bash
cd frontend
ng serve
```

## 🌐 API (rutas)

La function se expone como `api`, por lo que el **base URL** es:

- **Producción**: `https://us-central1-<PROJECT_ID>.cloudfunctions.net/api`

Rutas montadas por Express (ver `functions/src/index.ts`):

- **Health**: `GET /health`
- **Users (público)**: `GET /v1/users/public/...`
- **Users (protegido)**: `... /v1/users/...` (requiere token)
- **Tasks (protegido)**: `... /v1/tasks/...` (requiere token)

Ejemplo (email debe ir URL‑encoded):

```bash
curl -i "https://us-central1-to-do-challenge-atom.cloudfunctions.net/api/v1/users/public/check/Wilgensanchez98%40gmail.com"
```

## 🔥 Deploy (Firebase)

```bash
firebase deploy
# o por separado
firebase deploy --only hosting
firebase deploy --only functions
```

### Troubleshooting: 403 “Forbidden” (Google Frontend)

Si recibes un HTML 403 tipo “Your client does not have permission…”, **no es
CORS**: es **IAM / invoker** (la request no llega a Express).

- Solución: hacer la function invokable públicamente (Cloud Functions Invoker
  para `allUsers`) o llamar con identidad autenticada.

## 🧪 Testing

```bash
cd functions
npm test
```

## ⚠️ Limitaciones

- El sistema prioriza el flujo principal del challenge; permisos finos (RBAC
  completo) no están incluidos.
