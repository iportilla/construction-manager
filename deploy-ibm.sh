#!/bin/bash

# IBM Cloud Deployment Script for ConstructFlow
# Usage: ./deploy-ibm.sh [RESOURCE_GROUP] [REGION]

RESOURCE_GROUP=${1:-"Default"}
REGION=${2:-"us-south"}
APP_NAME="construct-flow"

echo "🚀 Starting IBM Cloud Deployment for $APP_NAME..."

# 1. Check if IBM Cloud CLI is installed
if ! command -v ibmcloud &> /dev/null
then
    echo "❌ ibmcloud CLI could not be found. Please install it first."
    exit 1
fi

# 2. Login (This assumes the user is already logged in or using an API key)
echo "🔑 Targetting resource group $RESOURCE_GROUP and region $REGION..."
ibmcloud target -g "$RESOURCE_GROUP" -r "$REGION"

# 3. Build the application
echo "📦 Building JAR with Maven..."
./mvnw clean package -DskipTests

# 4. Check deployment method (Code Engine is modern preference)
echo "🚢 Deploying to IBM Cloud Code Engine..."
ibmcloud ce project create --name construction-projects 2>/dev/null
ibmcloud ce project select --name construction-projects

ibmcloud ce app create --name $APP_NAME --port 8080 --cpu 1 --memory 2G \
    --build-source .

echo "✅ Deployment complete!"
echo "🌐 Your app should be available shortly. Check 'ibmcloud ce app get --name $APP_NAME' for the URL."
