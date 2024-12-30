#!/bin/bash

# Script usage function
usage() {
  echo "⭐ Usage: $0 [-d AUTH_DIR] [-l true|false]"
  echo "⭐   -d AUTH_DIR    Directory containing the get-iap-tokens.py script (default: ../../iap-local-authentication)"
  echo "⭐                  Repository: https://github.com/pass-culture/iap-local-authentication"
  echo "⭐   -l LOOP_MODE   Enable infinite loop to refresh JWT (true/false, default: false)"
  exit 1
}

# Default values
DEFAULT_AUTH_DIR="../../iap-local-authentication"
CLOUDSDK_PYTHON="/usr/bin/python3"
IMAGE_NAME="nginx-strapi-testing-proxy"
CONTAINER_NAME="nginx-strapi-testing-proxy"
VENV_DIR="venv"
JWT_EXPIRATION_TIME=3600  # JWT valid for 1 hour (3600 seconds)
LOOP_MODE=false

# Parse command-line arguments
while getopts "d:l:" opt; do
  case $opt in
    d) AUTH_DIR="$OPTARG" ;;
    l) LOOP_MODE="$OPTARG" ;;
    *) usage ;;
  esac
done

# Use the default AUTH_DIR if none is provided
AUTH_DIR=${AUTH_DIR:-$DEFAULT_AUTH_DIR}

# Step 1: Create virtual environment and install dependencies
echo "✨ Setting up the virtual environment and installing dependencies..."
cd "$AUTH_DIR" || { echo "⚠️ Error: Cannot access $AUTH_DIR"; exit 1; }

if [ ! -d "$VENV_DIR" ]; then
  python3 -m venv "$VENV_DIR"
  echo "⭐ Virtual environment created in $AUTH_DIR/$VENV_DIR."
fi

# Activate the virtual environment and install dependencies
# shellcheck disable=SC1091
source "$VENV_DIR/bin/activate"
if [ -f "requirements.txt" ]; then
  echo "🛠️ Installing dependencies from requirements.txt..."
  pip install --upgrade pip
  pip install -r requirements.txt || { echo "⚠️ Error: Failed to install dependencies."; exit 1; }
else
  echo "⚠️ Error: requirements.txt not found in $AUTH_DIR."
  exit 1
fi

# Step 2: Google Cloud authentication
echo "💳 Authenticating with Google Cloud..."
export CLOUDSDK_PYTHON="$CLOUDSDK_PYTHON"

gcloud auth application-default login || { echo "⚠️ Error: Google Cloud authentication failed"; exit 1; }

# Step 3: Generate the IAP token
generate_jwt() {
  echo "✨ Generating the IAP token..."
  python3 get-iap-tokens.py || { echo "⚠️ Error: Failed to generate IAP token."; exit 1; }

  # Load environment variables containing the token
  echo "📂 Loading IAP credentials..."
  # shellcheck disable=SC1090
  source ~/.iap-credentials || { echo "⚠️ Error: Unable to load ~/.iap-credentials"; exit 1; }

  # Verify that the IAP_ID_TOKEN is set
  if [ -z "$IAP_ID_TOKEN" ]; then
    echo "⚠️ Error: IAP_ID_TOKEN is empty. Check the get-iap-tokens.py script."
    exit 1
  fi
}

generate_jwt

# Return to the Docker directory
echo "👉 Returning to the Docker directory..."
deactivate
cd - >/dev/null || exit 1

# Step 4: Build the Docker image
echo "🔧 Building the Docker image..."
docker build -t "$IMAGE_NAME" . || { echo "⚠️ Error: Docker build failed"; exit 1; }

# Step 5: Run the Docker container
start_container() {
  echo "🚀 Running the Docker container..."
  docker stop "$CONTAINER_NAME" >/dev/null 2>&1 || true
  docker run -d --rm -p 8080:8080 -e IAP_ID_TOKEN="$IAP_ID_TOKEN" --name "$CONTAINER_NAME" "$IMAGE_NAME" || {
    echo "⚠️ Error: Docker container failed to start"; exit 1;
  }
  echo "🎉 Container $CONTAINER_NAME is now running on port 8080. (http://localhost:8080/)"
}

start_container

# Step 6: Infinite loop for JWT refresh if enabled
if [ "$LOOP_MODE" = "true" ]; then
  echo "🔄 Infinite loop mode enabled. Monitoring JWT expiration..."
  while true; do
    sleep $((JWT_EXPIRATION_TIME - 60))  # Refresh 1 minute before expiration

    echo "⏳ JWT about to expire. Regenerating..."
    generate_jwt

    echo "⟳ Restarting container with new JWT..."
    start_container
  done
else
  echo "✅ Infinite loop mode disabled. Script execution complete."
fi
