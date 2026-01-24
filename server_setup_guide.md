# Server Setup Guide

Follow these steps on your VPS to prepare for the deployment pipelines.

## 1. Create Deployment Directories

SSH into your server and run the following commands to create separate directories for Dev and Prod:

```bash
# Create directory for Dev environment
mkdir -p ~/apps/camana-dev

# Create directory for Prod environment
mkdir -p ~/apps/camana-prod
```

## 2. Initial Clone

You need to clone the repository into these directories so the "git pull" command in our workflows works correctly.

**For Dev:**
```bash
git clone -b dev https://github.com/harsh618/camana-AEO.git ~/apps/camana-dev
```
*(Note: If the `dev` branch doesn't exist on remote yet, just clone main and checkout dev later, or let the workflow handle the checkout if the folder is empty - but git pull requires a git repo. So cloning is best.)*

**For Prod:**
```bash
git clone -b prod https://github.com/harsh618/camana-AEO.git ~/apps/camana-prod
```

## 3. Configure Nginx

You need to configure Nginx to serve both sites.

**Step 3.1: Create Web Root Directories**
We will copy the built files here.
```bash
sudo mkdir -p /var/www/dev-searchlyst/html
sudo mkdir -p /var/www/searchlyst/html

# Set permissions (adjust user if needed, assuming current user is 'ubuntu' or 'root')
# If you are 'ubuntu':
sudo chown -R $USER:$USER /var/www/dev-searchlyst/html
sudo chown -R $USER:$USER /var/www/searchlyst/html
```

**Step 3.2: Create Nginx Config**
Create a new config file (or edit default). Recommended to create `/etc/nginx/sites-available/searchlyst.conf`:

```nginx
# Dev Configuration
server {
    listen 80;
    server_name dev.searchlyst.com;

    root /var/www/dev-searchlyst/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}

# Prod Configuration
server {
    listen 80;
    server_name searchlyst.com www.searchlyst.com;

    root /var/www/searchlyst/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

**Step 3.3: Enable and Restart**
```bash
# Link the config (if you used sites-available)
sudo ln -s /etc/nginx/sites-available/searchlyst.conf /etc/nginx/sites-enabled/

# Test config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

## 4. DNS Setup
Ensure you have added an **A Record** for `dev` in your DNS provider (e.g., GoDaddy, Cloudflare) pointing to your server IP.
