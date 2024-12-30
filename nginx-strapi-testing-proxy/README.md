# Strapi Testing Proxy

This repository provides tools to facilitate local development by accessing the **Strapi testing backend**, which is secured behind Google Cloud IAP (Identity-Aware Proxy).

The purpose of this repository is twofold:

1. **Proxy Access**: Use the provided tools to set up a proxy that allows your local frontend (e.g., `public_website`) to connect to the Strapi testing server available at [this address](https://siteinstit-cms.testing.passculture.team/).
2. **Data Transfer**: Synchronize data from the testing backend to your local database for development and testing purposes.

This setup ensures seamless access to the testing backend for development and allows you to replicate real data locally for debugging and validation.

---

## Table of Contents

- [Strapi Testing Proxy](#strapi-testing-proxy)
  - [Table of Contents](#table-of-contents)
  - [Setup and Configuration](#setup-and-configuration)
    - [Prerequisites](#prerequisites)
    - [Proxy Configuration](#proxy-configuration)
  - [Running the Proxy Server](#running-the-proxy-server)
    - [Starting the Proxy](#starting-the-proxy)
    - [Infinite Mode](#infinite-mode)
    - [Stopping the Proxy](#stopping-the-proxy)
  - [Transferring Data to Your Local Database](#transferring-data-to-your-local-database)
    - [Prerequisites](#prerequisites-1)
    - [Data Transfer Steps](#data-transfer-steps)
  - [Launch Frontend with Testing Backend](#launch-frontend-with-testing-backend)
  - [Available Commands](#available-commands)
  - [Common Issues and Troubleshooting](#common-issues-and-troubleshooting)
    - [1. Logs and Debugging](#1-logs-and-debugging)
    - [2. Token Expiration](#2-token-expiration)
    - [3. Proxy Not Starting](#3-proxy-not-starting)
  - [Additional Notes](#additional-notes)

---

## Setup and Configuration

Before running the proxy server, ensure your environment is properly configured:

### Prerequisites

1. **Google Cloud SDK**

   - Install the [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) and configure it with your project:
     ```bash
     gcloud auth application-default login
     gcloud config set project passculture-cls-metier-ehp
     ```

2. **iap-local-authentication**
   - Clone the [iap-local-authentication](https://github.com/pass-culture/iap-local-authentication) repository at the same directory level as this project:
     ```bash
     git clone https://github.com/pass-culture/iap-local-authentication.git
     ```
3. **Python**
   - Python3 is required to run iap-local-authentication

### Proxy Configuration

1. Launch the testing proxy server:

   ```bash
   yarn proxy:testing
   ```

   - This will open a browser window to log in via Google Cloud IAP.
   - Once logged in, a Docker container will start, and the proxy will run at `http://localhost:8080`.

2. Optional: Run the proxy server in **infinite mode** (to avoid token expiration every hour):
   ```bash
   yarn proxy:testing:infinite
   ```

---

## Running the Proxy Server

### Starting the Proxy

- Run the following command to start the proxy:
  ```bash
  yarn proxy:testing
  ```
  - The proxy will authenticate via Google Cloud IAP and start at `http://localhost:8080`.

### Infinite Mode

- To automatically regenerate the JWT token every hour, run instead:
  ```bash
  yarn proxy:testing:infinite
  ```

### Stopping the Proxy

- Stop the proxy server:
  ```bash
  yarn proxy:testing:stop
  ```

---

## Transferring Data to Your Local Database

Follow these steps to transfer data from the Strapi testing environment to your local database:

### Prerequisites

1. **Ensure your local database is running** and accessible. Refer to the instructions in the [content management system README](../content_management_system/README.md).

### Data Transfer Steps

1. Go to the [Strapi admin panel](https://siteinstit-cms.testing.passculture.team/admin/auth/login) of the remote testing environment.
2. Navigate to **Settings > Transfer Tokens**.
3. Create a **new transfer token** (Pull mode only) and copy it for later.

4. Run the transfer script:

   ```bash
   yarn proxy:transfer
   ```

5. Enter the transfer token when prompted.
6. The script will sync the data to your local database.

---

## Launch Frontend with Testing Backend

To connect your frontend project (e.g., `public_website`) to the Strapi testing backend:

1. Ensure the proxy is running at `http://localhost:8080`.
2. Update the `.env` file in your frontend project with the following variable:
   ```env
   NEXT_PUBLIC_STRAPI_API_URL=http://localhost:8080
   ```
3. Restart your frontend development server:
   ```bash
   yarn dev
   ```

Your frontend should now point to the Strapi testing backend via the proxy.

---

## Available Commands

All commands are available in the `package.json` file at **the root** of the project.

| **Command**                   | **Description**                                              |
| ----------------------------- | ------------------------------------------------------------ |
| `yarn proxy:testing`          | Starts the proxy server to connect to Strapi.                |
| `yarn proxy:testing:infinite` | Starts the proxy server in infinite mode (auto-refresh JWT). |
| `yarn proxy:testing:stop`     | Stops the currently running proxy server.                    |
| `yarn proxy:transfer`         | Transfers data from the remote testing server to local DB.   |

---

## Common Issues and Troubleshooting

### 1. Logs and Debugging

- If issues arise, check the logs for errors:
  ```bash
  docker logs <container_id>
  ```

### 2. Token Expiration

- JWT tokens expire after 1 hour. Use **infinite mode** to avoid manual regeneration:
  ```bash
  yarn proxy:testing:infinite
  ```

### 3. Proxy Not Starting

- Ensure Google Cloud SDK is installed and authenticated:
  ```bash
  gcloud auth application-default login
  ```
- Verify Docker is running and accessible.

---

## Additional Notes

- This proxy setup is specifically for Strapi testing environment.
- Ensure your environment variables and tokens are handled securely to avoid accidental leaks.
