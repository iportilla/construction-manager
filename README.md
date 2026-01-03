# ConstructFlow | Construction Project Management System

Hey Scott! Here's the repository for the construction management app we discussed. I've built this as a robust foundation for managing commercial project data and stakeholder relationships.

For our junior developers: This is a **Spring Boot 3** application paired with a modern **Vanilla JS/CSS** frontend. It demonstrates clean architecture, JPA relationships, and RESTful API design.

---

## 🏗️ Architecture Overview

The system follows a standard N-Tier architecture to ensure separation of concerns and maintainability.

### Request Flow
```mermaid
graph LR
    User((User)) -->|Browser| UI[Frontend Dashboard]
    UI -->|REST API| Ctrl[REST Controllers]
    Ctrl -->|Business Logic| Svc[Services]
    Svc -->|Persistence| Repo[JPA Repositories]
    Repo -->|SQL| DB[(H2 Database)]
```

### Data Model (One-to-Many)
One `Contact` (Project Manager, Architect, GC) can be associated with multiple `Projects`.

```mermaid
classDiagram
    class Contact {
        +Long id
        +String firstName
        +String lastName
        +String email
        +String company
        +List projects
    }
    class Project {
        +Long id
        +String name
        +String location
        +Double budget
        +String status
        +Contact contact
    }
    Contact "1" --> "*" Project : manages
```

---

## 🚀 Getting Started

### Prerequisites
- **Java 17** or higher
- **Maven 3.8+** (or use the included `./mvnw`)

### Running Locally
1. Clone the repository and navigate to the project:
   ```bash
   cd construction-manager
   ```
2. Start the application:
   ```bash
   ./mvnw spring-boot:run
   ```
3. Access the dashboard:
   Open [http://localhost:8080](http://localhost:8080) in your browser.

> [!TIP]
> Check out our [**Contributing Guide**](CONTRIBUTING.md) for a deep dive into the project's architecture and coding standards for junior developers.

---

## 🛠️ Tech Stack & Key Concepts

### Backend
- **Spring Boot 3**: The backbone of the application.
- **Spring Data JPA**: Handles database interactions without writing boilerplate SQL.
- **POJOs with Explicit Boilers**: To ensure compatibility across all environments, we use explicit Getters, Setters, and Builders instead of Lombok.
- **H2 Database**: An in-memory database for rapid development and zero-config setup.

### Frontend
- **Vanilla JavaScript**: Modern ES6+ for state management and API calls.
- **Vanilla CSS**: A custom design system featuring:
  - **CSS Variables** for easy branding updates.
  - **Glassmorphism** for a premium, modern feel.
  - **Responsive Grid** layouts for dashboarding.

---

## ☁️ Deployment to IBM Cloud

We've optimized this project for **IBM Cloud Code Engine**. 

**Live Application:** [https://construct-flow.24p0om0es615.us-south.codeengine.appdomain.cloud](https://construct-flow.24p0om0es615.us-south.codeengine.appdomain.cloud)  
**IBM Cloud Console:** [Access Code Engine Dashboard](https://cloud.ibm.com/codeengine/project/us-south/02e9d4df-3d19-4ea1-a993-cd650adb5013/application/construct-flow/configuration)

You can deploy using Docker or the automated script provided.

### Option 1: Automated Script (Recommended)
We've included a helper script to handle dependencies, build, and deployment:
```bash
chmod +x deploy-ibm.sh
./deploy-ibm.sh [YOUR_RESOURCE_GROUP] [REGION]
```
> [!NOTE]
> The script automatically checks for the `code-engine` CLI plugin and local Maven installation, attempting to resolve missing dependencies where possible.

### Option 2: Docker / Container Registry
1. Build the image:
   ```bash
   docker build -t icr.io/[YOUR_NAMESPACE]/construct-flow:v1 .
   ```
2. Push to IBM Container Registry:
   ```bash
   ibmcloud cr image-push icr.io/[YOUR_NAMESPACE]/construct-flow:v1
   ```
3. Deploy to Code Engine via the IBM Cloud Console using that image.

---

---

## 🤖 Antigravity Development Logs

The recent deployment fixes and architectural changes were managed and documented using Antigravity. You can find the detailed implementation history here:

- [**Task Checklist**](docs/antigravity/task.md): Tracking the fix for the missing CLI plugins and build errors.
- [**Implementation Plan**](docs/antigravity/implementation_plan.md): The approved technical strategy for the recent changes.
- [**Final Walkthrough**](docs/antigravity/walkthrough.md): A summary of the resolved issues and verification results.

---

Hope this helps, Scott! Let me know if you want to dive deeper into any specific module.

Cheers!
