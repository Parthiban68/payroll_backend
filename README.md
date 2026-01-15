Modular Express Backend with TypeScript & Zod

A scalable, modular backend architecture built with Express.js and TypeScript, following Clean Architecture principles.
This project demonstrates DTO-based validation using Zod, manual dependency injection, reusable middleware, and a clean separation of concerns suitable for production-grade Node.js applications.

🚀 Key Features

✅ Express.js + TypeScript (modern ES modules)

✅ Clean Architecture

Controllers (HTTP layer)

Services (business logic)

Repositories (data access)

Domain DTOs

✅ Zod-based DTO validation

Runtime validation + compile-time types

Schema extension instead of class inheritance

✅ Reusable validation middleware

✅ Centralized common module (barrel files)

✅ Path aliases (@common, @/*)

✅ Environment configuration with dotenv

✅ ESBuild/TSX-powered dev setup

✅ Test-friendly & framework-agnostic design

📂 Project Structure
src/
├─ common/              # Shared utilities & middleware
│  ├─ middleware/
│  │  └─ validate.req.ts
│  └─ index.ts
├─ modules/
│  └─ login/
│     ├─ domain/        # Zod DTOs & schemas
│     ├─ application/   # Services (business logic)
│     ├─ infra/         # Controllers & routes
│     └─ user.route.ts
├─ server.ts
└─ tsconfig.json

🧠 Why This Architecture?

Prevents tight coupling

Easy to scale and refactor

Clear ownership of responsibilities

Safe input handling (no any, no unchecked payloads)

Ideal for monoliths or microservices

🛠 Tech Stack

Node.js

Express.js

TypeScript

Zod

TSX (esbuild)

dotenv

🎯 Use Cases

Enterprise backend services

SaaS APIs

Microservices foundations

Learning clean architecture with Express

📄 License

MIT License