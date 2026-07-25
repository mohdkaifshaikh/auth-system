# ADR-001: Project Technology Stack

* **Status:** Accepted
* **Date:** 2026-07-25
* **Decision Makers:** Project Maintainer
* **Type:** Architecture Decision Record (ADR)

---

# Context

This project aims to build a production-style authentication system while learning the engineering practices used in professional backend development.

The technology stack should satisfy the following objectives:

* Build secure authentication services
* Learn modern backend development
* Follow production engineering practices
* Support future scalability
* Have strong community support
* Be widely adopted in the industry
* Be suitable for long-term maintenance

The selected technologies should not only solve current requirements but also provide a solid foundation for future enhancements.

---

# Decision

The project will initially use the following technology stack.

| Category              | Technology                                  |
| --------------------- | ------------------------------------------- |
| Runtime               | Node.js (LTS)                               |
| Language              | TypeScript                                  |
| Web Framework         | Express.js                                  |
| Database              | PostgreSQL                                  |
| Version Control       | Git                                         |
| Repository Hosting    | GitHub                                      |
| Containerization      | Docker                                      |
| Local Development     | Docker Compose                              |
| Package Manager       | npm                                         |
| Authentication        | JWT                                         |
| Password Hashing      | bcrypt                                      |
| Environment Variables | dotenv (or equivalent configuration system) |

Additional technologies such as Redis, testing frameworks, CI/CD, monitoring, and background job processing will be introduced when the project requires them.

---

# Rationale

## Why Node.js?

Node.js provides:

* Large ecosystem
* Excellent TypeScript support
* Non-blocking I/O
* Strong backend community
* Widely used in production
* Excellent authentication libraries

It is an excellent platform for learning production backend development.

---

## Why TypeScript?

TypeScript improves code quality by providing:

* Static type checking
* Better IDE support
* Easier refactoring
* Reduced runtime errors
* Better maintainability
* Improved developer experience

Since production applications continue to grow over time, TypeScript helps reduce bugs and improves long-term maintainability.

---

## Why Express.js?

Express was selected because it is:

* Stable
* Lightweight
* Minimal
* Highly flexible
* Well documented
* Supported by a large ecosystem

Learning Express also provides a strong understanding of HTTP fundamentals before exploring more opinionated frameworks.

---

## Why PostgreSQL?

PostgreSQL was selected because it offers:

* ACID compliance
* Strong transactional support
* Excellent indexing
* Foreign key constraints
* Mature query optimizer
* Rich SQL features
* Production reliability

Authentication systems rely heavily on relational data and transactional consistency, making PostgreSQL an appropriate choice.

---

## Why Git?

Git provides:

* Version control
* Branch management
* Collaboration
* Change tracking
* Rollback capability
* Industry-standard workflows

Every production software project depends on version control.

---

## Why GitHub?

GitHub provides:

* Repository hosting
* Pull Requests
* Code Reviews
* Issue Tracking
* GitHub Actions
* Open Source collaboration

It is widely adopted across the software industry.

---

## Why Docker?

Docker provides:

* Consistent development environments
* Reproducible builds
* Simplified onboarding
* Deployment portability
* Dependency isolation

Instead of saying "it works on my machine," every developer works within the same containerized environment.

---

## Why Docker Compose?

The project will eventually consist of multiple services:

* Backend
* PostgreSQL
* Redis
* Testing services
* Additional infrastructure

Docker Compose allows these services to be started together using a single configuration.

---

## Why npm?

npm is selected because:

* It ships with Node.js
* It has excellent ecosystem support
* It is well documented
* It integrates well with production tooling

Although alternative package managers exist, npm provides everything required for this project.

---

# Alternatives Considered

## Runtime

Alternatives:

* Bun
* Deno

Reason not selected:

The primary objective is learning production backend engineering using the most widely adopted ecosystem. Node.js currently provides the broadest industry adoption and library compatibility.

---

## Language

Alternative:

* JavaScript

Reason not selected:

While JavaScript is sufficient for small applications, TypeScript offers better maintainability for medium and large production codebases.

---

## Framework

Alternatives:

* Fastify
* NestJS

Reason not selected:

Express allows learning the fundamentals before introducing higher-level abstractions.

---

## Database

Alternative:

* MongoDB

Reason not selected:

Authentication systems benefit from relational integrity, transactions, and strong consistency. PostgreSQL better aligns with these requirements.

---

## Containerization

Alternative:

* No containerization

Reason not selected:

Learning production engineering requires understanding reproducible environments and container-based development.

---

# Consequences

## Positive

* Industry-standard technology stack
* Large learning resources
* Strong production relevance
* Easy deployment
* Excellent community support
* Long-term maintainability
* Good foundation for scaling

---

## Negative

* More configuration compared to simpler setups
* Steeper learning curve
* Additional tooling to manage
* Longer initial setup phase

These trade-offs are acceptable because the project's primary objective is education and production readiness rather than rapid feature delivery.

---

# Future Decisions

The following technologies will be evaluated through separate ADRs when they become necessary:

* Layered Architecture
* Folder Structure
* ORM / Query Builder
* Validation Library
* Logging Framework
* Redis
* Email Service
* Background Jobs
* Testing Framework
* API Documentation
* CI/CD
* Monitoring
* Deployment Strategy

Each decision will be documented independently.

---

# Review

This ADR should be reviewed whenever a major technology choice changes or a better alternative becomes appropriate for the project's goals.
