#!/bin/bash

# Configuration
CONTAINER_NAME="nginx-strapi-testing-proxy"
PROXY_URL="http://localhost:8080/admin"
TRANSFER_COMMAND="yarn strapi transfer --from $PROXY_URL --exclude files"

# Step 1: Check if the Docker container is running
echo "Checking if the Docker proxy container '$CONTAINER_NAME' is running..."

if docker ps --filter "name=$CONTAINER_NAME" --format "{{.Names}}" | grep -q "$CONTAINER_NAME"; then
  echo "✅ Docker proxy container '$CONTAINER_NAME' is running."
else
  echo "❌ Error: Docker proxy container '$CONTAINER_NAME' is not running."
  echo "Please start the proxy container before running this command."
  echo "=> yarn proxy:testing"
  exit 1
fi

# Step 2: Execute the transfer command
cd ../content_management_system >/dev/null || exit 1
echo "Executing the Strapi transfer command..."
if $TRANSFER_COMMAND; then
  echo "✅ Strapi transfer completed successfully."
else
  echo "❌ Error: Strapi transfer failed. Please check the logs for details."
  exit 1
fi
