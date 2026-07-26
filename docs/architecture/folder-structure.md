# Folder Structure

## Purpose

This document defines the proposed directory structure of the Authentication System.

The goal is to create a project structure that is:

- Easy to understand
- Easy to navigate
- Easy to maintain
- Easy to scale
- Suitable for production applications

This document describes **what each directory is responsible for**, not how it will be implemented.

---

# Design Principles

The folder structure follows these principles:

- Single Responsibility
- Separation of Concerns
- Feature Isolation
- Predictable Navigation
- Scalability
- Maintainability

Every folder should have one clear responsibility.

---

# Proposed Root Structure

```text
auth-system/
│
├── docs/
├── src/
├── tests/
├── scripts/
├── docker/
├── .github/
│
├── package.json
├── tsconfig.json
├── Dockerfile
├── docker-compose.yml
├── .env.example
├── README.md
└── LICENSE
```

> This represents the intended final structure. These directories will be introduced gradually as the project evolves.

---

# Source Directory

The application source code will live inside:

```text
src/
```

The source directory should contain only application code.

It should never contain:

- Documentation
- Docker files
- Build artifacts
- Logs
- Environment files

---

# Proposed Source Structure

```text
src/
│
├── app/
├── config/
├── database/
├── modules/
├── common/
├── middleware/
├── routes/
├── types/
├── utils/
├── lib/
└── index.ts
```

---

# Directory Responsibilities

## app/

Application bootstrap.

Responsible for:

- Application initialization
- Express app creation
- Middleware registration
- Route registration

---

## config/

Application configuration.

Examples:

- Environment variables
- Application configuration
- Constants
- Feature flags

No business logic should exist here.

---

## database/

Database-related code.

Examples:

- Database connection
- Migrations
- Seeds
- Database configuration

---

## modules/

Contains business features.

Each module should own its:

- Controllers
- Services
- Repositories
- Validation
- Routes
- Types

Example:

```text
modules/
    auth/
    users/
    roles/
```

---

## common/

Reusable application components.

Examples:

- Base classes
- Shared interfaces
- Shared utilities
- Common errors

This folder should not become a dumping ground.

---

## middleware/

HTTP middleware.

Examples:

- Authentication
- Authorization
- Validation
- Error handling
- Request logging

---

## routes/

Application routing.

Responsible for organizing API routes.

Business logic should not exist here.

---

## types/

Global TypeScript definitions.

Examples:

- Shared interfaces
- Global declarations
- Type extensions

---

## utils/

Small reusable helper functions.

Examples:

- Date formatting
- String utilities
- Token utilities

Utility functions should remain stateless.

---

## lib/

Wrappers around third-party libraries.

Examples:

- Logger
- Mail client
- Cache client

Keeping integrations isolated makes future replacements easier.

---

# Tests

```text
tests/
```

Will contain:

- Unit tests
- Integration tests
- End-to-end tests
- Test helpers

Production code should not depend on test code.

---

# Scripts

```text
scripts/
```

Contains development and automation scripts.

Examples:

- Database setup
- Data generation
- Utility scripts

---

# Docker

```text
docker/
```

Reserved for Docker-related configuration that grows beyond a single Dockerfile.

Examples:

- Development configuration
- Production configuration
- Docker helper files

---

# GitHub

```text
.github/
```

Reserved for GitHub-specific configuration.

Examples:

- GitHub Actions
- Issue templates
- Pull request templates

---

# Folder Creation Strategy

Directories should only be created when they become necessary.

Avoid creating empty folders simply because they are planned.

For example:

- `tests/` should be created when testing begins.
- `docker/` should be created when Docker configuration becomes more complex.
- `modules/` should be created when business features are implemented.

---

# Future Evolution

As the project grows, additional directories may be introduced.

Examples:

- cache/
- jobs/
- events/
- mail/
- storage/
- monitoring/

These should be added only when they solve a real problem.

---

# Guiding Principle

A folder should exist because it has a clear responsibility—not because another project has it.

The project structure should evolve alongside the application's needs while remaining simple, consistent, and easy to understand.
