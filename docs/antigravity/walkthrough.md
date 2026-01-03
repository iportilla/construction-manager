# Walkthrough - Fixing Missing Code Engine Plugin

I have resolved the issue where the `ce` command was not recognized by the IBM Cloud CLI.

## Changes Made

### IBM Cloud CLI
- Installed the `code-engine` plugin using `ibmcloud plugin install code-engine`.

### Deployment Script
- Modified [deploy-ibm.sh](file:///Users/ivanp/Documents/GitHub/construction-manager/deploy-ibm.sh) to include:
    - Auto-installation of `code-engine` plugin.
    - Check for local `mvn` if `mvnw` wrapper is missing.
    - Automatic detection and `update` of existing Code Engine applications (instead of failing on `create`).

### Environment Fixes
- **Maven**: Installed Maven locally via `brew install maven`.
- **Dockerfile**: Updated base images to `eclipse-temurin:17` as `openjdk` images were deprecated/missing.
- **Model Classes**: Replaced Lombok annotations with explicit Java code in [Project.java](file:///Users/ivanp/Documents/GitHub/construction-manager/src/main/java/com/construction/manager/model/Project.java) and [Contact.java](file:///Users/ivanp/Documents/GitHub/construction-manager/src/main/java/com/construction/manager/model/Contact.java) to fix local compilation issues.

## Verification Results

### Success!
The application is now live at:
[https://construct-flow.24p0om0es615.us-south.codeengine.appdomain.cloud](https://construct-flow.24p0om0es615.us-south.codeengine.appdomain.cloud)

### Verification Steps
- `ibmcloud ce app get -n construct-flow` confirms the app is `Ready`.
- Local compilation `mvn clean compile` now passes.
- Remote build run completed successfully.
