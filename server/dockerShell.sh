#!/bin/bash

# Wait until MySQL is ready
until mysqladmin ping -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USERNAME" -p"$DB_PASSWORD" --silent; do
  echo "Waiting for MySQL at $DB_HOST:$DB_PORT..."
  sleep 3
done

echo "✅ MySQL is ready."

# If .env doesn't exist, create it from example
if [ ! -f .env ]; then
  echo "Creating .env from .env.example"
  cp .env.example .env
  php artisan key:generate
  php artisan jwt:secret --force

  # Inject the values from environment variables into .env
  echo "Injecting environment variables into .env"
else
  echo ".env already exists"
fi

# Cache config and routes
php artisan config:cache
php artisan route:cache

# Run any new migrations (use --force to avoid prompt)
php artisan migrate --force

echo "✅ Laravel setup complete. Starting Apache..."

# Start Apache in the foreground (container will stay running)
exec apache2-foreground
