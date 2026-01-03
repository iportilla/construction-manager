# Fix Missing Code Engine Plugin

The user reported that the `ce` command is not registered in the IBM Cloud CLI. This is because the Code Engine plugin is not installed.

## Proposed Changes

### [Component Name] Docker Configuration

#### [MODIFY] [Dockerfile](file:///Users/ivanp/Documents/GitHub/construction-manager/Dockerfile)
- Update base images from deprecated `openjdk` to supported `eclipse-temurin`.
- Ensure multi-stage build remains efficient.

### [Component Name] IBM Cloud CLI Configuration

#### [MODIFY] [deploy-ibm.sh](file:///Users/ivanp/Documents/GitHub/construction-manager/deploy-ibm.sh)
- (Completed) Added a check for the `code-engine` plugin.

## Verification Plan

### Automated Tests
- Run `ibmcloud plugin list` to verify `code-engine` is present.
- Run `ibmcloud ce --help` to verify the command works.

### Manual Verification
- Run the `./deploy-ibm.sh` script and ensure it proceeds past the plugin check.
