# typical production order:
Repository created
        ↓
Architecture discussion
        ↓
Folder structure
        ↓
Coding standards
        ↓
TypeScript configuration
        ↓
ESLint
        ↓
Prettier
        ↓
Git hooks
        ↓
Commit conventions
        ↓
Environment strategy
        ↓
Logging
        ↓
Docker
        ↓
Docker Compose
        ↓
Database
        ↓
CI
        ↓
Testing
        ↓
Monitoring
        ↓
Then...
First endpoint

# inital setup:week-1
Repository

Git

README

License

Issue templates

Folder structure

Architecture

Node version

Package manager

EditorConfig

Prettier

ESLint

TypeScript

Path aliases

tsconfig

npm scripts

dotenv

Configuration

Logger

Error handling

Validation

Docker

Docker Compose

PostgreSQL

Redis

Hot reload

Build

Production build

Development environment

# week-2
Project conventions

Base controllers

Response formatter

Custom errors

Utilities

Dependency injection (optional)

Request validation

Environment loader

Configuration system

Database layer

Migration tool

Seed system

Health endpoint

# important files:
auth-system/

.github/

.vscode/

.husky/

docker/

scripts/

docs/

infra/

src/

tests/

package.json

package-lock.json

tsconfig.json

tsconfig.build.json

eslint.config.js

prettier.config.js

.editorconfig

.gitignore

.gitattributes

Dockerfile

docker-compose.yml

docker-compose.dev.yml

docker-compose.prod.yml

.env.example

.env.development

.env.production

README.md

LICENSE

# inside src:
config/

core/

common/

modules/

middlewares/

database/

types/

utils/

lib/

services/

repositories/

controllers/

routes/

validators/

emails/

workers/

events/

jobs/

# inside modules/auth:
auth/
├── auth.routes.ts
├── auth.controller.ts
├── auth.service.ts
├── auth.repository.ts
├── auth.schema.ts
├── auth.middleware.ts
├── auth.types.ts
├── auth.utils.ts
└── index.ts

