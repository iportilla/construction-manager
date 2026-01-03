# Contributing to ConstructFlow

Welcome! This guide is designed to help junior developers understand our coding standards and the patterns used in this project.

## 🏗️ Technical Patterns

### 1. Model-Service-Controller
We follow a strict 3-tier architecture:
- **Models** (`src/main/java/com/construction/manager/model`): Pure data structures and JPA entities.
- **Repositories** (`src/main/java/com/construction/manager/repository`): Data access layers (Spring Data JPA).
- **Services** (`src/main/java/com/construction/manager/service`): All business logic goes here. Controllers should never talk to repositories directly.
- **Controllers** (`src/main/java/com/construction/manager/controller`): Entry points for HTTP requests. They should be very thin.

### 2. Manual Boilerplate (No Lombok)
To ensure that the project compiles in any environment without specialized IDE plugins, we **do not use Lombok**. 
- Always create explicit getters, setters, and constructors.
- Use the **Builder Pattern** for complex objects (as demonstrated in `Project.java`).

### 3. JPA Relationships
- **Bidirectional Relationships**: When using `@OneToMany` and `@ManyToOne`, ensure you have helper methods (like `addProject`) to keep both sides of the relationship in sync.
- **Circular References**: Use `@JsonIgnore` on the child side of a relationship to prevent infinite loops during JSON serialization.

## 🛠️ Development Workflow

1.  **Run Locally**: `./mvnw spring-boot:run`
2.  **H2 Console**: Access the in-memory database at `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:constructiondb`).
3.  **Deploy**: Use `./deploy-ibm.sh` after verifying your changes locally.

## ✅ Quality Standards
- **Clean Code**: Use descriptive variable names (`projectDetails` instead of `pd`).
- **Thin Controllers**: If a controller method has more than 5 lines of logic, move that logic to a Service.
- **Documentation**: If you change a core pattern, update this file!
